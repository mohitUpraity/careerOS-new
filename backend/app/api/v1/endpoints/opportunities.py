from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.models.opportunity import OpportunityModel, SavedOpportunityModel
from backend.app.schemas.opportunity import OpportunityResponse, OpportunityListResponse

router = APIRouter()

@router.get("", response_model=OpportunityListResponse)
async def get_opportunities(
    category: Optional[str] = Query(None, description="Filter by category: Jobs, Internships, Research, Scholarships"),
    search: Optional[str] = Query(None, description="Search by title, company, or keyword"),
    min_match_score: Optional[int] = Query(None, ge=0, le=100, description="Minimum match score"),
    db: AsyncSession = Depends(get_db)
):
    query = select(OpportunityModel)

    if category and category != "All":
        query = query.where(OpportunityModel.category == category)

    if min_match_score:
        query = query.where(OpportunityModel.match_score >= min_match_score)

    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            or_(
                OpportunityModel.title.ilike(search_pattern),
                OpportunityModel.company.ilike(search_pattern),
                OpportunityModel.location.ilike(search_pattern)
            )
        )

    query = query.order_by(OpportunityModel.match_score.desc())
    result = await db.execute(query)
    opportunities = result.scalars().all()

    return OpportunityListResponse(
        total=len(opportunities),
        items=[OpportunityResponse.model_validate(opp) for opp in opportunities]
    )

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
