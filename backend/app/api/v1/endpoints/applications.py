import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.models.application import ApplicationModel
from backend.app.schemas.application import (
    ApplicationResponse,
    ApplicationListResponse,
    ApplicationCreate,
    ApplicationUpdate
)

router = APIRouter()

@router.get("", response_model=ApplicationListResponse)
async def get_applications(
    user_id: Optional[str] = Query("default_user"),
    stage: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(ApplicationModel).order_by(desc(ApplicationModel.created_at))
    if stage and stage != "ALL":
        query = query.where(ApplicationModel.stage == stage)

    result = await db.execute(query)
    applications = result.scalars().all()

    return ApplicationListResponse(
        total=len(applications),
        items=[ApplicationResponse.model_validate(app) for app in applications]
    )

@router.post("", response_model=ApplicationResponse, status_code=201)
async def create_application(
    payload: ApplicationCreate,
    db: AsyncSession = Depends(get_db)
):
    app_id = payload.id or f"app_{uuid.uuid4().hex[:8]}"
    user_id = payload.user_id or "default_user"

    new_app = ApplicationModel(
        id=app_id,
        user_id=user_id,
        opportunity_id=payload.opportunity_id,
        company=payload.company,
        role=payload.role,
        stage=payload.stage or "APPLIED",
        match_score=payload.match_score or 88,
        salary=payload.salary,
        location=payload.location or "Remote",
        resume_version=payload.resume_version or "v4",
        tags=payload.tags or [],
        notes=payload.notes or "",
        applied_date=payload.applied_date or "Just Now"
    )

    db.add(new_app)
    await db.commit()
    await db.refresh(new_app)

    return ApplicationResponse.model_validate(new_app)

@router.patch("/{application_id}", response_model=ApplicationResponse)
async def update_application(
    application_id: str,
    payload: ApplicationUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(ApplicationModel).where(ApplicationModel.id == application_id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(app, key, value)

    await db.commit()
    await db.refresh(app)

    return ApplicationResponse.model_validate(app)

@router.delete("/{application_id}")
async def delete_application(
    application_id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(ApplicationModel).where(ApplicationModel.id == application_id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    await db.delete(app)
    await db.commit()

    return {"status": "success", "message": f"Application {application_id} deleted"}
