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
