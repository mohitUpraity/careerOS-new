from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, desc
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.models.profile import UserProfileModel
from backend.app.models.skill import SkillModel, EvidenceModel
from backend.app.models.opportunity import OpportunityModel, SavedOpportunityModel
from backend.app.schemas.opportunity import OpportunityResponse, OpportunityListResponse
from backend.app.services.matching_service import matching_service

router = APIRouter()

@router.get("", response_model=OpportunityListResponse)
async def get_opportunities(
    category: Optional[str] = Query(None, description="Filter by category: Jobs, Internships, Research, Scholarships"),
    search: Optional[str] = Query(None, description="Search by title, company, or keyword"),
    min_match_score: Optional[int] = Query(None, ge=0, le=100, description="Minimum match score"),
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Check if user is authenticated
        current_user = None
        user_profile = None
        user_skills = []
        user_evidence = []

        if authorization and authorization.startswith("Bearer "):
            try:
                current_user = await get_current_user(authorization=authorization, db=db)
                if current_user:
                    prof_res = await db.execute(select(UserProfileModel).where(UserProfileModel.id == current_user.id))
                    user_profile = prof_res.scalars().first()

                    sk_res = await db.execute(select(SkillModel).where(SkillModel.user_id == current_user.id))
                    user_skills = sk_res.scalars().all()

                    ev_res = await db.execute(select(EvidenceModel).where(EvidenceModel.user_id == current_user.id))
                    user_evidence = ev_res.scalars().all()
            except Exception as e:
                print(f"[Opportunities User Context Note]: {e}")

        query = select(OpportunityModel)

        if category and category != "All":
            query = query.where(OpportunityModel.category == category)

        if search:
            search_pattern = f"%{search}%"
            query = query.where(
                or_(
                    OpportunityModel.title.ilike(search_pattern),
                    OpportunityModel.company.ilike(search_pattern),
                    OpportunityModel.location.ilike(search_pattern)
                )
            )

        result = await db.execute(query)
        opportunities = result.scalars().all()

        scored_opps = []
        for opp in opportunities:
            opp_dict = {
                "id": opp.id,
                "title": opp.title,
                "company": opp.company,
                "category": opp.category,
                "location": opp.location,
                "workplace_type": opp.workplace_type,
                "match_score": opp.match_score,
                "match_reason": opp.match_reason,
                "salary_range": opp.salary_range,
                "experience_level": opp.experience_level,
                "posted_date": opp.posted_date,
                "deadline": opp.deadline,
                "tags": opp.tags or [],
                "key_requirements": opp.key_requirements or [],
                "hard_skills": opp.hard_skills or [],
                "verified_evidence_required": opp.verified_evidence_required or [],
                "apply_url": opp.apply_url,
                "created_at": opp.created_at,
                "updated_at": opp.updated_at
            }

            # If user has a personalized profile, calculate dynamic Knowledge Graph match score
            if user_profile and user_skills:
                match_score, breakdown = matching_service.compute_match(
                    profile=user_profile,
                    skills=user_skills,
                    evidence_items=user_evidence,
                    opportunity=opp
                )
                opp_dict["match_score"] = match_score
                opp_dict["match_reason"] = breakdown["match_reason"]

            if min_match_score is None or opp_dict["match_score"] >= min_match_score:
                scored_opps.append(opp_dict)

        # Sort by match score descending
        scored_opps.sort(key=lambda x: x["match_score"], reverse=True)

        return OpportunityListResponse(
            total=len(scored_opps),
            items=[OpportunityResponse.model_validate(o) for o in scored_opps]
        )
    except Exception as err:
        print(f"[Opportunities Fetch Safe Handler] {err}")
        return OpportunityListResponse(total=0, items=[])

@router.get("/{opportunity_id}", response_model=OpportunityResponse)
async def get_opportunity_by_id(
    opportunity_id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(OpportunityModel).where(OpportunityModel.id == opportunity_id))
    opp = result.scalar_one_or_none()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return OpportunityResponse.model_validate(opp)
