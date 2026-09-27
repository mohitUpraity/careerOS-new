# 🧭 CareerOS Master Project & Implementation Tracker

**Project Name**: CareerOS (Personal Career Operating System)  
**Baseline Date**: 27 September 2026  
**Status**: 🟢 **Phase 1: Frontend Suite & State Engines (100% Verified) | Phase 2: FastAPI & Database (Ready to Start)**  
**Tech Stack**: Next.js 14 (TypeScript, Tailwind CSS, Lucide React) + FastAPI (Python, PostgreSQL/pgvector, Firebase Auth & Storage)

---

## 📊 Tri-Layer Implementation Matrix (Frontend · Backend · E2E)

| Feature Module | Route | Frontend UI & State | Backend API Endpoint | E2E Data Mode | How to Test & Verify |
|---|---|:---:|:---:|:---:|---|
| **1. Command Center Dashboard** | `/` or `/dashboard` | ✅ Complete | ⏳ `GET /api/v1/dashboard/overview` | 🧪 Interactive Mock State | Click "Launch Simulator" CTA, toggle timeline task checkboxes, verify 4-segment telemetry progress bar updates. |
| **2. Opportunities Discovery** | `/opportunities` | ✅ Complete | ⏳ `GET /api/v1/opportunities` | 🧪 Interactive Mock State | Filter by category (Jobs, Internships, Research, Scholarships), drag Match % slider (70-95%), select any opportunity row to inspect requirements in split drawer. |
| **3. Hackathons & Events** | `/hackathons-and-events` | ✅ Complete | ⏳ `GET /api/v1/hackathons` | 🧪 Interactive Mock State | Click "Register Team", switch tabs (Live, Upcoming, Past), inspect prize pools and team formation modal. |
| **4. Applications Kanban** | `/applications` | ✅ Complete | ⏳ `GET/POST /api/v1/applications` | 🧪 Interactive Mock State | Click on any application card (e.g. Anthropic, OpenAI) to open slide-over detail drawer; test status updates, tailored resume badges, and timeline notes. |
| **5. Resume Tailor & Diff Canvas** | `/resume` | ✅ Complete | ⏳ `POST /api/v1/resume/tailor` | 🧪 Interactive Mock State | Review target JD requirements, inspect ATS match score, click "Accept Change" on diff highlights, test "Export PDF" trigger. |
| **6. Skills & Evidence Graph** | `/skills-and-evidence` | ✅ Complete | ⏳ `GET /api/v1/skills/graph` | 🧪 Interactive Mock State | Inspect AST verified proof matrix, click "Add Evidence" to open modal and input new proof item, click "Audit AST Proof". |
| **7. Evidence Connectors Hub** | `/connectors` | ✅ Complete | ⏳ `GET/POST /api/v1/connectors` | 🧪 Interactive Mock State | Click "Sync All Channels", test "Harvest Now" per connector (GitHub, LeetCode, HuggingFace, Kaggle), approve newly harvested evidence items. |
| **8. AI Interview Arena HUD** | `/interview-arena` | ✅ Complete | ⏳ `WS /api/v1/interview/live` | 🧪 Interactive Mock State | Click "Start Simulation", test live question rubric scoring, view speech waveform animation & live transcription feed, draw on the interactive whiteboard canvas. |
| **9. Interview Debrief Scorecard**| `/interview-debrief` | ✅ Complete | ⏳ `GET /api/v1/interview/:id` | 🧪 Interactive Mock State | Drag/click audio timeline scrubber to jump between questions, inspect rubric competency scores, click "Export Committee Dossier". |
| **10. Compensation & Offer Matrix**| `/compensation` | ✅ Complete | ⏳ `GET/POST /api/v1/offers` | 🧪 Interactive Mock State | Adjust base salary & equity sliders, inspect 4-year vesting curve re-renders, click "Generate Counter-Offer Script" and copy to clipboard. |
| **11. Learning & Roadmap** | `/learning` | ✅ Complete | ⏳ `GET /api/v1/learning/roadmap`| 🧪 Interactive Mock State | Step through the 7-stage curriculum track, toggle sub-tabs (Curriculum, Projects, Certifications), review "Why this task?" AI callouts. |
| **12. Resources & RFC Library** | `/resources` | ✅ Complete | ⏳ `GET /api/v1/resources` | 🧪 Interactive Mock State | Filter across 8 resource categories (YouTube, Docs, Papers, Books, Tools, Templates), search resources, toggle star bookmarks. |
| **13. Planner & Daily Streaks** | `/planner` | ✅ Complete | ⏳ `GET/POST /api/v1/planner` | 🧪 Interactive Mock State | Toggle daily task completion checkboxes, verify SVG donut chart updates, change focus area tags, inspect productivity bar graph. |
| **14. LinkedIn & Presence Copilot** | `/linkedin-and-presence` | ✅ Complete | ⏳ `POST /api/v1/presence/draft` | 🧪 Interactive Mock State | Edit draft post in the markdown/code toolbar, observe real-time LinkedIn feed preview mockup update, click "Publish" to simulate dispatch. |
| **15. Profile & Target Trajectory** | `/profile` | ✅ Complete | ⏳ `GET/PUT /api/v1/profile` | 🧪 Interactive Mock State | Inspect verified profile status, target trajectory details, education/experience timelines, profile completeness gauge, and AI role fit breakdown. |
| **16. Settings & Security Vault** | `/settings` | ✅ Complete | ⏳ `GET/PUT /api/v1/settings` | 🧪 Interactive Mock State | Edit profile inputs, add/remove target role tags, toggle notification dispatcher switches, switch theme pickers, click "Save Changes". |
| **17. Global Command Palette** | Persistent Shell | ✅ Complete | ⏳ Client Router | 🟢 Live Interactive | Press `⌘ K` (or `Ctrl+K`) anywhere or click the top search bar to open command palette and jump to any route. |

---

## 🔍 Step-by-Step Feature Testing & Verification Guide

### How to test each feature in the browser (`http://localhost:3000`):

1. **Dashboard (`/` or `/dashboard`)**:
   - Navigate to `http://localhost:3000/dashboard`.
   - Verify Mission Status pill (`MISSION: SECURE STAFF/PRINCIPAL AI ROLE`).
   - Check the 4-segment progress bar (`Overall Readiness 88%`).
   - Click "Launch Simulator" in Next Best Action card.

2. **Opportunities (`/opportunities`)**:
   - Navigate to `http://localhost:3000/opportunities`.
   - Click "Internships", "Research", or "Scholarships" tabs to filter rows.
   - Adjust the **Minimum Match Threshold** slider (from 70% to 95%) and watch the table filter dynamically.
   - Click on any opportunity (e.g. "Senior Distributed Systems Engineer at Anthropic") to open the right inspection panel.
   - Click "Apply Directly" or "Tailor Resume".

3. **Resume Tailor (`/resume`)**:
   - Navigate to `http://localhost:3000/resume`.
   - Review Target JD requirements on the left column.
   - Review interactive resume canvas in center.
   - In the right-hand panel, click "Accept" or "Reject" on proposed bullet diffs.
   - Watch the ATS Match Score increase as diffs are accepted.

4. **Evidence Connectors Hub (`/connectors`)**:
   - Navigate to `http://localhost:3000/connectors`.
   - Click "Sync All Channels" or click "Harvest Now" on the GitHub card.
   - In the "Newly Harvested Evidence Feed", click "Approve & Map to Graph" on a pending proof item.

5. **AI Interview Arena (`/interview-arena`)**:
   - Navigate to `http://localhost:3000/interview-arena`.
   - Click "Start Simulation" to begin timer and audio waveform.
   - Draw on the interactive whiteboard canvas (pencil, rectangle, clear tools).
   - Review rubric scoring criteria on the right panel.

6. **Interview Debrief Scorecard (`/interview-debrief`)**:
   - Navigate to `http://localhost:3000/interview-debrief`.
   - Click on different points of the audio timeline scrubber (Question 1, Question 2, Question 3).
   - Inspect competency grades and click "Export Committee Dossier".

7. **Compensation Matrix (`/compensation`)**:
   - Navigate to `http://localhost:3000/compensation`.
   - Toggle between offer models (Base, Equity, Signing Bonus).
   - Click "Generate Counter-Offer Script" to view customized AI negotiation wording.

8. **Settings 3-Column Bento (`/settings`)**:
   - Navigate to `http://localhost:3000/settings`.
   - Edit full legal name or manifesto text.
   - Click "+ Add" in Target Roles to add a new role pill, or click "x" to remove.
   - Toggle notification dispatcher switches and click "Save Changes".

---

## 🎯 Version Roadmap & Transition Plan (Mock ➔ Real Backend)

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: V0.1 - V0.7 (COMPLETED & VERIFIED)                                       │
│ • 16 Frontend Screens matching exact Stitch Design System                       │
│ • Client State Engines, Modals, Sliders, Diff Visualizers, Whiteboard Canvas     │
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

* **2026-09-27 (End-to-End Verification & Tracker Matrix Upgrade)**:
  - Upgraded `PROJECT_TRACKER.md` to tri-layer verification matrix (Frontend · Backend · E2E).
  - Added step-by-step testing instructions for every single feature route.
  - Confirmed 0 dead/fake buttons; all interactive components have active state handlers.
* **2026-09-27 (V0.8 Connectors Hub & Git Commit)**:
  - Initialized git repository with comprehensive `.gitignore` and committed V0.7 milestone (`b87cc2c`).
  - Added Evidence Connectors Hub ([`/connectors`](file:///Users/mohitupraity/Documents/projects/careerOS-new/src/app/connectors/page.tsx)).
* **2026-09-27 (V0.1 - V0.7 Full Frontend Suite)**:
  - Built 16 high-fidelity screens matching Stitch project `projects/1687437076194585411`.
  - Statically compiled all 20 routes with 0 errors.
