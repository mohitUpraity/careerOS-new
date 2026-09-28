from sqlalchemy import Column, String, Integer, Float, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class ResumeModel(Base):
    __tablename__ = "resumes"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    title = Column(String, default="Master Golden Resume")
    is_baseline = Column(Boolean, default=True)
    raw_text = Column(Text, nullable=True)
    
    # Structured Golden Resume Representation
    # {
    #   "header": { "name": "...", "email": "...", "phone": "...", "location": "...", "links": [...] },
    #   "summary": "...",
    #   "skills": [...],
    #   "experiences": [...],
    #   "projects": [...],
    #   "education": [...],
    #   "certifications": [...]
    # }
    content_json = Column(JSON, default=dict)
    pdf_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ResumeVersionModel(Base):
    __tablename__ = "resume_versions"

    id = Column(String, primary_key=True, index=True)
    resume_id = Column(String, index=True, nullable=False)
    user_id = Column(String, index=True, nullable=False)
    opportunity_id = Column(String, index=True, nullable=True)
    target_role = Column(String, nullable=True)
    version_name = Column(String, default="Tailored Version")
    content_json = Column(JSON, default=dict)
    diff_summary = Column(JSON, default=dict) # Key-by-key changes & explanations
    ats_score = Column(Float, default=85.0)
    created_at = Column(DateTime, default=datetime.utcnow)
