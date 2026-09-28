from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Body
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.api.v1.endpoints.resume import parse_resume_file, parse_resume_text, commit_golden_resume

router = APIRouter()

@router.post("/parse-resume-file")
async def onboarding_parse_resume_file(
    file: UploadFile = File(...),
    target_roles_str: Optional[str] = Form(None),
    current_user: UserModel = Depends(get_current_user)
):
    return await parse_resume_file(file=file, target_roles_str=target_roles_str, current_user=current_user)

@router.post("/parse-resume-text")
async def onboarding_parse_resume_text(
    payload: Dict[str, Any] = Body(...),
    current_user: UserModel = Depends(get_current_user)
):
    return await parse_resume_text(payload=payload, current_user=current_user)

@router.post("/commit-profile")
async def onboarding_commit_profile(
    payload: Dict[str, Any] = Body(...),
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await commit_golden_resume(payload=payload, current_user=current_user, db=db)
