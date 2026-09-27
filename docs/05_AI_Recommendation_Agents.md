05 — AI, Recommendation & Agent Specification

Deterministic-first AI architecture, scoring, prompts, guardrails and agent boundaries.

CareerOS • Locked planning baseline • 27 September 2026

1. AI philosophy

Use AI where interpretation, generation or semantic understanding is valuable. Use deterministic code for identity, permissions, dates, versioning, calculations, source provenance and hard eligibility.

2. AI Gateway

All model calls pass through an internal AI Gateway with task type, model selection, prompt version, schema validation, retries, cost telemetry and safety policy. Domain services must not scatter raw Gemini SDK calls.

3. AI task registry

Task

Input

Output

Model role

JD extraction

Job text

Structured requirements JSON

LLM

Resume extraction

Parsed document text/layout hints

Resume JSON + confidence

LLM + parser

Opportunity classification

Normalized record

type/category/tags

LLM

Semantic embedding

Canonical text

vector

Embedding model

Job matching explanation

Profile + job + features

reason codes/explanation

LLM

Resume tailoring

JD + resume blocks + evidence

change patches

LLM

Learning plan

Goal + gaps + constraints

ordered learning actions

LLM

Interview prep

JD + profile + application

question set + evidence prompts

LLM

LinkedIn draft

Approved event/project

draft post

LLM

Daily check-in

User update

tasks/post/recommendations

LLM

4. Recommendation score

Illustrative V1 score (weights must be calibrated with real data): Match = 30% skill coverage + 20% evidence coverage + 15% role-goal alignment + 10% semantic similarity + 10% preference fit + 10% seniority/eligibility fit + 5% freshness. Hard constraints are applied before scoring. Do not display this exact formula to users unless validated; expose reason categories instead.

5. Recommendation explainability

Matched skills: list only skills supported by profile/evidence.

Missing/weak skills: distinguish 'not found' from 'not evidenced'.

Preference fit: location, work mode, type, compensation if known.

Freshness: last verified timestamp.

Action: apply, tailor, learn, build evidence, or dismiss.

Confidence: use only if calibrated; otherwise avoid false precision.

6. Resume tailoring algorithm

Parse JD into normalized requirements.

Map requirements to canonical skills and evidence.

Select the relevant master/profile blocks.

Ask model for proposed changes constrained to supplied facts.

Validate generated changes against evidence and source facts.

Return patch objects with original text, new text, reason, evidence references and confidence.

Require user approval for material changes.

Persist approved changes as a new Resume Version.

Render through deterministic template engine.

7. Hallucination controls

Never allow the model to invent metrics; if no metric exists, rewrite without one or mark a placeholder for user input.

Never infer an unverified certification.

Never change employment dates/titles without explicit user edit.

Never add a skill merely because it appears in a JD.

Run structured validation after generation.

Maintain provenance for every AI-generated claim.

8. Agent architecture

Agents are a later orchestration layer, not the foundation. Initial agents: Opportunity Agent, Career/Profile Agent, Learning Agent, Evidence Agent, Application Agent, Content Agent, coordinated by a Career Orchestrator.

9. Agent permissions

Agent

Can read

Can write

Human gate

Opportunity

profile, preferences, opportunities

recommendations, saved-search config

No for passive discovery; yes for external side effects

Resume

profile, evidence, JD, resume versions

draft versions/change patches

Yes before final export/use

Learning

goals, skills, evidence, resources

roadmap/tasks

No for drafts; yes for purchases

Application

opportunity, resume, profile

application drafts/status notes

Yes before submission

Content

approved events/projects/profile

draft posts/comments

Yes before publish

10. Agent non-goals

No autonomous submission of applications by default.

No autonomous public comments/posts.

No credential generation.

No changing factual profile data from inferred content.

No bypassing source access controls.