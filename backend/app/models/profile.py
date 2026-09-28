from sqlalchemy import Column, String, Integer, Float, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class UserProfileModel(Base):
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True, index=True, default="default_user")
    name = Column(String, default="Engineer")
    headline = Column(String, default="")
    location = Column(String, default="Remote")
    email = Column(String, default="")
    github = Column(String, default="")
    linkedin = Column(String, default="")
    manifesto = Column(Text, default="")
    target_roles = Column(JSON, default=lambda: [])
    profile_completeness = Column(Integer, default=20)
    overall_readiness = Column(Integer, default=40)
    onboarding_completed = Column(Boolean, default=False)
    
    # Granular Preferences
    seniority_level = Column(String, default="IC5")
    discipline = Column(String, default="ai_sys")
    min_salary = Column(Integer, default=180000)
    target_tc = Column(Integer, default=350000)
    currency = Column(String, default="USD")
    modalities = Column(JSON, default=lambda: ["remote", "hybrid"])
    relocation_open = Column(Boolean, default=True)
    leetcode_handle = Column(String, default="")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
