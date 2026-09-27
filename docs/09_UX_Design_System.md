# 09 — UX & Design System Specification

Product-wide information architecture, design tokens, and UI rules for CareerOS.

**CareerOS • Locked Planning Baseline • 27 September 2026**

---

## 1. Product Shell Architecture
- **Persistent Left Navigation (Desktop)**: Fixed 240px (`w-60`) width on desktop with brand logo, PRO badge, active navigation state pills, and bottom user profile card.
- **Top Utility Command Bar**: Fixed 56px (`h-14`) bar with global search (`⌘ K` shortcut), live telemetry status badges, notification bell, dark/light theme switch, and user avatar.
- **Responsive Adaptive Layout**: Collapsible navigation rail on tablet (`768px - 1024px`) and bottom navigation bar on mobile (`< 768px`).
- **Master-Detail Workspace Philosophy**: Split-pane layouts (e.g. 65/35 or 7/5 column grid) for high-density contextual work without unnecessary page jumps.

---

## 2. Complete Screen Suite & Navigation Hierarchy

| # | Route / Page | Primary Information Pattern & Role | Status |
|---|---|---|---|
| 1 | **`/dashboard`** (Command Center) | Career command center: daily telemetry, readiness score, *"Next Best Action"* hero card with step pipeline, and today's execution plan. | Core |
| 2 | **`/opportunities`** (Discovery) | Dense searchable/filterable master list (Jobs, Internships, Research, Scholarships) + split opportunity detail panel with JD research & fit breakdown. | Core |
| 3 | **`/hackathons-and-events`** | Competitions, team formation, hackathon registration trackers, and milestone timers. | Core |
| 4 | **`/resume`** (Resume Tailor) | Split workspace: JD intelligence + interactive resume canvas + change review diff approval + ATS fit score. | Core |
| 5 | **`/skills-and-evidence`** | Relationship graph + verified evidence drawer + benchmark signals (DRDO packet pipeline, vLLM / Triton kernels). | Core |
| 6 | **`/learning`** (Learning & Roadmap) | Actionable skill gap roadmap, module curriculum sequence, and progress milestones. | Core |
| 7 | **`/interview-arena`** (AI Simulator) | Live voice/audio simulation cockpit, synthetic evaluator HUD, multi-bar speech waveforms, turn-by-turn transcription, and interactive architecture whiteboard. | Core |
| 8 | **`/interview-debrief`** (Scorecard) | Scored timeline playback with audio scrubber, turn-by-turn Q&A analysis, architecture whiteboard review, remediation drills, and Hiring Committee packet. | Core |
| 9 | **`/applications`** (Pipeline) | Kanban pipeline + stage trackers + application metadata + follow-up actions. | Core |
| 10 | **`/compensation`** (Offer Matrix) | Side-by-side offer comparison, 4-year stacked total compensation & equity vesting curves, L6 market percentile leveling, and AI negotiation copilot scripts. | Core |
| 11 | **`/planner`** (Daily Planner) | Timeline/calendar task manager, deadline countdowns, and scheduled interview blocks. | Core |
| 12 | **`/linkedin-and-presence`** | Professional brand health score, content draft editor, and networking outreach radar. | Core |
| 13 | **`/resources`** (Library) | Filterable engineering cheatsheets, papers, system design RFCs, and repo bookmarks. | Core |
| 14 | **`/profile`** (Career Goal & Identity) | Structured career goal selector, baseline qualifications, target tracks, and work history. | Core |
| 15 | **`/settings`** (System Configuration) | API keys, AI model provider configuration, notification preferences, and account security. | Core |

---

## 3. Visual Direction & Design Tokens (`CareerOS Intelligence System`)
- **Canvas Base**: `#F8FAFC` / `#F8F9FF` (Slate 50) establishes subtle neutral depth.
- **Card & Container Surface**: `#FFFFFF` pure white surfaces bounded by crisp 1px borders (`#E2E8F0` / `border-slate-200`).
- **Primary Brand Accent**: `#2563EB` / `#004AC6` (Tech Blue) for primary actions, active indicators, and progress bars.
- **Validation & Verified Match**: `#10B981` (Emerald 500) with `#ECFDF5` background for verified evidence, strong matches, and passing criteria.
- **Alerts & Warnings**: `#F59E0B` (Amber 500) for deadlines and critical skill gaps; `#EF4444` (Rose 500) for blockers.
- **Typography Pairing**:
  - **`Inter`**: UI headlines, body copy, and navigation controls (`-0.015em` to `-0.025em` letter tracking).
  - **`JetBrains Mono`**: Monetary values, system telemetry, timestamps, keyboard shortcuts (`⌘ K`), and code snippets.
- **Corner Radii**: Disciplined `6px - 8px` (`rounded-lg`) for buttons, inputs, and cards. Never use toy-like large pill shapes for standard cards.

---

## 4. Interaction & UX Principles
1. **One Dominant Action Per Section**: Clear visual hierarchy with primary vs secondary styling.
2. **Progressive Disclosure**: Detailed inspection panels and drawers rather than overwhelming full-page transitions.
3. **Deterministic First AI**: Always show rationale, source provenance, and telemetry metrics (`+14% Match Boost`, `Top 3% Benchmark`).
4. **Accessible Feedback**: Explicit loading, error, hover, active (`active:scale-95`), and keyboard focus rings.