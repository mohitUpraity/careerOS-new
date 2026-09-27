export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetRole: string;
  targetTrack: string;
  phase: string;
  readinessScore: number;
  readinessTarget: number;
  readinessGrowthThisWeek: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
}

export interface NextBestAction {
  id: string;
  title: string;
  description: string;
  impactTag: string;
  estimatedTime: string;
  steps: {
    id: number;
    label: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  }[];
  primaryActionLabel: string;
  primaryActionUrl?: string;
}

export interface TimelineTask {
  id: string;
  time: string;
  title: string;
  category: 'Learning' | 'Evidence / Project' | 'Application' | 'Networking' | 'Interview';
  categoryColor: string;
  duration: string;
  goalReference: string;
  actionType: 'resume' | 'start' | 'review' | 'submit';
  isCompleted?: boolean;
}

export interface RecommendedOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-Time' | 'Internship' | 'Contract';
  matchScore: number;
  salaryOrStipend: string;
  deadline: string;
  tags: string[];
  isVerified?: boolean;
  status?: 'NEW' | 'SAVED' | 'APPLIED';
}

export interface OpportunityItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Jobs' | 'Internships' | 'Hackathons' | 'Research' | 'Scholarships';
  matchScore: number;
  fitVerdict: string;
  deadline: string;
  salary: string;
  verifiedEvidenceCount: number;
  requiredSkills: { name: string; matched: boolean }[];
  description: string;
  keyResponsibilities: string[];
  benefits: string[];
  applyUrl: string;
}

export interface ApplicationItem {
  id: string;
  company: string;
  role: string;
  stage: 'SAVED' | 'APPLIED' | 'SCREENING' | 'INTERVIEW_LOOP' | 'OFFER_RECEIVED' | 'REJECTED';
  matchScore: number;
  appliedDate: string;
  lastActivity: string;
  salaryRange: string;
  location: string;
  nextAction: string;
  nextActionDate: string;
}

export interface InterviewSession {
  id: string;
  targetRole: string;
  company: string;
  roundTitle: string;
  topic: string;
  durationMinutes: number;
  level: string;
  interviewerName: string;
  interviewerRole: string;
  overallScore?: number;
  outcomeVerdict?: 'STRONG_HIRE' | 'HIRE' | 'LEANING_HIRE' | 'NO_HIRE';
  transcript: {
    speaker: 'AI' | 'CANDIDATE';
    timestamp: string;
    text: string;
    chips?: { label: string; type: 'positive' | 'warning' | 'info' }[];
  }[];
  rubric: {
    competency: string;
    score: number;
    benchmarkLevel: string;
    feedback: string;
  }[];
}

export interface OfferItem {
  id: string;
  company: string;
  role: string;
  status: 'LEADING' | 'COMPETING' | 'EXPLORING';
  decisionDeadline: string;
  baseSalary: number;
  equityTotal: number;
  equityVestingSchedule: string;
  signOnBonus: number;
  annualBonusPercent: number;
  annualBonusAmount: number;
  year1TotalComp: number;
  fourYearTotalComp: number;
  percentileRank: number;
}
