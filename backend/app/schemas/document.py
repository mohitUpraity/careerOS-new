from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class DocumentBase(BaseModel):
    filename: str
    doc_type: str = "resume"  # resume, certificate, internship, course, portfolio, other
    file_size: Optional[int] = 0
    file_url: Optional[str] = None
    is_golden_template: Optional[bool] = False
    metadata_json: Optional[Dict[str, Any]] = {}

class DocumentResponse(DocumentBase):
    id: str
    user_id: str
    raw_markdown: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class DocumentListResponse(BaseModel):
    documents: List[DocumentResponse]
    total_count: int
    golden_resume_id: Optional[str] = None

class DocumentUploadResponse(BaseModel):
    status: str
    document_id: str
    filename: str
    doc_type: str
    is_golden_template: bool
    skills_extracted_count: int
    evidence_extracted_count: int
    extracted_summary: Dict[str, Any]
    profile_completeness: int
    overall_readiness: float
    message: str

class SetActiveGoldenTemplateRequest(BaseModel):
    document_id: str

class DocumentExtractTextRequest(BaseModel):
    text: str
    doc_type: str = "resume"
    title: Optional[str] = "Pasted Document"
    set_as_golden: Optional[bool] = False
