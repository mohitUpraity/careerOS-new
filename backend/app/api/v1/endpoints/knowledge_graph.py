from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc

from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.models.profile import UserProfileModel
from backend.app.models.skill import SkillModel, EvidenceModel
from backend.app.models.opportunity import OpportunityModel
from backend.app.models.rag import DocumentChunkModel
from backend.app.models.document import DocumentModel
from backend.app.services.knowledge_graph_service import knowledge_graph_service
from backend.app.schemas.knowledge_graph import KnowledgeGraphResponse

router = APIRouter()

@router.get("", response_model=KnowledgeGraphResponse)
async def get_user_knowledge_graph(
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Computes and returns the candidate's dynamic Personal Knowledge Graph using NetworkX.
    Links Candidate Persona -> Target Goals -> Verified Skills -> Cryptographic Evidence -> Work Experience -> Projects -> Education -> Vector Citations.
    """
    try:
        user_id = current_user.id

        # 1. Fetch Profile
        prof_res = await db.execute(select(UserProfileModel).where(UserProfileModel.id == user_id))
        profile = prof_res.scalars().first()

        profile_dict = {
            "name": profile.name if profile and profile.name else (current_user.name or "Engineer"),
            "headline": profile.headline if profile and profile.headline else "Software Systems Engineer",
            "seniority_level": profile.seniority_level if profile and profile.seniority_level else "Senior",
            "location": profile.location if profile and profile.location else "Remote",
            "manifesto": profile.manifesto if profile and profile.manifesto else "",
            "target_roles": profile.target_roles if profile and profile.target_roles else ["Software & Systems Engineer"]
        }

        # 2. Fetch Skills
        sk_res = await db.execute(
            select(SkillModel).where(SkillModel.user_id == user_id).order_by(desc(SkillModel.proficiency))
        )
        skills = [
            {
                "id": s.id,
                "name": s.name,
                "category": s.category,
                "proficiency": s.proficiency,
                "ast_proof_hint": s.ast_proof_details.get("proof", "") if isinstance(s.ast_proof_details, dict) else ""
            }
            for s in sk_res.scalars().all()
        ]

        # 3. Fetch Evidence Vault
        ev_res = await db.execute(
            select(EvidenceModel).where(EvidenceModel.user_id == user_id).order_by(desc(EvidenceModel.created_at))
        )
        evidence = [
            {
                "id": e.id,
                "title": e.title,
                "platform": e.platform,
                "type": e.type,
                "metric_proof": e.metric_proof,
                "skills_linked": e.skills_linked or [],
                "verified": e.verified,
                "url": e.url
            }
            for e in ev_res.scalars().all()
        ]

        experiences = profile.experiences if profile and profile.experiences else []
        projects = profile.projects if profile and profile.projects else []
        education = profile.education if profile and profile.education else []
        certifications = profile.certifications if profile and profile.certifications else []

        # 4. Fetch Top Opportunities
        opp_res = await db.execute(
            select(OpportunityModel).order_by(desc(OpportunityModel.match_score)).limit(6)
        )
        opportunities = [
            {
                "id": o.id,
                "title": o.title,
                "company": o.company,
                "match_score": o.match_score,
                "apply_url": o.apply_url
            }
            for o in opp_res.scalars().all()
        ]

        # 5. Fetch RAG Document Chunks
        doc_res = await db.execute(
            select(DocumentChunkModel).where(DocumentChunkModel.user_id == user_id).order_by(DocumentChunkModel.chunk_index).limit(20)
        )
        doc_chunks = [
            {
                "source_title": c.source_title,
                "chunk_index": c.chunk_index,
                "chunk_text": c.chunk_text
            }
            for c in doc_res.scalars().all()
        ]

        # 6. Fetch Uploaded Credentials & Documents
        docs_res = await db.execute(
            select(DocumentModel).where(DocumentModel.user_id == user_id).order_by(desc(DocumentModel.created_at)).limit(25)
        )
        documents = [
            {
                "id": d.id,
                "filename": d.filename,
                "doc_type": d.doc_type,
                "is_golden_template": d.is_golden_template,
                "metadata": d.metadata_json or {}
            }
            for d in docs_res.scalars().all()
        ]

        graph_response = knowledge_graph_service.build_graph(
            user_id=user_id,
            profile_data=profile_dict,
            skills=skills,
            evidence_items=evidence,
            experiences=experiences,
            projects=projects,
            education=education,
            opportunities=opportunities,
            doc_chunks=doc_chunks,
            documents=documents,
            certifications=certifications
        )

        return graph_response
    except Exception as err:
        print(f"[Knowledge Graph Error]: {err}")
        raise HTTPException(status_code=500, detail=f"Graph generation error: {str(err)}")
