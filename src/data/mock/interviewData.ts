export interface TranscriptEntry {
  id: string;
  speaker: 'AI' | 'CANDIDATE';
  speakerName: string;
  timestamp: string;
  content: string;
  chips?: { label: string; type: 'positive' | 'warning' | 'info' }[];
}

export const mockInterviewSession = {
  id: 'sess_google_l6_01',
  role: 'Google Senior AI Engineer (L5/L6)',
  topic: 'Distributed Training & Inference Architecture (LLMs & Megatron-LM/vLLM)',
  interviewer: {
    name: 'Dr. Sarah Lin',
    title: 'Principal Infrastructure AI Evaluator',
    affiliation: 'Synthetic Google Cloud Systems Agent',
    sttEngine: 'Deepgram Nova-2 STT (99.4% Precision)',
  },
  timeElapsed: '24:18',
  timeTotal: '45:00',
  benchmarkStandard: 'Staff L6 Standard',
  projectedScore: 89,
  projectedOutcome: 'STRONG HIRE (Top 4% L6 Benchmark)',
  competencies: [
    { name: 'Distributed Systems Scalability', score: 88, standard: 'Exceeds L5 standard', color: 'bg-primary' },
    { name: 'Latency & Hardware Tradeoffs', score: 92, standard: 'Staff level mastery', color: 'bg-emerald-600' },
    { name: 'Fault Tolerance & Degradation', score: 74, standard: 'Needs clarification on node crash', color: 'bg-amber-600' },
    { name: 'Technical Depth & RFC Framing', score: 91, standard: 'Structured RFC style', color: 'bg-primary' },
  ],
  telemetrySignals: [
    {
      type: 'warning',
      title: 'Critical Gap Detected',
      message: 'Memory bandwidth bottleneck unaddressed for sequence lengths >64k during draft verification.',
    },
    {
      type: 'info',
      title: 'Experience Match',
      message: 'Correlates with DRDO high-throughput packet pipeline on your verified profile (+6% signal).',
    },
    {
      type: 'positive',
      title: 'Production Standard Met',
      message: 'Validated: vLLM PagedAttention tensor allocation satisfies Google production bar.',
    },
  ],
  questionStepper: [
    { step: 1, title: 'System Context & Traffic Volumetrics', status: 'COMPLETED', score: '94%' },
    { step: 2, title: 'Model Parallelism (Tensor vs Pipeline)', status: 'COMPLETED', score: '91%' },
    { step: 3, title: 'KV Cache Memory & Throughput Optimization', status: 'IN_PROGRESS', score: 'Active' },
    { step: 4, title: 'Network Straggler Mitigation & NCCL Tuning', status: 'UPCOMING', score: '—' },
  ],
  transcript: [
    {
      id: 'tr_01',
      speaker: 'AI' as const,
      speakerName: 'Dr. Sarah Lin (Synthetic Evaluator)',
      timestamp: '18:40',
      content:
        'Let’s drill into your KV-cache memory management strategy for a 100k context window across an 8x H100 cluster. How do you prevent fragmented page allocation and avoid NVLink synchronization bottlenecks during burst speculative decoding?',
    },
    {
      id: 'tr_02',
      speaker: 'CANDIDATE' as const,
      speakerName: 'Mohit Upraity (Candidate)',
      timestamp: '19:15',
      content:
        'We implement PagedAttention with non-contiguous virtual memory block allocation mapped to physical VRAM blocks of 64 tokens. To eliminate NVLink broadcast contention during speculative draft model verification, we decouple the prefill and decode stages onto separate GPU worker pools, allowing asynchronous draft verification over local HBM3e cache without stalling the tensor parallel ring.',
      chips: [
        { label: '+Strong Concept: PagedAttention', type: 'positive' as const },
        { label: '+Cache Locality 94%', type: 'positive' as const },
        { label: 'Attention: Watch Draft Sync Latency', type: 'warning' as const },
      ],
    },
    {
      id: 'tr_03',
      speaker: 'AI' as const,
      speakerName: 'Dr. Sarah Lin (Synthetic Evaluator)',
      timestamp: '21:05',
      content:
        'Excellent articulation of prefill/decode disaggregation. If one worker node experiences a 40ms straggler jitter due to thermal throttling, how does your coordinator ensure p99 SLOs remain under 200ms?',
    },
  ],
};
