from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ApplicationBase(BaseModel):
    company: str
    role: str
    stage: str = "APPLIED" # SAVED, APPLIED, SCREENING, INTERVIEW, OFFER, ARCHIVED
    match_score: int = 88
    salary: Optional[str] = None
    location: Optional[str] = "Remote"
    resume_version: str = "v4"
    tags: List[str] = []
    notes: Optional[str] = None
    applied_date: Optional[str] = "Just Now"

class ApplicationCreate(ApplicationBase):
    id: Optional[str] = None
    user_id: Optional[str] = None
    opportunity_id: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    stage: Optional[str] = None
    match_score: Optional[int] = None
    salary: Optional[str] = None
    location: Optional[str] = None
    resume_version: Optional[str] = None
    tags: Optional[List[str]] = None
    notes: Optional[str] = None

class ApplicationResponse(ApplicationBase):
    id: str
    user_id: str
    opportunity_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ApplicationListResponse(BaseModel):
    total: int
    items: List[ApplicationResponse]
