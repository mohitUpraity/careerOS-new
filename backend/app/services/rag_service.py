import uuid
import math
from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from backend.app.models.rag import DocumentChunkModel
from backend.app.services.gemini_service import gemini_service
from backend.app.schemas.rag import SearchResultItem, SemanticSearchResponse

def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    if not vec_a or not vec_b:
        return 0.0
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot / (norm_a * norm_b)

class RAGService:
    """
    RAG & Vector Retrieval Engine for CareerOS.
    Chunks user documents (resumes, LinkedIn posts, GitHub repos, certifications),
    computes Google text-embedding-004 vectors, and executes semantic hybrid retrieval.
    """

    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
        chunks = []
        current_chunk = ""

        for p in paragraphs:
            if len(current_chunk) + len(p) <= chunk_size:
                current_chunk += ("\n\n" + p if current_chunk else p)
            else:
                if current_chunk:
                    chunks.append(current_chunk)
                current_chunk = p

        if current_chunk:
            chunks.append(current_chunk)

        # Fallback if no paragraph breaks
        if not chunks and text.strip():
            words = text.split()
            stride = max(1, chunk_size // 6)
            for i in range(0, len(words), stride):
                chunk_words = words[i:i + stride]
                chunks.append(" ".join(chunk_words))

        return chunks or [text.strip()]

    async def ingest_document(
        self,
        db: AsyncSession,
        user_id: str,
        doc_type: str,
        source_title: str,
        content: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> List[DocumentChunkModel]:
        metadata = metadata or {}
        chunks = self.chunk_text(content)
        created_chunks: List[DocumentChunkModel] = []

        for idx, chunk_text in enumerate(chunks):
            embedding_vec = await gemini_service.generate_embedding(chunk_text)
            chunk_id = f"chk_{uuid.uuid4().hex[:8]}"

            chunk_record = DocumentChunkModel(
                id=chunk_id,
                user_id=user_id,
                doc_type=doc_type,
                source_title=source_title,
                chunk_index=idx,
                chunk_text=chunk_text,
                embedding=embedding_vec,
                metadata_json=metadata
            )
            db.add(chunk_record)
            created_chunks.append(chunk_record)

        await db.commit()
        return created_chunks

    async def semantic_search(
        self,
        db: AsyncSession,
        user_id: str,
        query: str,
        top_k: int = 5,
        doc_type: Optional[str] = None
    ) -> SemanticSearchResponse:
        query_embedding = await gemini_service.generate_embedding(query)

        stmt = select(DocumentChunkModel).where(DocumentChunkModel.user_id == user_id)
        if doc_type:
            stmt = stmt.where(DocumentChunkModel.doc_type == doc_type)

        res = await db.execute(stmt)
        all_chunks = res.scalars().all()

        scored_results: List[SearchResultItem] = []
        for chk in all_chunks:
            if chk.embedding:
                score = cosine_similarity(query_embedding, chk.embedding)
                scored_results.append(
                    SearchResultItem(
                        chunk_id=chk.id,
                        doc_type=chk.doc_type,
                        source_title=chk.source_title,
                        chunk_text=chk.chunk_text,
                        similarity_score=round(score * 100, 1),
                        metadata=chk.metadata_json or {}
                    )
                )

        scored_results.sort(key=lambda x: x.similarity_score, reverse=True)
        top_results = scored_results[:top_k]

        return SemanticSearchResponse(
            query=query,
            total_results=len(scored_results),
            results=top_results
        )

rag_service = RAGService()
