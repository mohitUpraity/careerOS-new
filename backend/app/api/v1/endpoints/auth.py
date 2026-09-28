from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime

from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.models.profile import UserProfileModel

router = APIRouter()

class UserSyncRequest(BaseModel):
    uid: str
    email: str
    name: Optional[str] = "Engineer"
    avatar_url: Optional[str] = None

class UserAuthResponse(BaseModel):
    id: str
    email: str
    name: str
    avatar_url: Optional[str] = None
    profile_completeness: int = 20
    overall_readiness: int = 40
    onboarding_completed: bool = False
    created_at: datetime

    class Config:
        from_attributes = True

@router.post("/sync", response_model=UserAuthResponse)
async def sync_firebase_user(
    payload: UserSyncRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Called after Firebase Auth (Google / Email) login on frontend.
    Upserts user record and profile in Supabase PostgreSQL (Single Source of Truth).
    """
    try:
        # 1. Check or Upsert User in Supabase PostgreSQL
        result = await db.execute(select(UserModel).filter(UserModel.id == payload.uid))
        user = result.scalars().first()

        if not user:
            user = UserModel(
                id=payload.uid,
                email=payload.email,
                name=payload.name or "Engineer",
                avatar_url=payload.avatar_url,
            )
            db.add(user)
        else:
            user.email = payload.email
            if payload.name:
                user.name = payload.name
            if payload.avatar_url:
                user.avatar_url = payload.avatar_url
            user.updated_at = datetime.utcnow()

        # 2. Check or Upsert UserProfile in Supabase PostgreSQL
        prof_res = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == payload.uid))
        profile = prof_res.scalars().first()
        if not profile:
            profile = UserProfileModel(
                id=payload.uid,
                name=payload.name or "Engineer",
                email=payload.email,
                onboarding_completed=False,
                profile_completeness=20,
                overall_readiness=40,
            )
            db.add(profile)
        else:
            profile.email = payload.email
            if payload.name and profile.name == "Engineer":
                profile.name = payload.name

        await db.commit()
        await db.refresh(user)
        await db.refresh(profile)

        return UserAuthResponse(
            id=user.id,
            email=user.email,
            name=user.name,
            avatar_url=user.avatar_url,
            profile_completeness=profile.profile_completeness,
            overall_readiness=profile.overall_readiness,
            onboarding_completed=getattr(profile, "onboarding_completed", False),
            created_at=user.created_at,
        )
    except Exception as err:
        print(f"[Supabase Auth Sync Warning] Database connection deferred/failed: {err}")
        try:
            await db.rollback()
        except Exception:
            pass
        # Fallback: Return standard candidate auth profile so user is never blocked
        return UserAuthResponse(
            id=payload.uid,
            email=payload.email,
            name=payload.name or "Engineer",
            avatar_url=payload.avatar_url,
            profile_completeness=20,
            overall_readiness=40,
            onboarding_completed=False,
            created_at=datetime.utcnow(),
        )

@router.get("/me", response_model=UserAuthResponse)
async def get_my_info(
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns verified user profile from Supabase PostgreSQL.
    """
    prof_res = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == current_user.id))
    profile = prof_res.scalars().first()
    
    completeness = profile.profile_completeness if profile else 20
    readiness = profile.overall_readiness if profile else 40
    onboarded = getattr(profile, "onboarding_completed", False) if profile else False

    return UserAuthResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        avatar_url=current_user.avatar_url,
        profile_completeness=completeness,
        overall_readiness=readiness,
        onboarding_completed=onboarded,
        created_at=current_user.created_at,
    )
