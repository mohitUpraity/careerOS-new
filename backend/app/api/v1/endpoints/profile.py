from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.core.database import get_db
from backend.app.models.profile import UserProfileModel
from backend.app.schemas.profile import UserProfileResponse, UserProfileUpdate

router = APIRouter()

@router.get("", response_model=UserProfileResponse)
async def get_profile(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == "default_user"))
    profile = result.scalars().first()
    
    if not profile:
        profile = UserProfileModel(id="default_user")
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
        
    return profile

@router.put("", response_model=UserProfileResponse)
async def update_profile(updates: UserProfileUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == "default_user"))
    profile = result.scalars().first()
    
    if not profile:
        profile = UserProfileModel(id="default_user")
        db.add(profile)
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(profile, key, value)
        
    await db.commit()
    await db.refresh(profile)
    return profile
