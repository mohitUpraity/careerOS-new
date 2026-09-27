03 — Technical Requirements Document (TRD)

System architecture, infrastructure, AI services, deployment, reliability and engineering standards.

CareerOS • Locked planning baseline • 27 September 2026

1. Architecture

Locked baseline: Next.js/TypeScript frontend; FastAPI/Python application backend; Firebase Authentication for identity; Supabase PostgreSQL (17.6) as the single source of truth for all application data; Supabase pgvector for semantic retrieval; Supabase/Firebase Storage for documents; Gemini 1.5 Pro / 2.0 AI orchestration; Redis/worker only when asynchronous workloads require it.

2. Logical architecture

Web → FastAPI API → domain services → repositories → Supabase PostgreSQL; AI tasks → Gemini AI Orchestration; documents → Supabase Storage; long-running ingestion/rendering → queue/worker; telemetry → structured logs/metrics.

3. Technology decisions

Layer

Technology

Rule

Web

Next.js + TypeScript

Server/client boundaries intentional; no business logic duplicated from FastAPI.

UI

Tailwind + Lucide

Accessible, reusable components; consistent tokens.

API

FastAPI + Pydantic

Typed request/response contracts.

DB

Supabase PostgreSQL (17.6)

Single source of truth for all application data.

Vector

Supabase pgvector

Use for semantic retrieval; combine with structured filters.

Auth

Firebase Authentication

Google login & Email/password; FastAPI verifies Firebase identity tokens and syncs to Supabase.

Storage

Supabase Storage

Documents/assets; metadata in SQL.

AI

Gemini via internal AI Gateway

Provider abstraction; prompts/versioning/telemetry centralized.

Agents

LangGraph later

Only after deterministic workflows are stable.

Queue

Redis + ARQ/RQ later

Long-running ingestion, parsing, rendering, batch tasks.

PDF

HTML/CSS + Playwright

Controlled templates; deterministic rendering.

DOCX

python-docx

Separate renderer.

Deployment

Vercel + Render/Cloud Run

Frontend and API separated; workers independently deployable.

4. Authentication flow

User authenticates with Firebase Auth/Google.

Frontend obtains Firebase ID token.

Frontend sends token to FastAPI.

FastAPI verifies token using Firebase Admin SDK.

Backend resolves Firebase UID to internal user record.

Authorization checks user ownership before any career-data operation.

5. Database principles

Use stable internal IDs plus firebase_uid as identity linkage.

Use foreign keys for core relationships.

Store source timestamps and provenance on external opportunity records.

Use immutable/versioned records for resumes and AI outputs.

Never store raw secrets in the database.

Use migrations and schema review before production changes.

6. Vector architecture

Embeddings are generated for selected text fields: opportunity description/requirements, skill descriptions, learning resources, evidence descriptions and optionally a compact user-career representation. Vector retrieval is never the only ranking signal.

7. Recommendation pipeline

Apply hard eligibility and preference filters.

Retrieve semantic candidates using vector similarity.

Compute structured feature matches: skill coverage, evidence coverage, seniority, location, deadline, role goal, source freshness and user history.

Rerank candidates using deterministic weighted scoring.

Use Gemini only where interpretation/explanation adds value.

Persist recommendation reasons and model/prompt version.

8. API standards

REST/JSON for primary FastAPI endpoints.

Pagination for lists.

Idempotency keys for operations that create versions or external side effects.

Async job IDs for long-running operations.

Standard error envelope: code, message, request_id, details.

OpenAPI generated from FastAPI contracts.

Never expose provider API keys to the browser.

9. Deployment and environments

Environment

Purpose

Local

Firebase emulator where supported, local PostgreSQL/SQL Connect emulator where available, mock AI/source adapters.

Staging

Production-like schema, test credentials, synthetic data.

Production

Real users, restricted secrets, backups, monitoring, audit logging.

10. Observability

Request IDs across frontend/API/workers.

Structured logs without sensitive document content.

AI call latency, token/cost estimates, failure rate and retry counts.

Opportunity source freshness and ingestion error metrics.

Resume rendering failure metrics.

Recommendation click/save/apply feedback metrics.

11. External constraints

Opportunity ingestion must use permitted access methods. The system should support adapters for APIs, feeds, permitted pages and search discovery rather than assuming unrestricted scraping. Each adapter must define terms/rate-limit assumptions and a kill switch.

12. Firebase SQL Connect note

Firebase SQL Connect is a managed PostgreSQL-backed relational service integrated with Firebase Authentication and supports vector search. Firebase documents pgvector as the underlying vector capability and also documents full-text search. citeturn0search1turn0search2turn0search16