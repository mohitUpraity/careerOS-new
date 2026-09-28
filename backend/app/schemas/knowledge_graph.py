from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class VectorReference(BaseModel):
    source_doc: Optional[str] = "Master Golden Resume"
    chunk_index: Optional[int] = 0
    chunk_excerpt: Optional[str] = ""
    similarity_score: Optional[float] = 96.4
    embedding_model: Optional[str] = "text-embedding-004 (Gemini 768-dim)"

class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # user, skill, evidence, project, experience, goal, role, education, opportunity, document
    category: Optional[str] = None
    weight: Optional[float] = 1.0
    properties: Dict[str, Any] = {}
    vector_reference: Optional[VectorReference] = None

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    relationship: str  # POSSESSES_SKILL, SUPPORTED_BY, BUILT_PROJECT, WORKED_AT, TARGETS_GOAL, REQUIRES_SKILL, MATCHES_PROFILE, SOURCES_CANDIDATE_DATA
    weight: Optional[float] = 1.0

class KnowledgeGraphMetrics(BaseModel):
    nodes_count: int
    edges_count: int
    skills_count: int
    evidence_count: int
    verified_evidence_count: int
    readiness_score: float
    evidence_coverage_ratio: float
    core_pillars: List[str]
    top_central_skills: List[str]

class KnowledgeGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    metrics: KnowledgeGraphMetrics
    skill_clusters: Dict[str, List[str]]
