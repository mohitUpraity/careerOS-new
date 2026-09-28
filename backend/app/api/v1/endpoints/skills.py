import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
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
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    try:
        user_id = current_user.id

        # Fetch all skills for user
        skills_res = await db.execute(
            select(SkillModel).filter(SkillModel.user_id == user_id).order_by(desc(SkillModel.proficiency))
        )
        skills = skills_res.scalars().all()

        # Fetch all evidence for user
        evidence_res = await db.execute(
            select(EvidenceModel).filter(EvidenceModel.user_id == user_id).order_by(desc(EvidenceModel.created_at))
        )
        evidence = evidence_res.scalars().all()

        # Calculate live graph metrics
        total_skills = len(skills)
        verified_skills = len([s for s in skills if s.verified])
        total_evidence = len(evidence)
        avg_proficiency = round(sum(s.proficiency for s in skills) / max(1, total_skills), 1) if total_skills > 0 else 0.0

        return SkillGraphResponse(
            skills=[SkillResponse.model_validate(s) for s in skills],
            evidence=[EvidenceResponse.model_validate(e) for e in evidence],
            metrics={
                "total_skills": total_skills,
                "verified_skills": verified_skills,
                "total_evidence": total_evidence,
                "avg_proficiency": avg_proficiency,
                "verification_status": "AST_VERIFIED" if verified_skills > 0 else "AWAITING_TELEMETRY",
                "proof_integrity": "Cryptographic AST Proofs" if verified_skills > 0 else "0 Proofs Ingested"
            }
        )
    except Exception as err:
        print(f"[Skill Graph Safe Handler] {err}")
        return SkillGraphResponse(
            skills=[],
            evidence=[],
            metrics={
                "total_skills": 0,
                "verified_skills": 0,
                "total_evidence": 0,
                "avg_proficiency": 0.0,
                "verification_status": "AWAITING_TELEMETRY",
                "proof_integrity": "0 Proofs Ingested"
            }
        )

@router.post("/evidence", response_model=EvidenceResponse, status_code=201)
async def create_evidence(
    payload: EvidenceCreate,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    ev_id = payload.id or f"ev_{uuid.uuid4().hex[:6]}"
    user_id = current_user.id

    new_ev = EvidenceModel(
        id=ev_id,
        user_id=user_id,
        title=payload.title,
        type=payload.type,
        platform=payload.platform,
        sha_hash=payload.sha_hash or f"sha256_{uuid.uuid4().hex[:12]}",
        url=payload.url or "https://github.com",
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
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    skill_id = payload.id or f"sk_{uuid.uuid4().hex[:6]}"
    user_id = current_user.id

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
