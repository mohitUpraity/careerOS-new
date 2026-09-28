export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  targetTrack: string;
  phase: string;
  readinessScore: number;
  readinessTarget: number;
  readinessGrowthThisWeek: string;
  status: string;
}

export interface NextBestAction {
  id: string;
  title: string;
  description: string;
  impactTag: string;
  estimatedTime: string;
  steps: { id: number; label: string; status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING' }[];
  primaryActionLabel: string;
  primaryActionUrl: string;
}

export interface TimelineTask {
  id: string;
  time: string;
  title: string;
  category: string;
  categoryColor: string;
  duration: string;
  goalReference: string;
  actionType: string;
}

export interface RecommendedOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  salaryOrStipend: string;
  deadline: string;
  tags: string[];
  isVerified: boolean;
  status: string;
}

export interface QuickStat {
  label: string;
  value: string;
  change: string;
  subtext: string;
}

export const defaultQuickStats: QuickStat[] = [
  { label: 'Active Applications', value: '0', change: '+0 this wk', subtext: 'In Pipeline' },
  { label: 'Verified Proofs', value: '0', change: '0 AST verified', subtext: 'Knowledge Graph' },
  { label: 'Opportunity Matches', value: '0', change: 'Live market', subtext: 'Calibrated fit' },
  { label: 'Simulation Readiness', value: '0%', change: 'AI Arena', subtext: 'Target 90%' },
];
