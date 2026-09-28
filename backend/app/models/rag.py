from sqlalchemy import Column, String, Integer, Float, Text, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class DocumentChunkModel(Base):
    __tablename__ = "document_chunks"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    doc_type = Column(String, default="resume") # resume, linkedin_post, github_repo, certificate, project_doc, notes
    source_title = Column(String, nullable=False)
    chunk_index = Column(Integer, default=0)
    chunk_text = Column(Text, nullable=False)
    embedding = Column(JSON, nullable=True) # 768-dimensional float array from Google Gemini text-embedding-004
    metadata_json = Column(JSON, default=dict) # Source tags, section type, timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
