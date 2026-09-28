from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ResumeBase(BaseModel):
    title: str = "Master Golden Resume"
    is_baseline: bool = True
    raw_text: Optional[str] = None
    content_json: Dict[str, Any] = {}
    pdf_url: Optional[str] = None

class ResumeCreate(ResumeBase):
    pass

class ResumeResponse(ResumeBase):
    id: str
    user_id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ResumeVersionResponse(BaseModel):
    id: str
    resume_id: str
    user_id: str
    opportunity_id: Optional[str] = None
    target_role: Optional[str] = None
    version_name: str
    content_json: Dict[str, Any]
    diff_summary: Dict[str, Any]
    ats_score: float
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TailorResumeRequest(BaseModel):
    target_jd: str
    target_role: Optional[str] = None
    opportunity_id: Optional[str] = None
    custom_instructions: Optional[str] = None
