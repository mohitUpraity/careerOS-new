/**
 * CareerOS API Client Bridge
 * Fully typed, authenticated HTTP connector communicating with FastAPI backend
 * (http://127.0.0.1:8000/api/v1) and Supabase PostgreSQL with Firebase Bearer Auth.
 */

import { auth } from '@/lib/firebase';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('[API Client] Auth token extraction deferred:', err);
  }
  return headers;
}

export interface UserProfileData {
  id: string;
  name: string;
  headline: string;
  location: string;
  email: string;
  phone?: string;
  portfolio?: string;
  github: string;
  linkedin: string;
  leetcode_handle?: string;
  manifesto: string;
  persona_summary?: string;
  target_roles: string[];
  profile_completeness: number;
  overall_readiness: number;
  onboarding_completed?: boolean;
  currency?: string;
  min_salary?: number;
  target_tc?: number;
  seniority_level?: string;
  discipline?: string;
  modalities?: string[];
  relocation_open?: boolean;
  years_of_experience?: number;
  experiences?: any[];
  education?: any[];
  projects?: any[];
  skills?: any[];
  evidence_items?: any[];
  created_at?: string;
  updated_at?: string;
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

export interface GoldenResumeData {
  id: string;
  user_id: string;
  title: string;
  is_baseline: boolean;
  raw_text?: string;
  content_json: {
    header?: {
      name?: string;
      headline?: string;
      email?: string;
      phone?: string;
      location?: string;
      github?: string;
      linkedin?: string;
      portfolio?: string;
    };
    summary?: string;
    skills?: any[];
    experiences?: any[];
    projects?: any[];
    education?: any[];
    evidence_items?: any[];
  };
  pdf_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  category?: string;
  weight?: number;
  properties?: Record<string, any>;
  vector_reference?: {
    embedding_model?: string;
    source_doc?: string;
    chunk_index?: number;
    chunk_excerpt?: string;
    similarity_score?: number;
  };
  [key: string]: any;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  weight?: number;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metrics: {
    nodes_count: number;
    edges_count: number;
    skills_count: number;
    evidence_count: number;
    verified_evidence_count: number;
    readiness_score: number;
    evidence_coverage_ratio: number;
    core_pillars: string[];
    top_central_skills: string[];
  };
  skill_clusters: Record<string, string[]>;
}

export type LiveKnowledgeGraph = KnowledgeGraphData;
export type LiveGraphNode = GraphNode;
export type LiveGraphEdge = GraphEdge;

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

export interface DocumentChunk {
  id: string;
  user_id: string;
  doc_type: string;
  source_title: string;
  chunk_index: number;
  chunk_text: string;
  metadata_json: Record<string, any>;
  created_at?: string;
}

// -----------------------------------------------------------------------------
// 1. Profile & Settings Endpoints
// -----------------------------------------------------------------------------
export async function fetchProfile(): Promise<UserProfileData | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/profile`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Profile fetch failed:', err);
    return null;
  }
}

export async function updateProfile(data: Partial<UserProfileData>): Promise<UserProfileData | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Profile update failed:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 2. Golden Resume & Ingestion Pipeline
// -----------------------------------------------------------------------------
export async function parseResumeFile(file: File, targetRoles: string[] = []): Promise<any | null> {
  try {
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : '';
    const formData = new FormData();
    formData.append('file', file);
    if (targetRoles.length > 0) {
      formData.append('target_roles_str', targetRoles.join(', '));
    }

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/resume/parse-file`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Resume file parsing failed:', err);
    return null;
  }
}

export async function parseResumeText(resumeText: string, targetRoles: string[] = []): Promise<any | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/resume/parse-text`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ resume_text: resumeText, target_roles: targetRoles }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Resume text parsing failed:', err);
    return null;
  }
}

export async function fetchGoldenResume(): Promise<GoldenResumeData | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/resume/golden`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Golden Resume fetch failed:', err);
    return null;
  }
}

export async function commitGoldenResume(payload: any): Promise<any | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/resume/commit-golden`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Golden Resume commit failed:', err);
    return null;
  }
}

export async function tailorResumeWithAI(
  targetJd: string,
  targetRole?: string,
  customInstructions?: string
): Promise<any | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/resume/tailor`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        target_jd: targetJd,
        target_role: targetRole,
        custom_instructions: customInstructions,
      }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] AI resume tailoring failed:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 3. Knowledge Graph Engine
// -----------------------------------------------------------------------------
export async function fetchKnowledgeGraph(): Promise<KnowledgeGraphData | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/knowledge-graph`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Knowledge Graph fetch failed:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 4. RAG & Vector Retrieval Endpoints
// -----------------------------------------------------------------------------
export async function ingestRAGDocument(
  docType: string,
  sourceTitle: string,
  content: string,
  metadata: Record<string, any> = {}
): Promise<DocumentChunk[] | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/rag/ingest`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        doc_type: docType,
        source_title: sourceTitle,
        content,
        metadata,
      }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] RAG ingestion failed:', err);
    return null;
  }
}

export async function searchRAG(query: string, topK: number = 5, docType?: string): Promise<any | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/rag/search`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, top_k: topK, doc_type: docType }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] RAG search failed:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 5. Opportunities & Applications Endpoints
// -----------------------------------------------------------------------------
export async function fetchOpportunities(params?: {
  category?: string;
  search?: string;
  minMatchScore?: number;
}): Promise<LiveOpportunity[] | null> {
  try {
    const headers = await getAuthHeaders();
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.minMatchScore) query.append('min_match_score', params.minMatchScore.toString());

    const url = `${API_BASE}/opportunities?${query.toString()}`;
    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn('[API Client] Opportunities fetch failed:', err);
    return null;
  }
}

export async function fetchApplications(stage?: string): Promise<LiveApplication[] | null> {
  try {
    const headers = await getAuthHeaders();
    const query = stage && stage !== 'ALL' ? `?stage=${stage}` : '';
    const res = await fetch(`${API_BASE}/applications${query}`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn('[API Client] Applications fetch failed:', err);
    return null;
  }
}

export async function createApplication(payload: Partial<LiveApplication>): Promise<LiveApplication | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Create application failed:', err);
    return null;
  }
}

export async function updateApplication(id: string, payload: Partial<LiveApplication>): Promise<LiveApplication | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Update application failed:', err);
    return null;
  }
}

export async function deleteApplication(id: string): Promise<boolean> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'DELETE',
      headers,
    });
    return res.ok;
  } catch (err) {
    console.warn('[API Client] Delete application failed:', err);
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
    const headers = await getAuthHeaders();
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'ALL') query.append('status', params.status);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/hackathons?${query.toString()}`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn('[API Client] Hackathons fetch failed:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 6. Skills & Evidence Graph Endpoints
// -----------------------------------------------------------------------------
export async function fetchSkillGraph(): Promise<LiveSkillGraph | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/skills/graph`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Skills graph fetch failed:', err);
    return null;
  }
}

export async function addEvidence(payload: Partial<LiveEvidence>): Promise<LiveEvidence | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/skills/evidence`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Add evidence failed:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 7. Dashboard & AI Post Helpers
// -----------------------------------------------------------------------------
export async function fetchDashboardOverview(): Promise<any | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/dashboard/overview`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Dashboard overview fetch failed:', err);
    return null;
  }
}

export async function generateAIPost(checkinText: string): Promise<string | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/ai/generate-post`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ checkin_text: checkinText }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.post_content;
  } catch (err) {
    console.warn('[API Client] AI post generation failed:', err);
    return null;
  }
}
