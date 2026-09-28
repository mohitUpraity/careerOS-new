export interface TranscriptTurn {
  id: string;
  speaker: 'INTERVIEWER' | 'CANDIDATE';
  speakerName: string;
  timestamp: string;
  content: string;
  chips?: { label: string; type: 'positive' | 'critical' | 'neutral' }[];
}

export interface CompetencyScore {
  name: string;
  score: number;
  color: string;
  standard: string;
}

export interface TelemetrySignal {
  title: string;
  message: string;
  type: 'info' | 'positive' | 'warning';
}

export interface QuestionStep {
  step: number;
  title: string;
  score: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
}

export interface InterviewSessionData {
  role: string;
  topic?: string;
  interviewerPersona?: string;
  interviewer: {
    name: string;
    title: string;
  };
  benchmarkStandard: string;
  timeElapsed: string;
  timeTotal: string;
  projectedScore: number | string;
  projectedOutcome: string;
  competencies: CompetencyScore[];
  telemetrySignals: TelemetrySignal[];
  questionStepper: QuestionStep[];
  transcript: TranscriptTurn[];
}

export const mockInterviewSession: InterviewSessionData = {
  role: 'AI / Software Systems Engineer',
  topic: 'Real-time Distributed Systems & AI Inference Pipeline',
  interviewerPersona: 'Staff AI Systems Architect',
  interviewer: {
    name: 'AI Evaluator',
    title: 'Staff AI Systems Architect',
  },
  benchmarkStandard: 'Evaluation Standard: Production Architecture & Rigor',
  timeElapsed: '00:00',
  timeTotal: '45:00',
  projectedScore: '--',
  projectedOutcome: 'Calibrating initial candidate baseline upon first response.',
  competencies: [
    { name: 'System Architecture & Rigor', score: 0, color: 'bg-blue-600', standard: 'Production SLA Standard' },
    { name: 'Algorithmic Complexity', score: 0, color: 'bg-indigo-600', standard: 'Time/Space Optimization' },
    { name: 'Concurrency & Resilience', score: 0, color: 'bg-purple-600', standard: 'Fault-tolerant Protocols' },
    { name: 'Tradeoff Communication', score: 0, color: 'bg-emerald-600', standard: 'Clear Engineering Rationale' },
  ],
  telemetrySignals: [
    {
      title: 'Real-time Speech & Code Active',
      message: 'Microphone and code editor telemetry ready. Speak or submit code to receive instant rubric scoring.',
      type: 'info',
    },
  ],
  questionStepper: [
    { step: 1, title: 'Architecture Scope & Functional Requirements', score: 'PENDING', status: 'IN_PROGRESS' },
    { step: 2, title: 'Data Flow & Storage Layer Design', score: '--', status: 'UPCOMING' },
    { step: 3, title: 'Bottlenecks, Failure Modes & KV Scaling', score: '--', status: 'UPCOMING' },
  ],
  transcript: [
    {
      id: 'tr_init',
      speaker: 'INTERVIEWER',
      speakerName: 'AI Evaluator (Staff Architect)',
      timestamp: '00:00',
      content: 'Welcome to the CareerOS AI Interview Arena. When you are ready, state your architectural approach or click Start Live Round.',
      chips: [{ label: 'Ready for Prompt', type: 'neutral' }],
    },
  ],
};
