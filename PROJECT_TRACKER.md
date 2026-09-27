# 🧭 CareerOS Master Project & Implementation Tracker

**Project Name**: CareerOS (Personal Career Operating System)  
**Baseline Date**: 27 September 2026  
**Last Updated**: 28 September 2026  
**Status**: 🟢 **Phase 1: Frontend Suite & State Engines (100% Complete) | Phase 2: FastAPI, Firebase Auth & Supabase Database (Active & In-Progress)**  
**Tech Stack**: Next.js 14 (App Router, TypeScript, Tailwind CSS, Lucide React) + FastAPI (Python, SQLAlchemy Async, Gemini 1.5/2.0 AI) + Supabase (PostgreSQL 17.6, pgvector, Storage) + Firebase (Authentication Only)

---

## 🏗️ Core Architecture & System Boundaries

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             CAREEROS ARCHITECTURE                                │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Firebase                                                                      │
│    └── Authentication ONLY                                                       │
│        ├── Google 1-Click Sign-in                                                │
│        ├── Email / Password Sign-in & Sign-up                                    │
│        └── Firebase UID & Bearer ID Tokens                                       │
│                                                                                  │
│ 2. Supabase                                                                      │
│    ├── PostgreSQL (17.6)  → SINGLE SOURCE OF TRUTH FOR ALL APP DATA             │
│    │                        (users, profiles, opportunities, applications,       │
│    │                         skills, evidence, resumes, planner tasks, offers)   │
│    ├── pgvector           → Semantic embeddings & hybrid RAG search              │
│    └── Storage            → PDF Resumes, portfolio assets & certs                │
│                                                                                  │
│ 3. FastAPI Backend (`http://127.0.0.1:8000`)                                     │
│    ├── Auth Verification  → Firebase ID token validation & Supabase auto-upsert  │
│    ├── AI Orchestration   → Gemini 1.5 Pro / 2.0 (Resume, LinkedIn, Interviews)   │
│    ├── Database Layer     → Async SQLAlchemy 2.0 with Supabase pooler connection │
│    └── Ingestion/Engines  → JD Analyzer, ATS Scorer, Opportunity Matcher         │
│                                                                                  │
│ 4. Next.js Frontend (`http://localhost:3000`)                                    │
│    ├── Landing Page (/)   → Systems-Grade Intro for unauthenticated visitors     │
│    ├── Protected Routes   → Gatekeepers for /applications, /resume, /profile,... │
│    ├── AppShell Workspace → Unlocked TopCommandBar & SidebarNav on Auth          │
│    └── Interactive UI     → 16 fully functional screens with zero dead buttons   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Tri-Layer Implementation Matrix (Frontend · Backend · E2E)

| Feature Module | Route | Frontend UI & State | Backend API Endpoint | Database / Storage Mode | How to Test & Verify |
|---|---|:---:|:---:|:---:|---|
| **0. Systems Landing Page** | `/` (Unauth) | ✅ Complete | N/A (Static SSG) | 🌐 Public View | Visit `http://localhost:3000/` when logged out; inspect interactive cockpit preview, telemetry grid, and live demo modal. |
| **0. Auth & Identity Sync** | Modal & Nav | ✅ Complete | ✅ `POST /api/v1/auth/sync`<br>✅ `GET /api/v1/auth/me` | 🟢 Supabase `users` & `user_profiles` | Click "Sign In", authenticate with Google or Email/Password, verify user record created/synced in Supabase PostgreSQL with Firebase UID. |
| **1. Command Center Dashboard** | `/` or `/dashboard` (Auth) | ✅ Complete | ⏳ `GET /api/v1/dashboard/overview` | 🟢 Supabase PostgreSQL | Log in to unlock command center, toggle timeline task checkboxes, verify 4-segment telemetry progress bar updates. |
| **2. Opportunities Discovery** | `/opportunities` | ✅ Complete | ✅ `GET /api/v1/opportunities` | 🟢 Supabase `opportunities` | Filter by category (Jobs, Internships, Research, Scholarships), drag Match % slider (70-95%), select any opportunity row to inspect split drawer. |
| **3. Hackathons & Events** | `/hackathons-and-events` | ✅ Complete | ⏳ `GET /api/v1/hackathons` | 🧪 Interactive State | Click "Register Team", switch tabs (Live, Upcoming, Past), inspect prize pools and team formation modal. |
| **4. Applications Kanban & CRM** | `/applications` | ✅ Complete | ✅ `GET/POST /api/v1/applications` | 🟢 Supabase `applications` (CRUD) | Switch across 4 view modes (**Board**, **List**, **Calendar**, **Analytics**), click "+ Add Application" to insert new application, drag/move pipeline stages. |
| **5. Resume Tailor & Diff Canvas** | `/resume` | ✅ Complete | ✅ `POST /api/v1/resume/tailor` | 🤖 Gemini 1.5 Pro + Supabase `resumes` | Review target JD requirements, inspect ATS match score, click "Accept Change" on diff highlights, test "Export PDF" trigger. |
| **6. Skills & Evidence Graph** | `/skills-and-evidence` | ✅ Complete | ⏳ `GET /api/v1/skills/graph` | 🟢 Supabase `skills` & `evidence_vault` | Switch across 4 sub-tabs (**Skills**, **Evidence Vault**, **Role Fit Gap Analyzer**, **Insights**), click "+ Add Evidence" to inject cryptographic proof, inspect AST modal. |
| **7. Evidence Connectors Hub** | `/connectors` | ✅ Complete | ⏳ `GET/POST /api/v1/connectors` | 🧪 Interactive State | Click "Sync All Channels", test "Harvest Now" per connector (GitHub, LeetCode, HuggingFace, Kaggle), approve newly harvested evidence items. |
| **8. AI Interview Arena HUD** | `/interview-arena` | ✅ Complete | ✅ `POST /api/v1/ai/interview/evaluate` | 🤖 Gemini 1.5 Pro AI Engine | Click "Start Simulation", test live question rubric scoring, view speech waveform animation & live transcription feed, draw on interactive whiteboard canvas. |
| **9. Interview Debrief Scorecard**| `/interview-debrief` | ✅ Complete | ⏳ `GET /api/v1/interview/:id` | 🧪 Interactive State | Drag/click audio timeline scrubber to jump between questions, inspect rubric competency scores, click "Export Committee Dossier". |
| **10. Compensation & Offer Matrix**| `/compensation` | ✅ Complete | ⏳ `GET/POST /api/v1/offers` | 🧪 Interactive State | Adjust base salary & equity sliders, inspect 4-year vesting curve re-renders, click "Generate Counter-Offer Script" and copy to clipboard. |
| **11. Learning & Roadmap** | `/learning` | ✅ Complete | ⏳ `GET /api/v1/learning/roadmap`| 🧪 Interactive State | Step through 7-stage curriculum, switch between **Roadmap Track**, **Capstone Projects**, and **Certificates**, inspect prerequisite trees. |
| **12. Resources & RFC Library** | `/resources` | ✅ Complete | ⏳ `GET /api/v1/resources` | 🧪 Interactive State | Filter across 8 resource categories (YouTube, Docs, Papers, Books, Tools, Templates), search resources, toggle star bookmarks. |
| **13. Planner & Daily Streaks** | `/planner` | ✅ Complete | ⏳ `GET/POST /api/v1/planner` | 🟢 Supabase `planner_tasks` | Switch across 6 sub-tabs (**Overview**, **Calendar**, **Tasks**, **Goals**, **Habits**, **Notes**), toggle Day/Week/Month views, navigate dates, add tasks. |
| **14. LinkedIn & Presence Copilot** | `/linkedin-and-presence` | ✅ Complete | ✅ `POST /api/v1/ai/linkedin/generate` | 🤖 Gemini 1.5 Pro AI Engine | Switch across 6 tabs, enter bullet in "Daily Engineering Check-in" and click "Generate Post", edit in Draft Editor, test Like / Repost buttons. |
| **15. Profile & Target Trajectory** | `/profile` | ✅ Complete | ✅ `GET/PUT /api/v1/profile` | 🟢 Supabase `user_profiles` | Inspect verified profile status, target trajectory details, education/experience timelines, profile completeness gauge, and AI role fit breakdown. |
| **16. Settings & Security Vault** | `/settings` | ✅ Complete | ⏳ `GET/PUT /api/v1/settings` | 🟢 Supabase User Config | Edit profile inputs, add/remove target role tags, toggle notification dispatcher switches, switch theme pickers, click "Save Changes". |
| **17. Global Command Palette & Shell** | Persistent Shell | ✅ Complete | Client Router | 🟢 Live Interactive | Press `⌘ K` (or `Ctrl+K`) anywhere to open command palette, click bell icon to view unread notification popover drawer. |

---

## 🔍 Verification & Testing Guide

### 1. Standalone Landing Page & Route Protection
- **Unauthenticated View**: Visit `http://localhost:3000/` in an incognito window.
  - Full-width standalone landing page renders without workspace sidebars or top bars.
  - Interactive hero with CTA buttons (`Launch CareerOS`, `Explore Interactive Demo`, `Sign In`).
  - Interactive 3-column cockpit grid with active tab preview switching.
  - Live interactive demo modal with simulation telemetry.
- **Route Gatekeeper**: Attempt to navigate to `http://localhost:3000/applications` or `http://localhost:3000/resume` while logged out.
  - Protected route lock screen appears informing user that authentication is required.
  - Click `Sign In to Continue` or `Return to Home`.

### 2. Firebase Authentication & Supabase PostgreSQL Sync
- Click `Sign In` from landing page or top bar.
- Choose **Google 1-Click** or **Email / Password**.
- Upon successful authentication:
  - Frontend extracts Firebase ID Token.
  - Dispatches `POST /api/v1/auth/sync` with bearer token to FastAPI backend.
  - Backend verifies token with Firebase Admin SDK and performs atomic upsert into Supabase `users` and `user_profiles` tables.
  - App unlocks internal workspace shell with active user avatar, email, and live status.

---

## 🎯 Project Roadmap & Milestone Progress

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: FRONTEND SUITE & INTERACTIVE ENGINES (100% COMPLETE & VERIFIED)         │
│ [x] 16 Functional screens matching Stitch Design System                          │
│ [x] Complete Client State Engines (Kanban, AST auditor, Audio timeline scrubber) │
│ [x] 0 Dead buttons / 0 Non-functional tabs                                       │
│ [x] 0 TypeScript / Build errors (Clean 20/20 production build)                   │
├──────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: AUTHENTICATION, DATABASE & FASTAPI (ACTIVE)                             │
│ [x] Architecture Lock: Firebase Auth ONLY + Supabase PostgreSQL single source    │
│ [x] Supabase Pooler integration (aws-0-ap-northeast-2.pooler.supabase.com)       │
│ [x] Core PostgreSQL DDL: users, user_profiles, opportunities, applications        │
│ [x] FastAPI Backend initialization (`backend/app`) with async SQLAlchemy 2.0     │
│ [x] Live Auth Token Verification & Atomic Supabase User Sync (`/api/v1/auth`)    │
│ [x] Gemini AI Engine integration (`gemini-1.5-pro` & `gemini-2.0`)               │
│ [x] Standalone Landing Page (`/`) with full-width layout & protected routes      │
│ [ ] Complete remaining Supabase ORM models (skills, evidence, resumes, planner)  │
│ [ ] Wire frontend pages to live FastAPI endpoints (replacing mock fallback data) │
├──────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: BACKGROUND HARVESTERS & REALTIME RAG                                    │
│ [ ] Celery / Redis background workers for GitHub & LeetCode harvesters           │
│ [ ] pgvector embeddings generation for semantic JD & resume matching             │
│ [ ] Real-time interview simulation audio streaming                               │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Live Changelog

* **2026-09-28 (Landing Page Isolation & Protected Routes)**:
  - **Standalone Public Landing Page (`/`)**: Built systems-grade introduction page with hero cockpit, interactive feature tabs, telemetry metric bands, comparison matrix, and live demo modal.
  - **AppShell Route Guard**: Isolated unauthenticated visitors on `/` (no sidebar/top bar leaks) and placed route protection lock on internal pages (`/applications`, `/resume`, `/profile`, `/planner`, etc.).
  - **Auth Integration**: Connected `AuthModal` to landing page CTAs for instant 1-click Google or Email authentication.

* **2026-09-28 (Firebase Auth & Supabase PostgreSQL Sync)**:
  - **Architecture Finalized**: Firebase Auth ONLY + Supabase PostgreSQL (single source of truth) + FastAPI backend + Next.js frontend.
  - **Supabase Pooler Setup**: Successfully connected to `aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres` (PostgreSQL 17.6).
  - **Auth Sync Endpoints**: Created `POST /api/v1/auth/sync` and `GET /api/v1/auth/me` with atomic transaction handling and race condition protection.
  - **Database Migration**: Created initial tables: `users`, `user_profiles`, `opportunities`, `saved_opportunities`, `applications`.

* **2026-09-27 (Frontend Complete Build & Verification)**:
  - Complete interactivity for Applications, Skills & Evidence, Daily Planner, and LinkedIn Copilot.
  - Verified static production build: `✓ Generating static pages (20/20)` with 0 errors.
