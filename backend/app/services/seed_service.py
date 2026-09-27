import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from backend.app.models.opportunity import OpportunityModel
from backend.app.models.application import ApplicationModel
from backend.app.models.skill import SkillModel, EvidenceModel, SkillGapModel

INITIAL_OPPORTUNITIES = [
    {
        "id": "opp_google_01",
        "title": "AI Infrastructure Engineer (L5/L6)",
        "company": "Google Cloud Systems",
        "category": "Jobs",
        "location": "Mountain View, CA / Remote",
        "workplace_type": "Remote",
        "match_score": 94,
        "match_reason": "Top 4% Candidate Pool • Tensor Parallelism & Triton Kernels verified",
        "salary_range": "$245,000 – $280,000 + $680k RSU",
        "experience_level": "Staff / Lead",
        "posted_date": "2 hours ago",
        "deadline": "Oct 3, 2026",
        "tags": ["Distributed Systems", "vLLM", "Triton", "C++", "FastAPI"],
        "key_requirements": [
            "Design and deploy ultra-low-latency distributed inference engines on 8x H100 GPU clusters.",
            "Optimize Triton/CUDA kernels for PagedAttention and speculative decoding verification passes.",
            "Collaborate with hardware engineering on NVLink 900 GB/s interconnect topologies and NCCL collectives.",
            "Maintain 99.99% availability for enterprise LLM endpoints under 200ms p99 latency SLOs."
        ],
        "hard_skills": ["vLLM", "Triton Kernels", "C++ Systems", "FastAPI", "CUDA"],
        "verified_evidence_required": ["PR in vLLM / PyTorch", "Production Benchmark Dossier"],
        "apply_url": "https://careers.google.com/jobs/results/ai-infra-engineer"
    },
    {
        "id": "opp_anthropic_02",
        "title": "ML Platform & Serving Engineer",
        "company": "Anthropic",
        "category": "Jobs",
        "location": "San Francisco, CA",
        "workplace_type": "Hybrid",
        "match_score": 91,
        "match_reason": "Strong Match • Competing Base Salary Anchor",
        "salary_range": "$260,000 – $310,000 + Equity",
        "experience_level": "Senior",
        "posted_date": "1 day ago",
        "deadline": "Oct 7, 2026",
        "tags": ["Model Serving", "Claude API", "Python", "Kubernetes", "FastAPI"],
        "key_requirements": [
            "Architect scalable model serving pipelines supporting millions of concurrent token streams.",
            "Build automated evaluation harnesses for model safety and faithfulness benchmarks.",
            "Partner with research scientists to productionize cutting-edge model architectures."
        ],
        "hard_skills": ["Python", "FastAPI", "Kubernetes", "PyTorch", "Redis"],
        "verified_evidence_required": ["Distributed Serving Architecture RFC"],
        "apply_url": "https://anthropic.com/careers/ml-platform"
    },
    {
        "id": "opp_openai_03",
        "title": "Research Systems Engineer - Inference",
        "company": "OpenAI",
        "category": "Jobs",
        "location": "San Francisco, CA / Remote",
        "workplace_type": "Remote",
        "match_score": 89,
        "match_reason": "High Match • Speculative Decoding & GPU Memory Management",
        "salary_range": "$280,000 – $370,000 + RSU",
        "experience_level": "Senior",
        "posted_date": "3 days ago",
        "deadline": "Oct 12, 2026",
        "tags": ["Inference", "CUDA", "C++", "Distributed Training"],
        "key_requirements": [
            "Optimize kernel throughput and memory footprint for massive reasoning models.",
            "Implement high-throughput batching, cache paging, and KV-cache compression techniques."
        ],
        "hard_skills": ["CUDA", "C++", "Triton", "PyTorch"],
        "verified_evidence_required": ["Custom Kernel Benchmark"],
        "apply_url": "https://openai.com/careers/research-systems-engineer"
    },
    {
        "id": "opp_darpa_04",
        "title": "Autonomous Systems Research Fellowship",
        "company": "DARPA / MIT Lincoln Lab",
        "category": "Research",
        "location": "Cambridge, MA / Remote",
        "workplace_type": "Hybrid",
        "match_score": 96,
        "match_reason": "Exact Domain Alignment • Defense-grade low-latency pipelines",
        "salary_range": "$160,000 Fellowship Grant",
        "experience_level": "Fellow",
        "posted_date": "5 days ago",
        "deadline": "Oct 20, 2026",
        "tags": ["Defense Systems", "Formal Verification", "C++", "Real-Time OS"],
        "key_requirements": [
            "Conduct applied research in verifiable low-latency autonomous network defense.",
            "Author peer-reviewed technical specifications and benchmark dossiers."
        ],
        "hard_skills": ["C++", "Formal Verification", "eBPF", "Network Architecture"],
        "verified_evidence_required": ["Published Systems Paper or Technical RFC"],
        "apply_url": "https://darpa.mil/careers/fellowships"
    }
]

INITIAL_APPLICATIONS = [
    {
        "id": "app_anthropic_01",
        "user_id": "default_user",
        "company": "Anthropic",
        "role": "Staff AI Infrastructure Engineer",
        "stage": "INTERVIEW",
        "match_score": 94,
        "salary": "$260,000 – $310,000",
        "location": "San Francisco, CA (Hybrid)",
        "resume_version": "v4-distributed-systems",
        "tags": ["Tier 1", "Distributed Systems", "Triton"],
        "notes": "Passed Round 2 Systems Design. Scheduling Executive Bar Raiser on Thursday.",
        "applied_date": "Sep 22, 2026"
    },
    {
        "id": "app_google_02",
        "user_id": "default_user",
        "company": "Google Cloud",
        "role": "AI Infrastructure Lead (L6)",
        "stage": "SCREENING",
        "match_score": 91,
        "salary": "$245,000 – $280,000 + RSU",
        "location": "Mountain View, CA / Remote",
        "resume_version": "v4-core",
        "tags": ["Tier 1", "vLLM", "Inference"],
        "notes": "Recruiter screen completed. Technical phone screen scheduled with Principal Engineer.",
        "applied_date": "Sep 24, 2026"
    },
    {
        "id": "app_meta_03",
        "user_id": "default_user",
        "company": "Meta (GenAI)",
        "role": "Kernel Optimization Engineer",
        "stage": "APPLIED",
        "match_score": 88,
        "salary": "$230,000 – $275,000",
        "location": "Menlo Park, CA / Remote",
        "resume_version": "v4-kernel-opt",
        "tags": ["Tier 1", "CUDA", "PyTorch"],
        "notes": "Tailored resume submitted with AST verified benchmark proofs.",
        "applied_date": "Sep 26, 2026"
    },
    {
        "id": "app_darpa_04",
        "user_id": "default_user",
        "company": "DARPA Research Lab",
        "role": "Principal Systems Fellow",
        "stage": "OFFER",
        "match_score": 97,
        "salary": "$220,000 + Grant",
        "location": "Cambridge, MA",
        "resume_version": "v4-defense",
        "tags": ["Research", "Defense", "eBPF"],
        "notes": "Offer letter received. In negotiation matrix phase.",
        "applied_date": "Sep 10, 2026"
    }
]

INITIAL_SKILLS = [
    {
        "id": "sk_dist_01",
        "user_id": "default_user",
        "name": "Distributed LLM Inference & vLLM",
        "category": "AI & ML Infra",
        "proficiency": 96,
        "verified": True,
        "proof_count": 3,
        "ast_proof_hash": "sha256_8f29c0182b8a4f1e09c",
        "ast_proof_details": {
            "ast_nodes_verified": 1420,
            "complexity_score": "O(1) Paged KV Allocation",
            "benchmark": "94% cache locality on 100k context"
        },
        "tags": ["vLLM", "Triton", "CUDA", "Inference"]
    },
    {
        "id": "sk_low_02",
        "user_id": "default_user",
        "name": "C++ Systems & Shared Memory IPC",
        "category": "Low-Level & Hardware",
        "proficiency": 94,
        "verified": True,
        "proof_count": 4,
        "ast_proof_hash": "sha256_3b71f0981a2e4c7d812",
        "ast_proof_details": {
            "ast_nodes_verified": 2890,
            "complexity_score": "Zero-Copy IPC Buffer",
            "benchmark": "2.4M PPS @ 2.1ms p99 latency"
        },
        "tags": ["C++20", "POSIX IPC", "eBPF", "Low Latency"]
    },
    {
        "id": "sk_net_03",
        "user_id": "default_user",
        "name": "FastAPI & Async Microservices",
        "category": "Distributed Systems",
        "proficiency": 92,
        "verified": True,
        "proof_count": 2,
        "ast_proof_hash": "sha256_e198a4bc71029df4821",
        "ast_proof_details": {
            "ast_nodes_verified": 850,
            "complexity_score": "Asyncpg connection pooling",
            "benchmark": "15,000 req/s @ 4ms p50 latency"
        },
        "tags": ["FastAPI", "SQLAlchemy", "Asyncpg", "PostgreSQL"]
    },
    {
        "id": "sk_ai_04",
        "user_id": "default_user",
        "name": "Gemini & RAG Semantic Orchestration",
        "category": "AI & ML Infra",
        "proficiency": 90,
        "verified": True,
        "proof_count": 2,
        "ast_proof_hash": "sha256_9c182a47e6201bfa829",
        "ast_proof_details": {
            "ast_nodes_verified": 620,
            "complexity_score": "Hybrid Vector + Keyword RAG",
            "benchmark": "98.4% grounded precision"
        },
        "tags": ["Gemini 1.5 Pro", "pgvector", "RAG", "Embeddings"]
    }
]

INITIAL_EVIDENCE = [
    {
        "id": "ev_101",
        "user_id": "default_user",
        "title": "PagedAttention Triton Kernel Optimization",
        "type": "PR",
        "platform": "GitHub",
        "sha_hash": "sha256_4120aef89b",
        "url": "https://github.com/vllm-project/vllm/pull/4120",
        "metric_proof": "94% cache locality on 100k context",
        "skills_linked": ["Distributed LLM Inference & vLLM", "Triton"],
        "verified": True
    },
    {
        "id": "ev_102",
        "user_id": "default_user",
        "title": "DRDO IntelliGuard NGFW 2.4M PPS Pipeline",
        "type": "Benchmark",
        "platform": "Production",
        "sha_hash": "sha256_drdo78192a",
        "url": "https://github.com/mohitUpraity/careerOS-new",
        "metric_proof": "2.4M PPS throughput @ 2.1ms p99 latency",
        "skills_linked": ["C++ Systems & Shared Memory IPC"],
        "verified": True
    },
    {
        "id": "ev_103",
        "user_id": "default_user",
        "title": "FastAPI + Supabase PostgreSQL Async Pooler Integration",
        "type": "System",
        "platform": "Production",
        "sha_hash": "sha256_fastapi3dde8",
        "url": "https://github.com/mohitUpraity/careerOS-new",
        "metric_proof": "Zero-downtime token verification & sub-5ms profile queries",
        "skills_linked": ["FastAPI & Async Microservices"],
        "verified": True
    }
]

async def seed_initial_data_if_empty(session: AsyncSession):
    try:
        # Check opportunities
        opp_count = await session.scalar(select(func.count(OpportunityModel.id)))
        if opp_count == 0:
            for opp in INITIAL_OPPORTUNITIES:
                session.add(OpportunityModel(**opp))

        # Check applications
        app_count = await session.scalar(select(func.count(ApplicationModel.id)))
        if app_count == 0:
            for app in INITIAL_APPLICATIONS:
                session.add(ApplicationModel(**app))

        # Check skills
        skill_count = await session.scalar(select(func.count(SkillModel.id)))
        if skill_count == 0:
            for sk in INITIAL_SKILLS:
                session.add(SkillModel(**sk))

        # Check evidence
        ev_count = await session.scalar(select(func.count(EvidenceModel.id)))
        if ev_count == 0:
            for ev in INITIAL_EVIDENCE:
                session.add(EvidenceModel(**ev))

        await session.commit()
    except Exception as e:
        await session.rollback()
        print(f"[Seed Service] Warning during initial data seeding: {e}")
