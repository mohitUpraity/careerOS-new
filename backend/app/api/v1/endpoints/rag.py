from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from typing import List, Optional

from backend.app.core.database import get_db
from backend.app.core.security import get_current_user
from backend.app.models.user import UserModel
from backend.app.models.rag import DocumentChunkModel
from backend.app.services.rag_service import rag_service
from backend.app.schemas.rag import (
    IngestDocumentRequest,
    DocumentChunkResponse,
    SemanticSearchRequest,
    SemanticSearchResponse
)

router = APIRouter()

@router.post("/ingest", response_model=List[DocumentChunkResponse])
async def ingest_document(
    payload: IngestDocumentRequest,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Ingests and chunks a candidate document (LinkedIn article/post, GitHub repo, Certificate, Technical note),
    computes Google Gemini text-embedding-004 vectors, and indexes into the RAG store.
    """
    try:
        user_id = current_user.id
        chunks = await rag_service.ingest_document(
            db=db,
            user_id=user_id,
            doc_type=payload.doc_type,
            source_title=payload.source_title,
            content=payload.content,
            metadata=payload.metadata or {}
        )
        return chunks
    except Exception as err:
        print(f"[RAG Ingestion Error]: {err}")
        raise HTTPException(status_code=500, detail=f"Document ingestion error: {str(err)}")

@router.post("/search", response_model=SemanticSearchResponse)
async def semantic_search(
    payload: SemanticSearchRequest,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Performs semantic vector search across the candidate's indexed document chunks using cosine similarity.
    """
    try:
        user_id = current_user.id
        results = await rag_service.semantic_search(
            db=db,
            user_id=user_id,
            query=payload.query,
            top_k=payload.top_k or 5,
            doc_type=payload.doc_type
        )
        return results
    except Exception as err:
        print(f"[RAG Search Error]: {err}")
        raise HTTPException(status_code=500, detail=f"Semantic search error: {str(err)}")

@router.get("/chunks", response_model=List[DocumentChunkResponse])
async def get_document_chunks(
    doc_type: Optional[str] = None,
    current_user: UserModel = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns all indexed RAG document chunks for the authenticated candidate.
    """
    user_id = current_user.id
    stmt = select(DocumentChunkModel).where(DocumentChunkModel.user_id == user_id)
    if doc_type:
        stmt = stmt.where(DocumentChunkModel.doc_type == doc_type)
    stmt = stmt.order_by(desc(DocumentChunkModel.created_at))

    res = await db.execute(stmt)
    return res.scalars().all()
