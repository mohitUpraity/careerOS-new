from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserProfileBase(BaseModel):
    name: str = "Mohit Upraity"
    headline: str = "AI Systems & Low-Latency Engineer"
    location: str = "Bengaluru, India / Remote PST"
    email: str = "mohit@careeros.ai"
    github: str = "https://github.com/mohitUpraity"
    linkedin: str = "https://linkedin.com/in/mohitupraity"
    manifesto: str = "Passionate about high-throughput distributed inference and zero-copy kernel networking."
    target_roles: List[str] = [
        "AI Infrastructure Engineer",
        "Distributed Systems Engineer",
        "MLOps Architect",
        "Kernel & Systems Security Engineer",
    ]
    profile_completeness: int = 94
    overall_readiness: int = 88

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    headline: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    manifesto: Optional[str] = None
    target_roles: Optional[List[str]] = None

class UserProfileResponse(UserProfileBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
