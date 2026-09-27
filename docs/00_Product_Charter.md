00 — CareerOS Product Charter & Document Control

The single source of truth for product scope, principles, terminology, and version locks.

CareerOS • Locked planning baseline • 27 September 2026

1. Product definition

CareerOS is a Personal Career Operating System. It continuously connects a user's career goal, profile, skills, evidence, opportunities, learning, applications, resume versions, professional presence, and outcomes.

Core promise: CareerOS should answer two questions better than a collection of disconnected tools: “Which opportunities are relevant to me?” and “What should I do next to become a stronger candidate?”

2. Product thesis

Career decisions should be driven by a persistent Career Profile rather than isolated resume files.

Recommendations should combine structured facts, semantic similarity, evidence, constraints, and user goals.

AI must propose and explain changes; the user remains the final authority over applications and published professional content.

Every generated claim must be traceable to user-provided evidence or clearly marked as a suggestion.

Job discovery, resume tailoring, learning, evidence-building and application tracking should form one feedback loop.

3. Core entities / terminology

Term

Definition

Career Profile

Canonical structured representation of the user's professional identity, goals, preferences, experience, skills and evidence links.

Golden Resume

User-approved master resume representation; never silently overwritten by AI.

Resume Version

A derived resume for a role family, company, or specific opportunity.

Tailored Resume

A Resume Version generated/edited against a specific job description, with explainable changes.

Opportunity

A normalized job, internship, hackathon, competition, scholarship, research or other career opportunity.

Evidence

Proof supporting a skill/claim: project, GitHub repo, certificate, internship, publication, demo, achievement, etc.

Skill Gap

A relevant requirement that is absent, weakly evidenced, or insufficiently represented in the Career Profile.

Recommendation

A ranked, explainable suggested opportunity, learning action, evidence action, application action, or career task.

4. Product principles

Truth before persuasion — never invent qualifications, employers, dates, metrics, certificates or experience.

Explainability — show why a recommendation or resume change was made.

User control — AI drafts; user approves.

Version safety — preserve originals and create immutable/versioned derivatives.

Evidence-first career development — skills become stronger when backed by verifiable work.

Actionability — every major insight should lead to a concrete next action.

Source freshness — live opportunities must carry source, fetched time and last-verified time.

Privacy by design — career data and documents are sensitive and must be minimized, protected and auditable.

5. Scope boundary

In scope: opportunity discovery, normalization and ranking; career profile; skill/evidence graph; resume import and structured editing; JD analysis; resume tailoring; learning roadmap/resources; application tracking; interview preparation; professional-content drafting; analytics; notifications and daily check-ins.

Out of scope for early versions: autonomous job submission without user confirmation; fabricated credentials; guaranteed ATS/interview outcomes; scraping that violates source terms; autonomous public posting or commenting without explicit approval; replacing full university/HR ERP systems.

6. Version policy

Version

Lock target

Exit criterion

V0.1

Foundation

Auth, profile, DB schema, basic shell, CI/CD and observability work end-to-end.

V0.2

Opportunity engine

Live normalized opportunities, dedupe, freshness, filters and explainable matching.

V0.3

Resume engine

Golden profile/resume, templates, JD analysis, patch-based tailoring, PDF/DOCX export.

V0.4

Career intelligence

Skill gaps, evidence graph, learning recommendations and progress tracking.

V0.5

Application OS

Application tracker, follow-ups, interview prep, daily planner.

V0.6

Agent layer

LangGraph orchestration with human approval gates and tool permissions.

V1.0

Integrated CareerOS

All core loops integrated, security review, performance targets, telemetry, recovery and production documentation.

7. Decision log — current baseline

Decision

Status

Rationale

Frontend

LOCKED: Next.js + TypeScript

Matches Stitch output and modern web UX.

Backend

LOCKED: FastAPI

Python ecosystem is best suited to AI/document processing.

Auth

LOCKED: Firebase Authentication

Google sign-in and established Firebase familiarity.

Relational DB

LOCKED direction: Firebase SQL Connect / Cloud SQL PostgreSQL

CareerOS has strongly relational data and SQL analytics needs.

Vector search

LOCKED direction: PostgreSQL pgvector through SQL Connect

Semantic matching can live beside relational career data.

Storage

LOCKED: Firebase Storage

Resumes, certificates, project assets.

AI

LOCKED: Gemini-first abstraction

Strong fit with Google/Firebase ecosystem; keep an AI gateway for future providers.

Agents

PLANNED: LangGraph

Add only after deterministic workflows work.

Resume PDF

LOCKED direction: HTML/CSS + Playwright

AI controls content; renderer controls layout.

DOCX

LOCKED direction: python-docx

Separate controlled DOCX renderer.