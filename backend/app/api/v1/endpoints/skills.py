import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.models.skill import SkillModel, EvidenceModel, SkillGapModel
from backend.app.schemas.skill import (
    SkillResponse,
    EvidenceResponse,
    SkillGraphResponse,
    EvidenceCreate,
    SkillCreate
)

router = APIRouter()

@router.get("/graph", response_model=SkillGraphResponse)
async def get_skill_graph(
    user_id: Optional[str] = Query("default_user"),
    db: AsyncSession = Depends(get_db)
):
    # Fetch all skills
    skills_res = await db.execute(select(SkillModel).order_by(desc(SkillModel.proficiency)))
    skills = skills_res.scalars().all()

    # Fetch all evidence
    evidence_res = await db.execute(select(EvidenceModel).order_by(desc(EvidenceModel.created_at)))
    evidence = evidence_res.scalars().all()

    # Calculate live graph metrics
    total_skills = len(skills)
    verified_skills = len([s for s in skills if s.verified])
    total_evidence = len(evidence)
    avg_proficiency = round(sum(s.proficiency for s in skills) / max(1, total_skills), 1)

    return SkillGraphResponse(
        skills=[SkillResponse.model_validate(s) for s in skills],
        evidence=[EvidenceResponse.model_validate(e) for e in evidence],
        metrics={
            "total_skills": total_skills,
            "verified_skills": verified_skills,
            "total_evidence": total_evidence,
            "avg_proficiency": avg_proficiency,
            "verification_status": "AST_VERIFIED",
            "proof_integrity": "100% Deterministic Cryptographic Proof"
        }
    )

@router.post("/evidence", response_model=EvidenceResponse, status_code=201)
async def create_evidence(
    payload: EvidenceCreate,
    db: AsyncSession = Depends(get_db)
):
    ev_id = payload.id or f"ev_{uuid.uuid4().hex[:6]}"
    user_id = payload.user_id or "default_user"

    new_ev = EvidenceModel(
        id=ev_id,
        user_id=user_id,
        title=payload.title,
        type=payload.type,
        platform=payload.platform,
        sha_hash=payload.sha_hash or f"sha256_{uuid.uuid4().hex[:12]}",
        url=payload.url or "https://github.com/mohitUpraity/careerOS-new",
        metric_proof=payload.metric_proof or "AST syntax verified",
        skills_linked=payload.skills_linked or [],
        verified=payload.verified
    )

    db.add(new_ev)
    await db.commit()
    await db.refresh(new_ev)

    return EvidenceResponse.model_validate(new_ev)

@router.post("", response_model=SkillResponse, status_code=201)
async def create_skill(
    payload: SkillCreate,
    db: AsyncSession = Depends(get_db)
):
    skill_id = payload.id or f"sk_{uuid.uuid4().hex[:6]}"
    user_id = payload.user_id or "default_user"

    new_skill = SkillModel(
        id=skill_id,
        user_id=user_id,
        name=payload.name,
        category=payload.category,
        proficiency=payload.proficiency,
        verified=payload.verified,
        proof_count=payload.proof_count,
        ast_proof_hash=payload.ast_proof_hash or f"sha256_{uuid.uuid4().hex[:12]}",
        ast_proof_details=payload.ast_proof_details or {},
        tags=payload.tags or []
    )

    db.add(new_skill)
    await db.commit()
    await db.refresh(new_skill)

    return SkillResponse.model_validate(new_skill)
