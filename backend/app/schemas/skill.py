from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class EvidenceBase(BaseModel):
    title: str
    type: str = "PR" # PR, Package, Paper, System, Benchmark
    platform: str = "GitHub" # GitHub, PyPI, ArXiv, Kaggle, HuggingFace, Production
    sha_hash: Optional[str] = None
    url: Optional[str] = None
    metric_proof: Optional[str] = None
    skills_linked: List[str] = []
    verified: bool = True

class EvidenceCreate(EvidenceBase):
    id: Optional[str] = None
    user_id: Optional[str] = None

class EvidenceResponse(EvidenceBase):
    id: str
    user_id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class SkillBase(BaseModel):
    name: str
    category: str = "AI & ML Infra"
    proficiency: int = 85
    verified: bool = True
    proof_count: int = 1
    ast_proof_hash: Optional[str] = None
    ast_proof_details: Dict[str, Any] = {}
    tags: List[str] = []

class SkillCreate(SkillBase):
    id: Optional[str] = None
    user_id: Optional[str] = None

class SkillResponse(SkillBase):
    id: str
    user_id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class SkillGraphResponse(BaseModel):
    skills: List[SkillResponse]
    evidence: List[EvidenceResponse]
    metrics: Dict[str, Any]
