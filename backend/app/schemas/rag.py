from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class IngestDocumentRequest(BaseModel):
    doc_type: str = "resume" # resume, linkedin_post, github_repo, certificate, project_doc, notes
    source_title: str
    content: str
    metadata: Optional[Dict[str, Any]] = {}

class DocumentChunkResponse(BaseModel):
    id: str
    user_id: str
    doc_type: str
    source_title: str
    chunk_index: int
    chunk_text: str
    metadata_json: Dict[str, Any]
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class SemanticSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5
    doc_type: Optional[str] = None

class SearchResultItem(BaseModel):
    chunk_id: str
    doc_type: str
    source_title: str
    chunk_text: str
    similarity_score: float
    metadata: Dict[str, Any]

class SemanticSearchResponse(BaseModel):
    query: str
    total_results: int
    results: List[SearchResultItem]
