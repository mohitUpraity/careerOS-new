from sqlalchemy import Column, String, Integer, Text, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class ApplicationModel(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, default="default_user")
    opportunity_id = Column(String, nullable=True)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    stage = Column(String, default="APPLIED")  # SAVED, APPLIED, SCREENING, INTERVIEW, OFFER, ARCHIVED
    match_score = Column(Integer, default=88)
    salary = Column(String, nullable=True)
    location = Column(String, nullable=True)
    resume_version = Column(String, default="v4")
    tags = Column(JSON, default=list)
    notes = Column(Text, nullable=True)
    applied_date = Column(String, default="Just Now")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
