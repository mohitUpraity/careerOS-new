export interface ResumeChange {
  id: string;
  section: string;
  originalText: string;
  proposedText: string;
  reason: string;
  evidenceSource: string;
  evidenceId: string;
  impactScore: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface ResumeSection {
  title: string;
  items: {
    heading: string;
    subheading?: string;
    date?: string;
    bullets: { id: string; text: string; isModified?: boolean }[];
  }[];
}

export const mockTargetJD = {
  role: 'AI Infrastructure Engineer (L5/L6)',
  company: 'Google Cloud Systems',
  atsMatchScore: 94,
  matchedKeywords: ['Distributed Systems', 'vLLM', 'Triton', 'C++', 'KV Cache', 'PagedAttention', 'NVLink'],
  missingKeywords: ['Multi-GPU Straggler Mitigation', 'NCCL Collectives Tuning'],
};

export const mockResumeData: ResumeSection[] = [
  {
    title: 'Executive Summary',
    items: [
      {
        heading: 'AI Infrastructure & High-Performance Systems Engineer',
        bullets: [
          {
            id: 'sum_01',
            text: 'AI Systems Engineer specializing in low-latency distributed LLM inference, Triton kernel optimization, and high-throughput network packet telemetry. Proven track record scaling serving pipelines across 8x H100 clusters and engineering mission-critical defensive architectures.',
            isModified: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Work Experience & Core Projects',
    items: [
      {
        heading: 'IntelliGuard Next-Gen Firewall (NGFW) & Defense Telemetry Pipeline',
        subheading: 'DRDO Defense Innovation Lab • Lead Systems Architect',
        date: '2024 – Present',
        bullets: [
          {
            id: 'exp_01',
            text: 'Architected high-throughput multi-threaded packet inspection pipeline handling 2.4M PPS with zero memory leaks across 27 distributed remote checkpoints.',
            isModified: false,
          },
          {
            id: 'exp_02',
            text: 'Eliminated ml_queue metadata serialization bottlenecks by implementing zero-copy shared memory queues, reducing p99 latency from 18ms to 2.1ms under peak synthetic load.',
            isModified: true,
          },
          {
            id: 'exp_03',
            text: 'Integrated dynamic Linux iptables enforcement bridge with deterministic connection tracking and kernel-level dropping mechanisms.',
            isModified: false,
          },
        ],
      },
      {
        heading: 'Distributed LLM Serving & Speculative Decoding Engine',
        subheading: 'Open-Source AI Systems / vLLM Contributor',
        date: '2025 – 2026',
        bullets: [
          {
            id: 'exp_04',
            text: 'Developed custom Triton kernels for non-contiguous PagedAttention memory allocation, achieving 94% cache locality on 100k token context windows.',
            isModified: true,
          },
          {
            id: 'exp_05',
            text: 'Optimized speculative decoding draft model verification pipeline across 8x H100 GPUs over 900 GB/s NVLink mesh, boosting token throughput by +42%.',
            isModified: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Core Technical Competencies',
    items: [
      {
        heading: 'Systems & Infrastructure',
        bullets: [
          {
            id: 'sk_01',
            text: 'Languages & Frameworks: C++20, Python, CUDA, Triton, PyTorch Internals, FastAPI, Docker, Linux Kernel / eBPF.',
          },
          {
            id: 'sk_02',
            text: 'Distributed Architectures: Tensor Parallelism, Pipeline Parallelism, PagedAttention, NVLink Mesh, vLLM, DeepSpeed.',
          },
        ],
      },
    ],
  },
];

export const mockProposedChanges: ResumeChange[] = [
  {
    id: 'chg_01',
    section: 'Work Experience (vLLM Project)',
    originalText: 'Wrote GPU memory code for large language model inference.',
    proposedText:
      'Developed custom Triton kernels for non-contiguous PagedAttention memory allocation, achieving 94% cache locality on 100k token context windows.',
    reason: 'Explicitly matches Google L6 JD requirement for Triton kernel optimization & memory budgeting.',
    evidenceSource: 'GitHub PR #4120 & Triton Benchmark Suite',
    evidenceId: 'ev_triton_01',
    impactScore: '+8% ATS Match Boost',
    status: 'ACCEPTED',
  },
  {
    id: 'chg_02',
    section: 'Work Experience (DRDO Project)',
    originalText: 'Optimized queue communication and fixed bugs in firewall.',
    proposedText:
      'Eliminated ml_queue metadata serialization bottlenecks by implementing zero-copy shared memory queues, reducing p99 latency from 18ms to 2.1ms under peak synthetic load.',
    reason: 'Demonstrates low-latency systems mastery and production telemetry metrics.',
    evidenceSource: 'DRDO NGFW Readiness Benchmark',
    evidenceId: 'ev_drdo_01',
    impactScore: '+6% ATS Match Boost',
    status: 'ACCEPTED',
  },
  {
    id: 'chg_03',
    section: 'Executive Summary',
    originalText: 'Software engineer looking for AI roles.',
    proposedText:
      'AI Systems Engineer specializing in low-latency distributed LLM inference, Triton kernel optimization, and high-throughput network packet telemetry. Proven track record scaling serving pipelines across 8x H100 clusters.',
    reason: 'Aligns headline directly with Google Cloud AI Infrastructure team keywords.',
    evidenceSource: 'CareerOS Goal & Skills Profile',
    evidenceId: 'ev_profile_01',
    impactScore: '+11% ATS Match Boost',
    status: 'ACCEPTED',
  },
];
