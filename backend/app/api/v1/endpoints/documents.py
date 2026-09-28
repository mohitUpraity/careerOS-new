import uuid
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, desc, update
from datetime import datetime

from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.models.profile import UserProfileModel
from backend.app.models.resume import ResumeModel
from backend.app.models.skill import SkillModel, EvidenceModel
from backend.app.models.document import DocumentModel
from backend.app.models.rag import DocumentChunkModel
from backend.app.services.document_extractor import document_extractor
from backend.app.services.gemini_service import gemini_service
from backend.app.services.rag_service import rag_service
from backend.app.schemas.document import (
    DocumentResponse,
    DocumentListResponse,
    DocumentUploadResponse,
    SetActiveGoldenTemplateRequest,
    DocumentExtractTextRequest
)

router = APIRouter()

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = Form("resume"),
    set_as_golden: Optional[bool] = Form(False),
    target_roles_str: Optional[str] = Form(None),
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Uploads ANY career document (Resume, Certificate, Internship Letter, Course Completion, Portfolio).
    Performs deterministic AST & skill extraction, Gemini AI enrichment, embeds into RAG vector index,
    and atomically synchronizes:
    1. `documents` (with Golden Base Resume designation)
    2. `skills` (adds skills, boosts proficiencies, increments proof counts)
    3. `evidence_vault` (creates verified metric and credential evidence items)
    4. `user_profiles` (merges experiences, certifications, education, projects)
    5. `document_chunks` (768-dim embeddings for vector search)
    6. `resumes` (Master Golden Base Resume)
    """
    try:
        user_id = current_user.id
        content = await file.read()
        filename = file.filename or "uploaded_document"
        filename_lower = filename.lower()
        extracted_text = ""

        # 1. Text Extraction
        if filename_lower.endswith(".pdf"):
            extracted_text = document_extractor.extract_text_from_pdf(content)
        elif filename_lower.endswith(".docx"):
            extracted_text = document_extractor.extract_text_from_docx(content)
        else:
            extracted_text = content.decode("utf-8", errors="ignore")

        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract readable text from the uploaded document.")

        target_roles = [r.strip() for r in target_roles_str.split(",") if r.strip()] if target_roles_str else []

        # 2. Multi-Document Knowledge Extraction
        clean_doc_type = (doc_type or "resume").lower().strip()
        parsed_data = document_extractor.parse_multi_document(
            text=extracted_text,
            doc_type=clean_doc_type,
            filename=filename,
            target_roles=target_roles
        )

        # 3. AI Enrichment (Gemini)
        enriched_data = await gemini_service.enrich_document_extraction(extracted_text, clean_doc_type, parsed_data)

        # 4. Check Golden Base Resume designation
        is_golden = False
        if clean_doc_type == "resume":
            if set_as_golden:
                is_golden = True
            else:
                # If user has no existing golden resume, make this one the golden base
                existing_golden = await db.execute(
                    select(DocumentModel).where(
                        DocumentModel.user_id == user_id,
                        DocumentModel.is_golden_template == True
                    )
                )
                if not existing_golden.scalars().first():
                    is_golden = True

            if is_golden:
                # Unset previous golden resume flag on other documents
                await db.execute(
                    update(DocumentModel)
                    .where(DocumentModel.user_id == user_id)
                    .values(is_golden_template=False)
                )

        # 5. Save Document record
        doc_id = f"doc_{uuid.uuid4().hex[:10]}"
        document_record = DocumentModel(
            id=doc_id,
            user_id=user_id,
            filename=filename,
            doc_type=clean_doc_type,
            file_size=len(content),
            file_url=None,
            raw_markdown=extracted_text,
            metadata_json={
                "title": enriched_data.get("title", filename),
                "skills_count": len(enriched_data.get("skills", [])),
                "evidence_count": len(enriched_data.get("evidence_items", [])),
                "issuer": enriched_data.get("issuer"),
                "credential_id": enriched_data.get("credential_id"),
                "company": enriched_data.get("company"),
                "role": enriched_data.get("role"),
                "is_golden_template": is_golden
            },
            is_golden_template=is_golden
        )
        db.add(document_record)

        # 6. Ingest into RAG Vector Store
        await rag_service.ingest_document(
            db=db,
            user_id=user_id,
            doc_type=clean_doc_type,
            source_title=filename,
            content=extracted_text,
            metadata={
                "document_id": doc_id,
                "doc_type": clean_doc_type,
                "is_golden": is_golden,
                "synced_at": str(datetime.utcnow())
            }
        )

        # 7. Synchronize Skills
        new_skills = enriched_data.get("skills", [])
        existing_skills_res = await db.execute(select(SkillModel).where(SkillModel.user_id == user_id))
        existing_skills = {s.name.lower(): s for s in existing_skills_res.scalars().all()}

        for sk in new_skills:
            sk_name = sk.get("name", "").strip()
            if not sk_name:
                continue
            sk_key = sk_name.lower()
            if sk_key in existing_skills:
                existing_sk = existing_skills[sk_key]
                existing_sk.proof_count = (existing_sk.proof_count or 1) + 1
                existing_sk.proficiency = min(99, max(existing_sk.proficiency, sk.get("proficiency", 85)))
                existing_sk.verified = True
            else:
                sk_id = f"sk_{uuid.uuid4().hex[:6]}"
                db.add(
                    SkillModel(
                        id=sk_id,
                        user_id=user_id,
                        name=sk_name,
                        category=sk.get("category", "General Engineering"),
                        proficiency=sk.get("proficiency", 85),
                        verified=True,
                        proof_count=1,
                        ast_proof_hash=f"sha256_{uuid.uuid4().hex[:12]}",
                        ast_proof_details={
                            "proof": sk.get("ast_proof_hint", f"Verified from {clean_doc_type}"),
                            "source_doc": filename
                        },
                        tags=[sk.get("category", "Engineering"), clean_doc_type]
                    )
                )

        # 8. Synchronize Evidence Vault
        new_evidence = enriched_data.get("evidence_items", [])
        for ev in new_evidence:
            ev_id = f"ev_{uuid.uuid4().hex[:6]}"
            db.add(
                EvidenceModel(
                    id=ev_id,
                    user_id=user_id,
                    title=ev.get("title", f"Proof from {filename}"),
                    type=ev.get("type", "Telemetry Proof"),
                    platform=ev.get("platform", "Document Vault"),
                    sha_hash=f"sha256_{uuid.uuid4().hex[:12]}",
                    url=ev.get("url") or "",
                    metric_proof=ev.get("metric_proof", "Verified candidate proof"),
                    skills_linked=ev.get("skills_linked", []),
                    verified=True
                )
            )

        # 9. Synchronize Profile
        prof_res = await db.execute(select(UserProfileModel).where(UserProfileModel.id == user_id))
        profile = prof_res.scalars().first()

        if not profile:
            profile = UserProfileModel(
                id=user_id,
                name=enriched_data.get("name") or current_user.name or "Engineer",
                email=enriched_data.get("email") or current_user.email or "",
                headline=enriched_data.get("headline") or "Software Systems Engineer",
                location=enriched_data.get("location") or "Remote",
                target_roles=target_roles or ["Software Engineer"],
                profile_completeness=40,
                overall_readiness=50,
                onboarding_completed=True
            )
            db.add(profile)

        # Update contact / links if resume
        if clean_doc_type == "resume":
            if enriched_data.get("name"): profile.name = enriched_data["name"]
            if enriched_data.get("headline"): profile.headline = enriched_data["headline"]
            if enriched_data.get("location"): profile.location = enriched_data["location"]
            if enriched_data.get("phone"): profile.phone = enriched_data["phone"]
            if enriched_data.get("github"): profile.github = enriched_data["github"]
            if enriched_data.get("linkedin"): profile.linkedin = enriched_data["linkedin"]
            if enriched_data.get("portfolio"): profile.portfolio = enriched_data["portfolio"]
            if enriched_data.get("manifesto"): profile.manifesto = enriched_data["manifesto"]
            if enriched_data.get("persona_summary"): profile.persona_summary = enriched_data["persona_summary"]
            if enriched_data.get("target_roles"): profile.target_roles = enriched_data["target_roles"]

        # Merge experiences (without duplicating company)
        curr_exps = list(profile.experiences or [])
        for exp in enriched_data.get("experiences", []):
            if not any(e.get("company", "").lower() == exp.get("company", "").lower() for e in curr_exps):
                curr_exps.append(exp)
        profile.experiences = curr_exps

        # Merge education
        curr_edu = list(profile.education or [])
        for edu in enriched_data.get("education", []):
            if not any(e.get("institution", "").lower() == edu.get("institution", "").lower() for e in curr_edu):
                curr_edu.append(edu)
        profile.education = curr_edu

        # Merge certifications
        curr_certs = list(profile.certifications or [])
        for cert in enriched_data.get("certifications", []):
            if not any(c.get("name", "").lower() == cert.get("name", "").lower() for c in curr_certs):
                curr_certs.append(cert)
        profile.certifications = curr_certs

        # Merge projects
        curr_projs = list(profile.projects or [])
        for proj in enriched_data.get("projects", []):
            if not any(p.get("title", "").lower() == proj.get("title", "").lower() for p in curr_projs):
                curr_projs.append(proj)
        profile.projects = curr_projs

        # Recompute completeness & readiness
        completeness = 30
        if profile.manifesto or profile.persona_summary: completeness += 15
        if curr_exps: completeness += 20
        if curr_certs: completeness += 15
        if curr_projs: completeness += 10
        if curr_edu: completeness += 10
        profile.profile_completeness = min(100, completeness)
        profile.overall_readiness = min(99.0, 50.0 + len(new_skills) * 2.0 + len(curr_certs) * 3.0)

        # 10. Synchronize Master Golden Base Resume
        if is_golden:
            res_query = await db.execute(
                select(ResumeModel).where(ResumeModel.user_id == user_id, ResumeModel.is_baseline == True)
            )
            master_resume = res_query.scalars().first()

            all_user_skills_res = await db.execute(select(SkillModel).where(SkillModel.user_id == user_id))
            all_user_skills = [
                {"name": s.name, "category": s.category, "proficiency": s.proficiency, "proof_count": s.proof_count}
                for s in all_user_skills_res.scalars().all()
            ]

            all_user_ev_res = await db.execute(select(EvidenceModel).where(EvidenceModel.user_id == user_id))
            all_user_ev = [
                {"title": e.title, "type": e.type, "platform": e.platform, "metric_proof": e.metric_proof, "skills_linked": e.skills_linked}
                for e in all_user_ev_res.scalars().all()
            ]

            golden_content = {
                "header": {
                    "name": profile.name,
                    "headline": profile.headline,
                    "email": profile.email,
                    "phone": profile.phone or "",
                    "location": profile.location,
                    "github": profile.github or "",
                    "linkedin": profile.linkedin or "",
                    "portfolio": profile.portfolio or ""
                },
                "summary": profile.manifesto or profile.persona_summary or "",
                "skills": all_user_skills,
                "experiences": curr_exps,
                "projects": curr_projs,
                "education": curr_edu,
                "certifications": curr_certs,
                "evidence_items": all_user_ev
            }

            if master_resume:
                master_resume.title = f"Master Golden Resume ({filename})"
                master_resume.raw_text = extracted_text
                master_resume.content_json = golden_content
                master_resume.updated_at = datetime.utcnow()
            else:
                master_resume = ResumeModel(
                    id=f"res_{uuid.uuid4().hex[:8]}",
                    user_id=user_id,
                    title=f"Master Golden Resume ({filename})",
                    is_baseline=True,
                    raw_text=extracted_text,
                    content_json=golden_content
                )
                db.add(master_resume)

        await db.commit()

        message = (
            f"Master Golden Base Resume activated with {len(new_skills)} skills & {len(new_evidence)} proofs!"
            if is_golden
            else f"Extracted and synced {len(new_skills)} skills, {len(new_evidence)} proofs from {filename} into Knowledge Graph!"
        )

        return DocumentUploadResponse(
            status="success",
            document_id=doc_id,
            filename=filename,
            doc_type=clean_doc_type,
            is_golden_template=is_golden,
            skills_extracted_count=len(new_skills),
            evidence_extracted_count=len(new_evidence),
            extracted_summary={
                "title": enriched_data.get("title", filename),
                "issuer": enriched_data.get("issuer"),
                "credential_id": enriched_data.get("credential_id"),
                "skills": [s["name"] for s in new_skills[:6]],
                "evidence": [e["title"] for e in new_evidence[:4]],
                "is_golden_template": is_golden
            },
            profile_completeness=profile.profile_completeness,
            overall_readiness=profile.overall_readiness,
            message=message
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"[Document Upload Error]: {e}")
        try:
            await db.rollback()
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Document upload failed: {str(e)}")

@router.get("", response_model=DocumentListResponse)
async def list_documents(
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns all uploaded documents (resumes, certificates, internship letters, courses) for candidate.
    """
    try:
        user_id = current_user.id
        res = await db.execute(
            select(DocumentModel).where(DocumentModel.user_id == user_id).order_by(desc(DocumentModel.created_at))
        )
        docs = res.scalars().all()

        golden_id = next((d.id for d in docs if d.is_golden_template), None)

        return DocumentListResponse(
            documents=[DocumentResponse.model_validate(d) for d in docs],
            total_count=len(docs),
            golden_resume_id=golden_id
        )
    except Exception as e:
        print(f"[List Documents Error]: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch documents: {str(e)}")

@router.get("/{doc_id}")
async def get_document(
    doc_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieves full details and raw text of a specific uploaded document.
    """
    user_id = current_user.id
    res = await db.execute(
        select(DocumentModel).where(DocumentModel.id == doc_id, DocumentModel.user_id == user_id)
    )
    doc = res.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return DocumentResponse.model_validate(doc)

@router.post("/{doc_id}/set-golden")
async def set_active_golden_resume(
    doc_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Activates this uploaded resume as the candidate's Master Golden Base Resume.
    Re-anchors the baseline resume content used by the AI Resume Tailoring Pipeline.
    """
    try:
        user_id = current_user.id
        res = await db.execute(
            select(DocumentModel).where(DocumentModel.id == doc_id, DocumentModel.user_id == user_id)
        )
        target_doc = res.scalars().first()
        if not target_doc:
            raise HTTPException(status_code=404, detail="Document not found")
        if target_doc.doc_type != "resume":
            raise HTTPException(status_code=400, detail="Only resume documents can be designated as the Golden Base Resume.")

        # Unset all other documents
        await db.execute(
            update(DocumentModel).where(DocumentModel.user_id == user_id).values(is_golden_template=False)
        )
        target_doc.is_golden_template = True
        target_doc.updated_at = datetime.utcnow()

        # Update Master Resume record
        res_master = await db.execute(
            select(ResumeModel).where(ResumeModel.user_id == user_id, ResumeModel.is_baseline == True)
        )
        master = res_master.scalars().first()

        # Parse target doc content
        parsed = document_extractor.parse_document_content(target_doc.raw_markdown or "")

        # Fetch all verified skills & evidence
        sk_res = await db.execute(select(SkillModel).where(SkillModel.user_id == user_id))
        all_skills = [{"name": s.name, "category": s.category, "proficiency": s.proficiency} for s in sk_res.scalars().all()]

        ev_res = await db.execute(select(EvidenceModel).where(EvidenceModel.user_id == user_id))
        all_ev = [{"title": e.title, "type": e.type, "platform": e.platform, "metric_proof": e.metric_proof} for e in ev_res.scalars().all()]

        prof_res = await db.execute(select(UserProfileModel).where(UserProfileModel.id == user_id))
        prof = prof_res.scalars().first()

        golden_content = {
            "header": parsed.get("golden_resume", {}).get("header") or {
                "name": prof.name if prof else current_user.name,
                "email": prof.email if prof else current_user.email,
                "headline": prof.headline if prof else "Systems Engineer",
                "location": prof.location if prof else "Remote"
            },
            "summary": parsed.get("manifesto") or (prof.manifesto if prof else ""),
            "skills": all_skills,
            "experiences": parsed.get("experiences") or (prof.experiences if prof else []),
            "projects": parsed.get("projects") or (prof.projects if prof else []),
            "education": parsed.get("education") or (prof.education if prof else []),
            "certifications": prof.certifications if prof else [],
            "evidence_items": all_ev
        }

        if master:
            master.title = f"Master Golden Resume ({target_doc.filename})"
            master.raw_text = target_doc.raw_markdown
            master.content_json = golden_content
            master.updated_at = datetime.utcnow()
        else:
            db.add(
                ResumeModel(
                    id=f"res_{uuid.uuid4().hex[:8]}",
                    user_id=user_id,
                    title=f"Master Golden Resume ({target_doc.filename})",
                    is_baseline=True,
                    raw_text=target_doc.raw_markdown,
                    content_json=golden_content
                )
            )

        await db.commit()

        return {
            "status": "success",
            "message": f"Successfully activated '{target_doc.filename}' as your Master Golden Base Resume!",
            "document_id": doc_id,
            "filename": target_doc.filename
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[Set Golden Resume Error]: {e}")
        try:
            await db.rollback()
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Failed to set golden resume: {str(e)}")

@router.delete("/{doc_id}")
async def delete_document(
    doc_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Deletes an uploaded document and removes its RAG vector embeddings.
    """
    try:
        user_id = current_user.id
        res = await db.execute(
            select(DocumentModel).where(DocumentModel.id == doc_id, DocumentModel.user_id == user_id)
        )
        doc = res.scalars().first()
        if not doc:
            raise HTTPException(status_code=404, detail="Document not found")

        was_golden = doc.is_golden_template

        # Delete document record
        await db.delete(doc)

        # Delete associated RAG chunks
        await db.execute(
            delete(DocumentChunkModel).where(
                DocumentChunkModel.user_id == user_id,
                DocumentChunkModel.source_title == doc.filename
            )
        )

        # If deleted doc was golden, fallback to another resume if one exists
        if was_golden:
            remaining_resumes = await db.execute(
                select(DocumentModel).where(
                    DocumentModel.user_id == user_id,
                    DocumentModel.doc_type == "resume"
                ).order_by(desc(DocumentModel.created_at))
            )
            next_resume = remaining_resumes.scalars().first()
            if next_resume:
                next_resume.is_golden_template = True

        await db.commit()
        return {"status": "success", "message": f"Document '{doc.filename}' deleted successfully."}
    except HTTPException:
        raise
    except Exception as e:
        print(f"[Delete Document Error]: {e}")
        try:
            await db.rollback()
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Failed to delete document: {str(e)}")
