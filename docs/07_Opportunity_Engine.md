07 — Opportunity Discovery & Ingestion Specification

Source adapters, normalization, freshness, deduplication, search and live opportunity handling.

CareerOS • Locked planning baseline • 27 September 2026

1. Opportunity categories

Jobs

Internships

Hackathons

Competitions

Research opportunities

Scholarships

Fellowships

Programs/events

Projects/volunteering where relevant

2. Adapter architecture

Each source gets an adapter implementing discover(), fetch(), normalize(), validate(), deduplicate_key(), and health(). The application never depends on source-specific HTML fields.

3. Canonical opportunity schema

Field

Purpose

title

Normalized title

organization

Company/organizer

type

job/internship/hackathon/etc.

description

Normalized description

requirements

Structured requirements

skills

Canonical skills

location

Location/work mode

eligibility

Eligibility constraints

deadline

Known deadline

source_url

Original listing

apply_url

Direct application URL when available

source_name

Origin

discovered_at

First seen

last_verified_at

Last verified

status

active/expired/unknown

content_hash

Deduplication/change detection

4. Source strategy

Prefer official APIs, feeds, permitted partner access and public pages where terms permit.

Use search discovery to find source pages, then fetch and normalize allowed content.

Do not design the product around bypassing bot protection or access controls.

Source adapters must have rate limits, retries and circuit breakers.

Store source URLs and direct apply URLs separately.

5. Deduplication

Use a layered key: source record ID where available; otherwise normalized organization + normalized title + location + application URL/domain + content hash. Preserve source provenance even when multiple sources point to the same opportunity.

6. Freshness

Every listing gets last_verified_at.

Deadlines trigger expiry checks.

Stale records are visually marked.

Failed verification should not silently become 'active'.

Users can report expired or incorrect listings.

7. Search and ranking

Structured filters.

PostgreSQL full-text search where useful.

Vector retrieval for semantic relevance.

Deterministic fit scoring.

LLM explanation/reranking only for top candidates.

8. Example matching query

User target: AI Engineer internship. Filters: internship + India + deadline future. Semantic query: compact Career Profile and target-role requirements. Reranking features: Python/ML/LLM/RAG/FastAPI evidence, project relevance, role level, location, deadline and prior user behavior.

9. Operational dashboard

Listings discovered/day by source

Normalization failure rate

Duplicate rate

Verification success rate

Stale listing count

Average source latency

Source outage status