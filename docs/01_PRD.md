01 — Product Requirements Document (PRD)

Detailed functional requirements and acceptance criteria for CareerOS.

CareerOS • Locked planning baseline • 27 September 2026

1. Problem statement

Students and early-career professionals often use separate job boards, resume editors, course platforms, trackers, notes, LinkedIn and spreadsheets. The fragmentation causes missed opportunities, repetitive tailoring, weak evidence tracking and poor connection between learning and actual target roles.

2. Personas

Persona

Needs

Primary success

Student / early-career builder

Discover internships, understand fit, build evidence, learn efficiently.

Relevant applications and measurable skill/evidence progress.

Active applicant

Find live roles, tailor resumes, track applications and follow-ups.

Less repetitive work and better application quality.

Career switcher

Map transferable skills, identify gaps, build proof.

Clear transition roadmap and credible evidence.

Power user / hackathon builder

Track competitions, projects and public proof.

Fast opportunity discovery and portfolio growth.

3. Feature requirements

ID

Feature

Requirement

Priority

Acceptance

F01

Onboarding & Career Profile

Goal, target roles, location, work preferences, skills, experience, projects, education, links and evidence.

Must

Profile saved and editable; no data loss.

F02

Opportunity Discovery

Jobs, internships, hackathons, competitions, research and scholarships from supported sources.

Must

Each opportunity has source, URL, type, freshness and normalized fields.

F03

Opportunity Matching

Structured filters + semantic similarity + evidence-aware reranking.

Must

Every recommendation has reasons and gaps.

F04

Opportunity Detail

JD, requirements, source, deadline, match breakdown, gaps, actions.

Must

Direct application URL is visible.

F05

Resume Import

Import PDF/DOCX and convert supported content into structured resume data.

Must

Original file preserved; extraction shown for review.

F06

Golden Resume

User-approved master resume and template mapping.

Must

Never overwritten by tailoring.

F07

JD Analyzer

Extract requirements, skills, seniority, constraints, responsibilities and signals.

Must

Structured result stored with source.

F08

Resume Tailoring

Generate explainable change patches against a target JD.

Must

No unsupported claims; Accept/Reject/Edit.

F09

Resume Rendering

Export tailored versions as PDF and DOCX.

Must

Links, emphasis, spacing and sections preserved within controlled templates.

F10

Skills & Evidence

Map skills to projects, experience, certificates and links.

Must

User can inspect evidence behind a skill.

F11

Learning Roadmap

Recommend resources and practical tasks based on target-role gaps.

Should

Each resource has why/skill/evidence outcome.

F12

Applications

Track saved, preparing, applied, screening, interview, offer/rejected.

Must

Resume version and opportunity linked.

F13

Daily Planner

Tasks, deadlines, learning, applications and check-ins.

Should

Prioritized daily actions.

F14

Professional Presence

LinkedIn drafts, project announcements, profile improvement suggestions.

Should

No auto-publish by default.

F15

Interview Prep

JD-aware questions, evidence prompts, mock sessions and feedback.

Should

Questions trace to JD/profile.

F16

Analytics

Application funnel, skill progress, opportunity sources, learning progress.

Should

No misleading vanity metrics.

F17

Notifications

Deadline, follow-up, saved-search and learning reminders.

Should

User controls frequency.

F18

Browser helper

Optional extension for saving opportunities and assisting application forms.

Later

Human review before submission.

4. Recommendation requirements

Hard constraints must be applied before semantic ranking where possible: opportunity type, location, deadline, eligibility and user exclusions.

Semantic matching should compare job requirements to the Career Profile and evidence, not just resume keyword overlap.

Recommendations must show positive matches, missing/weak evidence, freshness and a recommended next action.

User feedback such as save, dismiss, apply, interview and rejection should become signals, but never silently change career facts.

Scores must be decomposable into understandable components; avoid presenting an unexplained single 'AI score'.

5. Resume requirements

Original resume is immutable.

Career Profile remains the canonical factual source.

Golden Resume is user-approved and versioned.

Tailoring produces patches/diffs, not a blind full-document rewrite.

AI may rewrite existing factual content but must not create unsupported achievements.

User must be able to inspect the reason and evidence behind each material change.

Templates are separate from content; changing template must not alter content.

Exported PDFs and DOCX files must be traceable to a Resume Version and source JD.

6. Non-functional product requirements

Area

Target

Reliability

Core authenticated workflows should be resilient to transient AI/source failures.

Performance

Interactive pages target <2s perceived load for cached core data; long AI tasks become asynchronous.

Accessibility

Keyboard navigation, visible focus, readable contrast, labels and non-color-only status.

Auditability

Record important AI changes, approvals, source timestamps and document versions.

Privacy

User documents and career data are private by default.

Freshness

Live opportunity records expose last-verified timestamp.

7. MVP acceptance

User can sign in with Google.

User can create/edit Career Profile.

User can view normalized opportunities.

User can filter and save opportunities.

User can open a job and see match reasons.

User can upload a resume and review extracted content.

User can select a controlled template.

User can tailor against a JD and review individual changes.

User can export a PDF without overwriting the master resume.

User can track the resulting application.