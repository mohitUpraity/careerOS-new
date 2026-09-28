/**
 * CareerOS API Client Bridge
 * Type-safe HTTP connector communicating with FastAPI backend (http://127.0.0.1:8000/api/v1)
 * with robust local fallback for resilience.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export interface UserProfileData {
  id: string;
  name: string;
  headline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  manifesto: string;
  target_roles: string[];
  profile_completeness: number;
  overall_readiness: number;
}

export interface DashboardOverviewData {
  missionStatus: string;
  overallReadiness: number;
  readinessTrend: string;
  telemetrySegments: { label: string; value: number; color: string }[];
  nextBestAction: {
    title: string;
    subtitle: string;
    actionLabel: string;
    actionRoute: string;
    estimatedTime: string;
    impactScore: string;
  };
  timelineTasks: {
    id: string;
    title: string;
    time: string;
    category: string;
    completed: boolean;
  }[];
  activeOpportunitiesCount: number;
  verifiedProofsCount: number;
  applicationsInFlightCount: number;
  interviewArenaScore: number;
}

export interface LiveOpportunity {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  workplace_type: string;
  match_score: number;
  match_reason?: string;
  salary_range?: string;
  experience_level: string;
  posted_date: string;
  deadline?: string;
  tags: string[];
  key_requirements: string[];
  hard_skills: string[];
  verified_evidence_required: string[];
  apply_url?: string;
}

export interface LiveApplication {
  id: string;
  user_id: string;
  opportunity_id?: string;
  company: string;
  role: string;
  stage: string;
  match_score: number;
  salary?: string;
  location?: string;
  resume_version: string;
  tags: string[];
  notes?: string;
  applied_date?: string;
}

export interface LiveSkill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  verified: boolean;
  proof_count: number;
  ast_proof_hash?: string;
  ast_proof_details?: any;
  tags: string[];
}

export interface LiveEvidence {
  id: string;
  title: string;
  type: string;
  platform: string;
  sha_hash?: string;
  url?: string;
  metric_proof?: string;
  skills_linked: string[];
  verified: boolean;
}

export interface LiveSkillGraph {
  skills: LiveSkill[];
  evidence: LiveEvidence[];
  metrics: {
    total_skills: number;
    verified_skills: number;
    total_evidence: number;
    avg_proficiency: number;
    verification_status: string;
    proof_integrity: string;
  };
}

// -----------------------------------------------------------------------------
// Profile & Dashboard Endpoints
// -----------------------------------------------------------------------------
export async function fetchProfile(): Promise<UserProfileData | null> {
  try {
    const res = await fetch(`${API_BASE}/profile`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend profile fetch failed, using localized cache.', err);
    return null;
  }
}

export async function updateProfile(data: Partial<UserProfileData>): Promise<UserProfileData | null> {
  try {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend profile update failed, using localized state.', err);
    return null;
  }
}

export async function fetchDashboardOverview(): Promise<DashboardOverviewData | null> {
  try {
    const res = await fetch(`${API_BASE}/dashboard/overview`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend dashboard overview fetch failed, using localized cache.', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Opportunities Endpoints
// -----------------------------------------------------------------------------
export async function fetchOpportunities(params?: {
  category?: string;
  search?: string;
  minMatchScore?: number;
}): Promise<LiveOpportunity[] | null> {
  try {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.minMatchScore) query.append('min_match_score', params.minMatchScore.toString());

    const url = `${API_BASE}/opportunities?${query.toString()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn('Backend opportunities fetch failed, using fallback.', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Applications Endpoints (Live CRUD against Supabase)
// -----------------------------------------------------------------------------
export async function fetchApplications(stage?: string): Promise<LiveApplication[] | null> {
  try {
    const query = stage && stage !== 'ALL' ? `?stage=${stage}` : '';
    const res = await fetch(`${API_BASE}/applications${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn('Backend applications fetch failed, using fallback.', err);
    return null;
  }
}

export async function createApplication(payload: Partial<LiveApplication>): Promise<LiveApplication | null> {
  try {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend create application failed, using local update.', err);
    return null;
  }
}

export async function updateApplication(id: string, payload: Partial<LiveApplication>): Promise<LiveApplication | null> {
  try {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend update application failed, using local update.', err);
    return null;
  }
}

export async function deleteApplication(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend delete application failed.', err);
    return false;
  }
}

// -----------------------------------------------------------------------------
// Hackathons & Events Endpoints
// -----------------------------------------------------------------------------
export interface LiveHackathon {
  id: string;
  title: string;
  organizer: string;
  prize_pool: string;
  status: string;
  deadline?: string;
  start_date?: string;
  location: string;
  team_size: string;
  tracks: string[];
  tags: string[];
  url?: string;
  description?: string;
  registered_count: number;
}

export async function fetchHackathons(params?: { status?: string; search?: string }): Promise<LiveHackathon[] | null> {
  try {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'ALL') query.append('status', params.status);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/hackathons?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn('Backend hackathons fetch failed, using fallback.', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Skills & Evidence Graph Endpoints
// -----------------------------------------------------------------------------
export async function fetchSkillGraph(): Promise<LiveSkillGraph | null> {
  try {
    const res = await fetch(`${API_BASE}/skills/graph`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend skills graph fetch failed, using fallback.', err);
    return null;
  }
}

export async function addEvidence(payload: Partial<LiveEvidence>): Promise<LiveEvidence | null> {
  try {
    const res = await fetch(`${API_BASE}/skills/evidence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend add evidence failed.', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Gemini AI Endpoints Bridge
// -----------------------------------------------------------------------------
export async function generateAIPost(checkinText: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/ai/generate-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkin_text: checkinText }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.post_content;
  } catch (err) {
    console.warn('Gemini AI post generation failed, using localized prompt fallback.', err);
    return null;
  }
}

export interface LiveResumeTailorResponse {
  tailored_analysis?: string;
  ats_estimated_score?: number;
  tailored_bullets?: {
    original?: string;
    tailored?: string;
    text?: string;
    reason?: string;
    impact_score?: string;
  }[];
}

export async function tailorResumeWithAI(
  bullets: string[],
  targetJd: string
): Promise<LiveResumeTailorResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/ai/tailor-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bullets, target_jd: targetJd }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Gemini AI resume tailoring failed, using localized analysis fallback.', err);
    return null;
  }
}
// -----------------------------------------------------------------------------
// Onboarding & Knowledge Graph Parsing Endpoints
// -----------------------------------------------------------------------------
export async function parseResumeFile(file: File, targetRoles: string[] = []): Promise<any | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (targetRoles.length > 0) {
      formData.append('target_roles_str', targetRoles.join(', '));
    }

    const res = await fetch(`${API_BASE}/onboarding/parse-resume-file`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend resume file parsing failed.', err);
    return null;
  }
}

export async function parseResumeText(resumeText: string, targetRoles: string[] = []): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/onboarding/parse-resume-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resumeText, target_roles: targetRoles }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend resume text parsing failed.', err);
    return null;
  }
}

export async function commitOnboardingProfile(payload: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/onboarding/commit-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend profile commit failed.', err);
    return null;
  }
}
