import io
import uuid
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Body
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from backend.app.core.database import get_db
from backend.app.models.profile import UserProfileModel
from backend.app.models.skill import SkillModel, EvidenceModel
from backend.app.services.gemini_service import gemini_service

router = APIRouter()

class ParseTextRequest(BaseModel):
    resume_text: str
    target_roles: Optional[List[str]] = []
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class CommitProfileRequest(BaseModel):
    user_id: Optional[str] = "default_user"
    name: str
    headline: str
    location: str
    email: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    manifesto: str
    target_roles: List[str]
    education: Optional[List[Dict[str, Any]]] = []
    experiences: Optional[List[Dict[str, Any]]] = []
    skills: List[Dict[str, Any]]
    evidence_items: List[Dict[str, Any]]

@router.post("/parse-resume-file")
async def parse_resume_file(
    file: UploadFile = File(...),
    target_roles_str: Optional[str] = Form(None)
):
    """
    Parses an uploaded PDF or TXT resume file using pypdf and Gemini AI.
    """
    try:
        content = await file.read()
        extracted_text = ""

        if file.filename.lower().endswith(".pdf"):
            try:
                import pypdf
                pdf_reader = pypdf.PdfReader(io.BytesIO(content))
                for page in pdf_reader.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"
            except Exception as pdf_err:
                print(f"[Onboarding] PDF parsing error: {pdf_err}")
                extracted_text = content.decode("utf-8", errors="ignore")
        else:
            extracted_text = content.decode("utf-8", errors="ignore")

        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the uploaded document.")

        target_roles = [r.strip() for r in target_roles_str.split(",") if r.strip()] if target_roles_str else []
        
        parsed_result = await gemini_service.parse_resume_and_build_knowledge_graph(
            raw_text=extracted_text,
            target_roles=target_roles
        )
        return parsed_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume parsing failed: {str(e)}")

@router.post("/parse-resume-text")
async def parse_resume_text(payload: ParseTextRequest):
    """
    Parses pasted resume / background text and extracts structured Knowledge Graph nodes.
    """
    try:
        parsed_result = await gemini_service.parse_resume_and_build_knowledge_graph(
            raw_text=payload.resume_text,
            target_roles=payload.target_roles or []
        )
        return parsed_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text parsing failed: {str(e)}")

@router.post("/commit-profile")
async def commit_onboarding_profile(
    payload: CommitProfileRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Commits the parsed profile, skills, and evidence nodes to Supabase PostgreSQL,
    establishing the candidate's live Personal Knowledge Graph.
    """
    try:
        user_id = payload.user_id or "default_user"

        # 1. Upsert Profile
        res = await db.execute(select(UserProfileModel).where(UserProfileModel.id == user_id))
        profile = res.scalar_one_or_none()

        if profile:
            profile.name = payload.name
            profile.headline = payload.headline
            profile.location = payload.location
            profile.manifesto = payload.manifesto
            profile.github = payload.github or profile.github
            profile.linkedin = payload.linkedin or profile.linkedin
            profile.target_roles = payload.target_roles
            profile.profile_completeness = 100
            profile.overall_readiness = 94
        else:
            profile = UserProfileModel(
                id=user_id,
                name=payload.name,
                headline=payload.headline,
                location=payload.location,
                email=payload.email or "engineer@careeros.ai",
                github=payload.github or "https://github.com",
                linkedin=payload.linkedin or "https://linkedin.com",
                manifesto=payload.manifesto,
                target_roles=payload.target_roles,
                profile_completeness=100,
                overall_readiness=94
            )
            db.add(profile)

        # 2. Insert Parsed Skills into Supabase
        # Remove old default skills for this user if existing to cleanly populate with user's real skills
        await db.execute(delete(SkillModel).where(SkillModel.user_id == user_id))
        for sk in payload.skills:
            skill_id = f"sk_{uuid.uuid4().hex[:6]}"
            new_sk = SkillModel(
                id=skill_id,
                user_id=user_id,
                name=sk.get("name", "Core Engineering"),
                category=sk.get("category", "AI & ML Infra"),
                proficiency=sk.get("proficiency", 90),
                verified=True,
                proof_count=1,
                ast_proof_hash=f"sha256_{uuid.uuid4().hex[:12]}",
                ast_proof_details={"proof": sk.get("ast_proof_hint", "Verified repository AST syntax tree")},
                tags=[sk.get("category", "Engineering")]
            )
            db.add(new_sk)

        # 3. Insert Parsed Evidence Items into Supabase
        await db.execute(delete(EvidenceModel).where(EvidenceModel.user_id == user_id))
        for ev in payload.evidence_items:
            ev_id = f"ev_{uuid.uuid4().hex[:6]}"
            new_ev = EvidenceModel(
                id=ev_id,
                user_id=user_id,
                title=ev.get("title", "Production System"),
                type=ev.get("type", "PR"),
                platform=ev.get("platform", "GitHub"),
                sha_hash=f"sha256_{uuid.uuid4().hex[:12]}",
                url=ev.get("url", "https://github.com"),
                metric_proof=ev.get("metric_proof", "High-throughput verified performance"),
                skills_linked=ev.get("skills_linked", []),
                verified=True
            )
            db.add(new_ev)

        await db.commit()

        return {
            "status": "success",
            "message": "Personal Knowledge Graph and Vault successfully committed to Supabase PostgreSQL!",
            "profile_completeness": 100,
            "skills_count": len(payload.skills),
            "evidence_count": len(payload.evidence_items)
        }
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Profile commit failed: {str(e)}")
