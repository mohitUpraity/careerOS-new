04 — Data Model, API & Domain Contract

Canonical schema, entities, relationships and endpoint contract.

CareerOS • Locked planning baseline • 27 September 2026

1. Core relational model

Table

Key fields

Relationships

users

id, firebase_uid, created_at

1:1 profile

profiles

user_id, headline, summary, location, preferences

belongs to user

career_goals

id, user_id, target_role, priority, status

many per user

skills

id, canonical_name, category

shared taxonomy

user_skills

user_id, skill_id, level, source

many-to-many

experiences

id, user_id, org, role, dates, description

user-owned

projects

id, user_id, name, description, links

user-owned

evidence

id, user_id, type, title, url, verification_status

links to skills/projects

opportunities

id, source_id, title, org, type, url, deadline, raw_text_hash

shared

opportunity_requirements

opportunity_id, skill_id, requirement_type, importance

many-to-many

applications

id, user_id, opportunity_id, status, applied_at

user ↔ opportunity

resumes

id, user_id, name, kind, template_id

master/version

resume_versions

id, parent_id, target_opportunity_id, status

version tree

resume_blocks

id, resume_version_id, section, content_json, order

document content

resume_changes

id, resume_version_id, source_jd_id, reason, evidence_ids, approval

audit

learning_resources

id, title, provider, url, type, cost, duration

shared

learning_items

id, user_id, resource_id, status, progress

user progress

tasks

id, user_id, type, due_at, priority, status

planner

interviews

id, application_id, stage, scheduled_at

application child

ai_runs

id, user_id, task_type, model, prompt_version, latency, status

audit

2. Identity rule

Firebase Auth UID is the external identity key. PostgreSQL user.id is the internal relational primary key. Never use email as a primary key.

3. Opportunity provenance

source_name

source_url

source_record_id when available

original_apply_url

discovered_at

last_verified_at

expires_at/estimated_expiry

content_hash

ingestion_adapter_version

4. Recommended API surface

Method

Endpoint

Purpose

POST

/v1/profile

Create/update profile

GET

/v1/profile

Get current profile

POST

/v1/goals

Create career goal

GET

/v1/opportunities

Filtered/paginated opportunities

GET

/v1/opportunities/{id}

Opportunity detail

POST

/v1/opportunities/{id}/save

Save

POST

/v1/opportunities/{id}/dismiss

Dismiss

POST

/v1/matching/jobs

Run/retrieve recommendations

POST

/v1/resumes/import

Import PDF/DOCX

GET

/v1/resumes

List versions

POST

/v1/resumes

Create master/version

POST

/v1/resumes/{id}/tailor

Generate tailoring plan

POST

/v1/resumes/{id}/changes/{change_id}/approve

Approve change

POST

/v1/resumes/{id}/render/pdf

Render PDF

POST

/v1/resumes/{id}/render/docx

Render DOCX

GET

/v1/skills

Skill taxonomy

GET

/v1/evidence

Evidence list

POST

/v1/learning/recommendations

Generate roadmap

POST

/v1/applications

Create application

PATCH

/v1/applications/{id}

Update status

GET

/v1/analytics/overview

Career/application analytics

5. Domain events

PROFILE_UPDATED

GOAL_CHANGED

OPPORTUNITY_INGESTED

OPPORTUNITY_VERIFIED

OPPORTUNITY_SAVED

OPPORTUNITY_DISMISSED

APPLICATION_CREATED

APPLICATION_STATUS_CHANGED

RESUME_VERSION_CREATED

TAILORING_PLAN_GENERATED

RESUME_CHANGE_APPROVED

EVIDENCE_ADDED

LEARNING_ITEM_COMPLETED

INTERVIEW_SCHEDULED