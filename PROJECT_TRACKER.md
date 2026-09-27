# 🧭 CareerOS Master Project & Implementation Tracker

**Project Name**: CareerOS (Personal Career Operating System)  
**Baseline Date**: 27 September 2026  
**Status**: 🟢 **Phase 1: Frontend Suite & State Engines (100% Fully Interactive & Verified) | Phase 2: FastAPI & Database (Ready to Start)**  
**Tech Stack**: Next.js 14 (TypeScript, Tailwind CSS, Lucide React) + FastAPI (Python, PostgreSQL/pgvector, Firebase Auth & Storage)

---

## 📊 Tri-Layer Implementation Matrix (Frontend · Backend · E2E)

| Feature Module | Route | Frontend UI & State | Backend API Endpoint | E2E Data Mode | How to Test & Verify |
|---|---|:---:|:---:|:---:|---|
| **1. Command Center Dashboard** | `/` or `/dashboard` | ✅ Complete | ⏳ `GET /api/v1/dashboard/overview` | 🧪 Interactive Mock State | Click "Launch Simulator" CTA, toggle timeline task checkboxes, verify 4-segment telemetry progress bar updates. |
| **2. Opportunities Discovery** | `/opportunities` | ✅ Complete | ⏳ `GET /api/v1/opportunities` | 🧪 Interactive Mock State | Filter by category (Jobs, Internships, Research, Scholarships), drag Match % slider (70-95%), select any opportunity row to inspect requirements in split drawer. |
| **3. Hackathons & Events** | `/hackathons-and-events` | ✅ Complete | ⏳ `GET /api/v1/hackathons` | 🧪 Interactive Mock State | Click "Register Team", switch tabs (Live, Upcoming, Past), inspect prize pools and team formation modal. |
| **4. Applications Kanban & CRM** | `/applications` | ✅ Complete | ⏳ `GET/POST /api/v1/applications` | 🧪 Interactive State | Switch across 4 view modes (**Board**, **List**, **Calendar**, **Analytics**), click "+ Add Application" to open modal and insert new application, click any card to inspect and transition pipeline stages. |
| **5. Resume Tailor & Diff Canvas** | `/resume` | ✅ Complete | ⏳ `POST /api/v1/resume/tailor` | 🧪 Interactive State | Review target JD requirements, inspect ATS match score, click "Accept Change" on diff highlights, test "Export PDF" trigger. |
| **6. Skills & Evidence Graph** | `/skills-and-evidence` | ✅ Complete | ⏳ `GET /api/v1/skills/graph` | 🧪 Interactive State | Switch across 4 sub-tabs (**Skills**, **Evidence Vault**, **Role Fit Gap Analyzer**, **Insights**), click "+ Add Evidence" to inject cryptographic proof, click "Audit AST Proof" to inspect syntax tree and SHA-256 hashes. |
| **7. Evidence Connectors Hub** | `/connectors` | ✅ Complete | ⏳ `GET/POST /api/v1/connectors` | 🧪 Interactive State | Click "Sync All Channels", test "Harvest Now" per connector (GitHub, LeetCode, HuggingFace, Kaggle), approve newly harvested evidence items. |
| **8. AI Interview Arena HUD** | `/interview-arena` | ✅ Complete | ⏳ `WS /api/v1/interview/live` | 🧪 Interactive State | Click "Start Simulation", test live question rubric scoring, view speech waveform animation & live transcription feed, draw on the interactive whiteboard canvas. |
| **9. Interview Debrief Scorecard**| `/interview-debrief` | ✅ Complete | ⏳ `GET /api/v1/interview/:id` | 🧪 Interactive State | Drag/click audio timeline scrubber to jump between questions, inspect rubric competency scores, click "Export Committee Dossier". |
| **10. Compensation & Offer Matrix**| `/compensation` | ✅ Complete | ⏳ `GET/POST /api/v1/offers` | 🧪 Interactive State | Adjust base salary & equity sliders, inspect 4-year vesting curve re-renders, click "Generate Counter-Offer Script" and copy to clipboard. |
| **11. Learning & Roadmap** | `/learning` | ✅ Complete | ⏳ `GET /api/v1/learning/roadmap`| 🧪 Interactive State | Step through 7-stage curriculum, switch between **Roadmap Track**, **Capstone Projects**, and **Certificates**, inspect prerequisite trees and "Why this task?" AI callouts. |
| **12. Resources & RFC Library** | `/resources` | ✅ Complete | ⏳ `GET /api/v1/resources` | 🧪 Interactive State | Filter across 8 resource categories (YouTube, Docs, Papers, Books, Tools, Templates), search resources, toggle star bookmarks. |
| **13. Planner & Daily Streaks** | `/planner` | ✅ Complete | ⏳ `GET/POST /api/v1/planner` | 🧪 Interactive State | Switch across 6 sub-tabs (**Overview**, **Calendar**, **Tasks**, **Goals**, **Habits**, **Notes**), toggle Day/Week/Month views, navigate dates with `< > Today`, click "+ Add Task" modal to add tasks, toggle habit streak days. |
| **14. LinkedIn & Presence Copilot** | `/linkedin-and-presence` | ✅ Complete | ⏳ `POST /api/v1/presence/draft` | 🧪 Interactive State | Switch across 6 tabs (**Post Studio**, **Content Calendar**, **Profile Optimizer**, **Engagement**, **Network**, **Analytics**), click "+ Create Post" modal, generate AI draft from daily check-in, test interactive Like and Repost buttons in feed preview. |
| **15. Profile & Target Trajectory** | `/profile` | ✅ Complete | ⏳ `GET/PUT /api/v1/profile` | 🧪 Interactive State | Inspect verified profile status, target trajectory details, education/experience timelines, profile completeness gauge, and AI role fit breakdown. |
| **16. Settings & Security Vault** | `/settings` | ✅ Complete | ⏳ `GET/PUT /api/v1/settings` | 🧪 Interactive State | Edit profile inputs, add/remove target role tags, toggle notification dispatcher switches, switch theme pickers, click "Save Changes". |
| **17. Global Command Palette & Notifications** | Persistent Shell | ✅ Complete | ⏳ Client Router | 🟢 Live Interactive | Press `⌘ K` (or `Ctrl+K`) anywhere to open command palette, click bell icon to view unread notification popover drawer. |

---

## 🔍 Step-by-Step Feature Testing & Verification Guide

### How to test the 4 updated pages in the browser (`http://localhost:3000`):

1. **Applications Pipeline (`/applications`)**:
   - Navigate to `http://localhost:3000/applications`.
   - **Multi-View Modes**: Click **Board** (6 Kanban columns), **List** (sortable interactive table), **Calendar** (deadlines & interview dates), and **Analytics** (conversion funnel & resume stats).
   - **Create Application Modal**: Click `+ Add Application`, enter company (e.g. Anthropic), role (AI Systems Engineer), stage, salary, location, and submit to see the card appear in the Kanban board immediately.
   - **Detail Drawer**: Click on any card to slide out the application inspector, view deterministic match score, move pipeline stage, and jump to tailored resume.

2. **Skills & Evidence Repository (`/skills-and-evidence`)**:
   - Navigate to `http://localhost:3000/skills-and-evidence`.
   - **Sub-Tabs**:
     - **Skills**: Filter by category (AI & ML Infra, Distributed Systems, Low-Level & Hardware, Networking & Security), view AST verified proofs.
     - **Evidence**: Search and filter cryptographic proofs (GitHub PRs, PyPI packages, ArXiv preprints, Production Systems).
     - **Role Fit**: Pick a target role (e.g. AI Infrastructure Engineer, Distributed Systems Engineer) and inspect hard competency checklist and match score.
     - **Insights**: Review YoY skill demand trajectory and cryptographic SHA-256 verification status.
   - **Add Evidence Modal**: Click `+ Add Evidence` to open the modal, input artifact name, commit hash, metric proof, and add to graph.
   - **AST Proof Auditor**: Click `Audit AST Proof` on any skill card to open the interactive syntax tree and verification breakdown modal.

3. **Daily Planner (`/planner`)**:
   - Navigate to `http://localhost:3000/planner`.
   - **Sub-Tabs**:
     - **Overview**: Toggle today's task checkboxes (watch completion count & progress ring dynamically update), view focus areas and timeline blocks.
     - **Calendar**: Toggle between **Day**, **Week** (7-day matrix), and **Month** views.
     - **Tasks**: Full task manager with search, status filters (Pending, In Progress, Completed), and delete buttons.
     - **Goals**: Q3 OKRs and key results checklist.
     - **Habits**: Interactive daily habit streak buttons (click Mon-Sun buttons to toggle completion).
     - **Notes**: Full engineering scratchpad with save handler.
   - **Add Task Modal**: Click `+ Add Task`, enter title, subtitle, duration, tag, and create task.
   - **Date Navigation**: Click `<` or `>` to step through days, or click `Today` to jump back.

4. **LinkedIn & Professional Presence Copilot (`/linkedin-and-presence`)**:
   - Navigate to `http://localhost:3000/linkedin-and-presence`.
   - **Sub-Tabs**:
     - **Post Studio**: Enter bullet in "Daily Engineering Check-in" and click "Generate Post", edit in Draft Editor, copy to clipboard, or click Like / Repost in the live LinkedIn feed mockup.
     - **Content Calendar**: View scheduled posts, forecast reach, and manage scheduled drafts.
     - **Profile Optimizer**: Inspect 96/100 headline score and featured proof sync status.
     - **Engagement**: View inbound recruiter messages and comments with AI reply generators.
     - **Network**: Track target companies and engineer connection tiers.
     - **Analytics**: Monthly impressions (142,400) and reader persona breakdown.
   - **Create Post Modal**: Click `+ Create Post` to schedule a new technical post into the calendar.

---

## 🎯 Version Roadmap & Transition Plan (Mock ➔ Real Backend)

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: V0.1 - V0.7 (COMPLETED & VERIFIED)                                       │
│ • 16 Frontend Screens matching exact Stitch Design System                       │
│ • Client State Engines, Modals, Sliders, Diff Visualizers, Whiteboard Canvas     │
│ • 0 Dead Buttons / 0 Un-interactive Sub-tabs                                     │
│ • 0 TypeScript / Build Errors (20/20 static routes generated)                    │
├──────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: V1.0 (FASTAPI BACKEND & DATABASE MIGRATION - NEXT)                      │
│ • Step 1: Initialize FastAPI app (`backend/app`) & Pydantic schemas              │
│ • Step 2: Setup PostgreSQL / Firebase SQL Connect relational models & pgvector   │
│ • Step 3: Implement Authentication & API Middleware (JWT / Firebase Auth)         │
│ • Step 4: Build REST endpoints & replace `src/data/mock/` with real HTTP calls   │
│ • Step 5: Implement Gemini AI prompt chains for Resume Tailoring & Mock Interview│
│ • Step 6: Deploy Celery / Background workers for GitHub & LeetCode harvesters    │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Live Changelog

* **2026-09-27 (Full Audit & Interactivity Fixes for Applications, Evidence, Planner, LinkedIn)**:
  - **Applications (`/applications`)**: Implemented 4 multi-views (Board, List, Calendar, Analytics), functional `+ Add Application` modal, stage movement handlers, and detail drawer.
  - **Skills & Evidence (`/skills-and-evidence`)**: Implemented 4 sub-tabs (Skills, Evidence Vault, Role Fit Gap Analyzer, Insights), functional `+ Add Evidence` modal, and AST Proof Audit modal.
  - **Daily Planner (`/planner`)**: Implemented 6 sub-tabs (Overview, Calendar, Tasks, Goals, Habits, Notes), Day/Week/Month view switchers, date navigation (`< > Today`), functional `+ Add Task` modal, and habit toggle matrix.
  - **LinkedIn & Presence (`/linkedin-and-presence`)**: Implemented 6 tabs (Post Studio, Content Calendar, Profile Optimizer, Engagement, Network, Analytics), functional `+ Create Post` modal, and interactive Like/Repost feed preview.
  - Verified static production build: `✓ Generating static pages (20/20)` with 0 errors.
