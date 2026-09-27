import { UserProfile, NextBestAction, TimelineTask, RecommendedOpportunity } from '@/types';

export const mockUserProfile: UserProfile = {
  id: 'usr_mohit_01',
  name: 'Mohit Upraity',
  email: 'mohit@example.com',
  targetRole: 'AI Engineer',
  targetTrack: 'Distributed Systems & Inference',
  phase: 'Phase 3: Production Readiness',
  readinessScore: 72,
  readinessTarget: 85,
  readinessGrowthThisWeek: '+4% this wk',
  status: 'ONLINE',
};

export const mockNextBestAction: NextBestAction = {
  id: 'act_deploy_01',
  title: 'Deploy CareerOS with Docker & Vector DB on Cloud',
  description:
    'Directly satisfies production deployment criteria for 8 of your target AI Engineer roles (Google, Microsoft, Meta FAIR). Closes your current single-highest blocker: containerized AI inference.',
  impactTag: 'Impact: +14% Match Boost on 5 Saved Roles',
  estimatedTime: 'Est. 45 mins',
  steps: [
    { id: 1, label: 'Containerize FastAPI App', status: 'COMPLETED' },
    { id: 2, label: 'Multi-stage Dockerfile Setup', status: 'IN_PROGRESS' },
    { id: 3, label: 'Cloud Run Deployment Smoke Test', status: 'UPCOMING' },
  ],
  primaryActionLabel: 'Start Deployment Now',
  primaryActionUrl: '/skills-and-evidence',
};

export const mockTodayTimeline: TimelineTask[] = [
  {
    id: 'task_01',
    time: '09:30 AM',
    title: 'Complete RAG Evaluation & Faithfulness Benchmarks',
    category: 'Learning',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    duration: '45 mins',
    goalReference: 'Goal: Master RAG Pipeline',
    actionType: 'resume',
  },
  {
    id: 'task_02',
    time: '11:30 AM',
    title: 'Deploy CareerOS Docker Container to Cloud Run',
    category: 'Evidence / Project',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    duration: '1h 00m',
    goalReference: 'Next Best Action Step 2',
    actionType: 'start',
  },
  {
    id: 'task_03',
    time: '02:00 PM',
    title: 'Submit Tailored Resume for Google AI Infrastructure Role',
    category: 'Application',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    duration: '20 mins',
    goalReference: 'Match Fit: 94% (High Priority)',
    actionType: 'submit',
  },
  {
    id: 'task_04',
    time: '04:30 PM',
    title: 'Live System Design Mock in AI Interview Arena',
    category: 'Interview',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    duration: '45 mins',
    goalReference: 'Distributed Inference & KV Cache',
    actionType: 'start',
  },
];

export const mockRadarOpportunities: RecommendedOpportunity[] = [
  {
    id: 'opp_google_01',
    title: 'AI Infrastructure Engineer (L5/L6)',
    company: 'Google',
    location: 'Mountain View, CA / Remote',
    type: 'Full-Time',
    matchScore: 94,
    salaryOrStipend: '$245k – $280k + Equity',
    deadline: 'Closing in 3 days',
    tags: ['Distributed Systems', 'vLLM', 'Triton', 'C++'],
    isVerified: true,
    status: 'NEW',
  },
  {
    id: 'opp_anthropic_02',
    title: 'ML Platform & Serving Engineer',
    company: 'Anthropic',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    matchScore: 91,
    salaryOrStipend: '$260k – $310k + Equity',
    deadline: 'Active Ingestion',
    tags: ['Model Parallelism', 'FastAPI', 'Kubernetes'],
    isVerified: true,
    status: 'SAVED',
  },
  {
    id: 'opp_meta_03',
    title: 'Research Systems Engineer (FAIR)',
    company: 'Meta',
    location: 'Menlo Park, CA / Remote',
    type: 'Full-Time',
    matchScore: 88,
    salaryOrStipend: '$230k – $275k + RSU',
    deadline: 'Closing in 7 days',
    tags: ['PyTorch Internals', 'CUDA', 'NCCL'],
    isVerified: false,
    status: 'NEW',
  },
];

export const mockQuickStats = [
  { label: 'Active Pipeline', value: '12', subtext: '3 in Final Rounds', change: '+2 this week', isPositive: true },
  { label: 'Verified Evidence', value: '18', subtext: '4 Benchmarks', change: '+1 pending audit', isPositive: true },
  { label: 'Skill Match Index', value: '92%', subtext: 'L6 Infrastructure', change: '+5% vs baseline', isPositive: true },
  { label: 'Avg Interview Score', value: '89', subtext: 'Top 4% Standard', change: '+6 pts over 30d', isPositive: true },
];
