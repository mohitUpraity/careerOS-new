from sqlalchemy import Column, String, Integer, Float, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class OpportunityModel(Base):
    __tablename__ = "opportunities"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    category = Column(String, default="Jobs")  # Jobs, Internships, Research, Scholarships
    location = Column(String, default="Remote")
    workplace_type = Column(String, default="Remote")  # Remote, Hybrid, Onsite
    match_score = Column(Integer, default=85)
    match_reason = Column(Text, nullable=True)
    salary_range = Column(String, nullable=True)
    experience_level = Column(String, default="Mid-Senior")
    posted_date = Column(String, default="Recent")
    deadline = Column(String, nullable=True)
    tags = Column(JSON, default=list)
    key_requirements = Column(JSON, default=list)
    hard_skills = Column(JSON, default=list)
    verified_evidence_required = Column(JSON, default=list)
    apply_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class SavedOpportunityModel(Base):
    __tablename__ = "saved_opportunities"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    opportunity_id = Column(String, index=True, nullable=False)
    saved_at = Column(DateTime, default=datetime.utcnow)
