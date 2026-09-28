from sqlalchemy import Column, String, Integer, Float, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class UserProfileModel(Base):
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True, index=True) # Firebase UID
    name = Column(String, default="Engineer")
    headline = Column(String, default="")
    location = Column(String, default="Remote")
    email = Column(String, default="")
    phone = Column(String, default="")
    portfolio = Column(String, default="")
    github = Column(String, default="")
    linkedin = Column(String, default="")
    leetcode_handle = Column(String, default="")
    manifesto = Column(Text, default="")
    persona_summary = Column(Text, default="")
    target_roles = Column(JSON, default=lambda: [])
    profile_completeness = Column(Integer, default=20)
    overall_readiness = Column(Integer, default=40)
    onboarding_completed = Column(Boolean, default=False)
    
    # Granular Preferences & Compensation Floor
    seniority_level = Column(String, default="Senior")
    discipline = Column(String, default="Software & Systems Engineering")
    min_salary = Column(Integer, default=180000)
    target_tc = Column(Integer, default=350000)
    currency = Column(String, default="USD")
    modalities = Column(JSON, default=lambda: ["remote", "hybrid"])
    relocation_open = Column(Boolean, default=True)
    years_of_experience = Column(Float, default=3.0)

    # Rich Profile Entities
    experiences = Column(JSON, default=lambda: []) # List of {company, role, duration, highlights, technologies}
    education = Column(JSON, default=lambda: [])   # List of {degree, institution, year, details}
    projects = Column(JSON, default=lambda: [])    # List of {title, description, technologies, repo_url, demo_url}
    certifications = Column(JSON, default=lambda: []) # List of {name, issuer, year, credential_id, url}

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
