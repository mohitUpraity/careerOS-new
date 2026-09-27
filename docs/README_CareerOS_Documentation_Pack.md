README — CareerOS Documentation Pack

How to use the planning documents before implementation.

CareerOS • Locked planning baseline • 27 September 2026

What is included

Document

Use

00 Product Charter

Locks product vocabulary, principles and architecture decisions.

01 PRD

Locks product features and acceptance requirements.

02 Competitor Market Analysis

Locks competitive understanding and differentiation.

03 TRD

Locks technology and architecture.

04 Data Model API

Locks entities, relationships and API contracts.

05 AI Recommendation Agents

Locks AI boundaries, scoring and agent permissions.

06 Resume Engine

Locks the most technically sensitive resume workflow.

07 Opportunity Engine

Locks live opportunity ingestion and freshness.

08 Security Privacy Trust

Locks security and user-control requirements.

09 UX Design System

Locks UI/UX principles and page information patterns.

10 Version Roadmap QA

Locks build order and release gates.

How to lock versions

Review documents as a team.

Mark any disputed decision as OPEN rather than silently changing it.

Freeze V0.1 schema and API contracts.

Build only V0.1 scope.

Record changes in a decision log.

At each version gate, update requirements and increment document version.

Do not add a new technology merely because a demo feature looks attractive; add it only when a requirement justifies it.

Current technology lock

Category

Locked choice

Frontend

Next.js + TypeScript

Backend

FastAPI + Python

Auth

Firebase Authentication

Database

Firebase SQL Connect / Cloud SQL PostgreSQL

Vector

pgvector

Storage

Firebase Storage

AI

Gemini through AI Gateway

Agents

LangGraph later

PDF

HTML/CSS + Playwright

DOCX

python-docx

UI

Tailwind + shadcn/ui + Lucide

Deployment

Vercel + Render initially

Research note

Firebase SQL Connect is documented as a managed PostgreSQL-backed relational service integrated with Firebase Authentication; Firebase also documents vector search through pgvector and full-text search. citeturn0search1turn0search2turn0search16

Immediate next step

Do not start coding features from memory. First review 00–04 together, resolve OPEN decisions, then implement V0.1 exactly against the locked PRD/TRD/data model.