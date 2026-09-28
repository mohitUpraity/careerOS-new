from sqlalchemy import Column, String, Integer, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class DocumentModel(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    filename = Column(String, nullable=False)
    doc_type = Column(String, nullable=False, default="resume")  # resume, certificate, internship, course, portfolio, other
    file_size = Column(Integer, default=0)
    file_url = Column(String, nullable=True)
    raw_markdown = Column(Text, nullable=True)
    metadata_json = Column(JSON, default=dict)  # extracted entity summary, issuer, credential_id, etc.
    is_golden_template = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
