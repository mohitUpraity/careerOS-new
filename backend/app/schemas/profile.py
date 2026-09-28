from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserProfileBase(BaseModel):
    name: str = "Engineer"
    headline: Optional[str] = ""
    location: Optional[str] = "Remote"
    email: Optional[str] = ""
    phone: Optional[str] = ""
    portfolio: Optional[str] = ""
    github: Optional[str] = ""
    linkedin: Optional[str] = ""
    leetcode_handle: Optional[str] = ""
    manifesto: Optional[str] = ""
    persona_summary: Optional[str] = ""
    target_roles: Optional[List[str]] = []
    seniority_level: Optional[str] = "Senior"
    discipline: Optional[str] = "Software & Systems Engineering"
    min_salary: Optional[int] = 180000
    target_tc: Optional[int] = 350000
    currency: Optional[str] = "USD"
    modalities: Optional[List[str]] = ["remote", "hybrid"]
    relocation_open: Optional[bool] = True
    years_of_experience: Optional[float] = 3.0
    experiences: Optional[List[Dict[str, Any]]] = []
    education: Optional[List[Dict[str, Any]]] = []
    projects: Optional[List[Dict[str, Any]]] = []
    certifications: Optional[List[Dict[str, Any]]] = []

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    headline: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    portfolio: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    leetcode_handle: Optional[str] = None
    manifesto: Optional[str] = None
    persona_summary: Optional[str] = None
    target_roles: Optional[List[str]] = None
    seniority_level: Optional[str] = None
    discipline: Optional[str] = None
    min_salary: Optional[int] = None
    target_tc: Optional[int] = None
    currency: Optional[str] = None
    modalities: Optional[List[str]] = None
    relocation_open: Optional[bool] = None
    years_of_experience: Optional[float] = None
    experiences: Optional[List[Dict[str, Any]]] = None
    education: Optional[List[Dict[str, Any]]] = None
    projects: Optional[List[Dict[str, Any]]] = None
    certifications: Optional[List[Dict[str, Any]]] = None

class UserProfileResponse(UserProfileBase):
    id: str
    profile_completeness: int = 20
    overall_readiness: int = 40
    onboarding_completed: bool = False
    skills: Optional[List[Any]] = []
    evidence_items: Optional[List[Any]] = []
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
