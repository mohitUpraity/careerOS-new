from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.models.hackathon import HackathonModel
from backend.app.schemas.hackathon import HackathonResponse, HackathonListResponse

router = APIRouter()

@router.get("", response_model=HackathonListResponse)
async def get_hackathons(
    status: Optional[str] = Query(None, description="Filter by status: LIVE, UPCOMING, PAST"),
    search: Optional[str] = Query(None, description="Search by title, organizer, or tags"),
    db: AsyncSession = Depends(get_db)
):
    try:
        query = select(HackathonModel)

        if status and status != "ALL":
            query = query.where(HackathonModel.status == status.upper())

        if search:
            search_pattern = f"%{search}%"
            query = query.where(
                or_(
                    HackathonModel.title.ilike(search_pattern),
                    HackathonModel.organizer.ilike(search_pattern)
                )
            )

        result = await db.execute(query)
        items = result.scalars().all()

        return HackathonListResponse(
            total=len(items),
            items=[HackathonResponse.model_validate(h) for h in items]
        )
    except Exception as err:
        print(f"[Hackathons Fetch Safe Handler] {err}")
        return HackathonListResponse(total=0, items=[])

