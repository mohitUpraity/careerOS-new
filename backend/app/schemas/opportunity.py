from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class OpportunityBase(BaseModel):
    id: str
    title: str
    company: str
    category: str = "Jobs"
    location: str = "Remote"
    workplace_type: str = "Remote"
    match_score: int = 85
    match_reason: Optional[str] = None
    salary_range: Optional[str] = None
    experience_level: str = "Mid-Senior"
    posted_date: str = "Recent"
    deadline: Optional[str] = None
    tags: List[str] = []
    key_requirements: List[Any] = []
    hard_skills: List[str] = []
    verified_evidence_required: List[str] = []
    apply_url: Optional[str] = None

class OpportunityCreate(OpportunityBase):
    pass

class OpportunityResponse(OpportunityBase):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class OpportunityListResponse(BaseModel):
    total: int
    items: List[OpportunityResponse]
