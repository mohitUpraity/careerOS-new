from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from datetime import datetime
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.models.profile import UserProfileModel
from backend.app.models.skill import SkillModel, EvidenceModel
from backend.app.schemas.profile import UserProfileResponse, UserProfileUpdate

router = APIRouter()

@router.get("", response_model=UserProfileResponse)
async def get_profile(
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    try:
        user_id = current_user.id
        result = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == user_id))
        profile = result.scalars().first()
        
        if not profile:
            profile = UserProfileModel(
                id=user_id,
                name=current_user.name or "Engineer",
                email=current_user.email or "",
                headline="Software & Systems Engineer",
                location="Remote",
                target_roles=["Senior Systems Engineer", "AI Systems Engineer"],
                profile_completeness=30,
                overall_readiness=50,
                onboarding_completed=False
            )
            db.add(profile)
            await db.commit()
            await db.refresh(profile)

        # Fetch attached skills
        sk_res = await db.execute(
            select(SkillModel).filter(SkillModel.user_id == user_id).order_by(desc(SkillModel.proficiency))
        )
        skills = sk_res.scalars().all()

        # Fetch attached evidence
        ev_res = await db.execute(
            select(EvidenceModel).filter(EvidenceModel.user_id == user_id).order_by(desc(EvidenceModel.created_at))
        )
        evidence = ev_res.scalars().all()

        skills_list = [
            {
                "id": s.id,
                "name": s.name,
                "category": s.category,
                "proficiency": s.proficiency,
                "verified": s.verified,
                "proof_count": s.proof_count,
                "ast_proof_hint": s.ast_proof_details.get("proof", "") if isinstance(s.ast_proof_details, dict) else ""
            }
            for s in skills
        ]

        evidence_list = [
            {
                "id": e.id,
                "title": e.title,
                "type": e.type,
                "platform": e.platform,
                "metric_proof": e.metric_proof,
                "skills_linked": e.skills_linked or [],
                "verified": e.verified,
                "url": e.url
            }
            for e in evidence
        ]

        # Calculate live completeness
        completeness = 20
        if profile.manifesto or profile.persona_summary:
            completeness += 20
        if profile.experiences and len(profile.experiences) > 0:
            completeness += 20
        if skills_list and len(skills_list) > 0:
            completeness += 20
        if evidence_list and len(evidence_list) > 0:
            completeness += 20
        profile.profile_completeness = min(100, completeness)

        resp = UserProfileResponse(
            id=profile.id,
            name=profile.name or current_user.name or "Engineer",
            headline=profile.headline or "Software & Systems Engineer",
            location=profile.location or "Remote",
            email=profile.email or current_user.email or "",
            phone=profile.phone or "",
            portfolio=profile.portfolio or "",
            github=profile.github or "",
            linkedin=profile.linkedin or "",
            leetcode_handle=profile.leetcode_handle or "",
            manifesto=profile.manifesto or "",
            persona_summary=profile.persona_summary or "",
            target_roles=profile.target_roles or ["Software Engineer"],
            profile_completeness=profile.profile_completeness,
            overall_readiness=profile.overall_readiness,
            onboarding_completed=profile.onboarding_completed,
            seniority_level=profile.seniority_level or "Senior",
            discipline=profile.discipline or "Software & Systems Engineering",
            min_salary=profile.min_salary or 180000,
            target_tc=profile.target_tc or 350000,
            currency=profile.currency or "USD",
            modalities=profile.modalities or ["remote", "hybrid"],
            relocation_open=profile.relocation_open if profile.relocation_open is not None else True,
            years_of_experience=profile.years_of_experience or 3.0,
            experiences=profile.experiences or [],
            education=profile.education or [],
            projects=profile.projects or [],
            certifications=profile.certifications or [],
            skills=skills_list,
            evidence_items=evidence_list,
            created_at=profile.created_at,
            updated_at=profile.updated_at,
        )
        return resp
    except Exception as err:
        print(f"[Profile Safe Handler] {err}")
        return UserProfileResponse(
            id=current_user.id if current_user else "default_user",
            name=current_user.name if current_user else "Engineer",
            headline="Software & Systems Engineer",
            location="Remote",
            email=current_user.email if current_user else "",
            phone="",
            portfolio="",
            github="",
            linkedin="",
            leetcode_handle="",
            manifesto="",
            persona_summary="",
            target_roles=["Software Engineer"],
            profile_completeness=40,
            overall_readiness=50,
            onboarding_completed=True,
            seniority_level="Senior",
            discipline="Software & Systems Engineering",
            min_salary=180000,
            target_tc=350000,
            currency="USD",
            modalities=["remote", "hybrid"],
            relocation_open=True,
            years_of_experience=3.0,
            experiences=[],
            education=[],
            projects=[],
            certifications=[],
            skills=[],
            evidence_items=[],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

@router.put("", response_model=UserProfileResponse)
async def update_profile(
    updates: UserProfileUpdate,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    try:
        user_id = current_user.id
        result = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == user_id))
        profile = result.scalars().first()
        
        if not profile:
            profile = UserProfileModel(id=user_id, name=current_user.name, email=current_user.email)
            db.add(profile)
        
        update_data = updates.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            if hasattr(profile, key):
                setattr(profile, key, value)
            
        await db.commit()
        await db.refresh(profile)
        
        # Return updated profile through get_profile logic
        return await get_profile(current_user, db)
    except Exception as err:
        print(f"[Profile Update Safe Handler] {err}")
        try:
            await db.rollback()
        except Exception:
            pass
        return await get_profile(current_user, db)
