10 — Version Roadmap, QA & Release Gates

Version-by-version build plan, definition of done, test strategy and lock criteria.

CareerOS • Locked planning baseline • 27 September 2026

1. Version roadmap

Version

Scope

Release gate

V0.1 Foundation

Auth, user/profile, goals, SQL schema, API skeleton, UI shell, Storage, CI/CD.

User signs in and creates a persistent career profile; data survives refresh; authorization works.

V0.2 Opportunity Engine

Adapters, normalized schema, search/filter, freshness, dedupe, basic matching.

At least one real permitted source + test fixture source work end-to-end; direct apply URL shown.

V0.3 Resume Engine

Import, Resume JSON, Golden Resume, templates, JD extraction, tailoring patches, PDF/DOCX.

User can create a tailored resume without altering master; visual regression passes.

V0.4 Career Intelligence

Skills taxonomy, evidence, vectors, learning resources, gap analysis.

Recommendations explain skill/evidence reasons and produce actionable gaps.

V0.5 Application OS

Tracker, follow-ups, interview prep, planner, notifications.

Opportunity → tailored resume → application → next task works as one flow.

V0.6 Agent Layer

LangGraph orchestrator, tools, permissions, human gates.

Agent can plan/execute approved internal actions without bypassing controls.

V1.0 Production

Security hardening, observability, backups, performance, accessibility, documentation.

Release checklist signed off; critical bugs zero; recovery tested.

2. Definition of Done

Feature has requirements and acceptance tests.

API schema documented.

Database migration reviewed.

Authorization tested.

Error/loading/empty states implemented.

Telemetry exists.

Unit + integration tests pass.

AI outputs are schema validated.

External source failures degrade gracefully.

Documentation updated.

Rollback path exists.

3. Test pyramid

Layer

Examples

Unit

Scoring, normalization, parsers, validators, template mapping.

Integration

Auth → API → SQL; opportunity ingestion; resume pipeline.

Contract

OpenAPI request/response; source adapter schema.

AI evaluation

JD extraction accuracy, unsupported-claim rate, tailoring fidelity.

Visual regression

Resume PDFs, key UI screens.

E2E

Sign in → profile → opportunity → tailor → export → application.

Security

Authorization, uploads, SSRF, prompt injection, secrets.

Load

Opportunity search, recommendation queries, rendering queue.

4. AI evaluation metrics

JD field extraction accuracy

Skill normalization precision

Unsupported claim rate

Change acceptance rate

Human correction rate

Recommendation save/apply rate

False-positive recommendation rate

Latency and cost per task

5. Resume visual QA

Golden screenshots/PDFs for each template.

Pixel-diff or perceptual diff after renderer changes.

Link click validation.

Font fallback validation.

Page overflow detection.

One-page fit where template is designed for one page.

6. Release blockers

Unauthorized data access

Resume content fabrication without a clear warning/approval path

Broken direct application URLs on core opportunities

Silent overwrite of Golden Resume/Profile

Missing provenance for live opportunities

Unrecoverable document-rendering failures

Secrets exposed to browser or logs

7. First implementation sprint

Create repository/monorepo and environments.

Create Firebase Auth project and Google provider.

Set up Firebase SQL Connect/Cloud SQL PostgreSQL.

Create schema migration baseline.

Create FastAPI authentication middleware.

Implement user/profile/goal CRUD.

Create Next.js application shell from Stitch references.

Implement first E2E test: sign-in → profile → save.

Add logging, request IDs and error envelope.

Freeze V0.1 schema before adding opportunity ingestion.