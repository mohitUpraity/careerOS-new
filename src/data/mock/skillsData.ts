export interface SkillNode {
  id: string;
  name: string;
  category: 'Distributed Systems' | 'Low-Level & Hardware' | 'AI & ML Infra' | 'Networking & Security';
  level: 'Staff / Expert' | 'Senior' | 'Proficient';
  evidenceCount: number;
  marketDemandScore: number;
  evidenceItems: {
    id: string;
    title: string;
    type: 'GITHUB_PR' | 'DEFENSE_BENCHMARK' | 'RFC_SPEC' | 'RESEARCH_PAPER';
    provenance: string;
    verifiedDate: string;
    metric: string;
  }[];
}

export const mockSkillsGraph: SkillNode[] = [
  {
    id: 'sk_dist_01',
    name: 'Distributed LLM Inference & vLLM',
    category: 'Distributed Systems',
    level: 'Staff / Expert',
    evidenceCount: 3,
    marketDemandScore: 98,
    evidenceItems: [
      {
        id: 'ev_101',
        title: 'PagedAttention Triton Kernel Optimization',
        type: 'GITHUB_PR',
        provenance: 'vLLM GitHub Repository (PR #4120)',
        verifiedDate: 'Aug 2026',
        metric: '94% cache locality on 100k context',
      },
      {
        id: 'ev_102',
        title: 'Speculative Decoding 8x H100 Cluster Verification',
        type: 'DEFENSE_BENCHMARK',
        provenance: 'Production Smoke Benchmark Suite',
        verifiedDate: 'Sep 2026',
        metric: '+42% token throughput speedup',
      },
    ],
  },
  {
    id: 'sk_low_02',
    name: 'C++ Systems & Shared Memory IPC',
    category: 'Low-Level & Hardware',
    level: 'Staff / Expert',
    evidenceCount: 4,
    marketDemandScore: 94,
    evidenceItems: [
      {
        id: 'ev_103',
        title: 'DRDO IntelliGuard NGFW 2.4M PPS Pipeline',
        type: 'DEFENSE_BENCHMARK',
        provenance: 'DRDO Demonstration Readiness Report',
        verifiedDate: 'May 2026',
        metric: '2.1ms p99 latency under peak load',
      },
      {
        id: 'ev_104',
        title: 'Dynamic Linux iptables Enforcement Bridge',
        type: 'RFC_SPEC',
        provenance: 'IntelliGuard Active Enforcement Blueprint',
        verifiedDate: 'May 2026',
        metric: 'Zero-drop packet inspection',
      },
    ],
  },
  {
    id: 'sk_ml_03',
    name: 'Triton & CUDA GPU Kernels',
    category: 'AI & ML Infra',
    level: 'Senior',
    evidenceCount: 2,
    marketDemandScore: 96,
    evidenceItems: [
      {
        id: 'ev_105',
        title: 'Custom Triton Fused Attention Kernels',
        type: 'GITHUB_PR',
        provenance: 'Open-Source Kernel Benchmarks',
        verifiedDate: 'Jul 2026',
        metric: '1.38x memory bandwidth efficiency',
      },
    ],
  },
  {
    id: 'sk_net_04',
    name: 'High-Throughput Packet Telemetry & eBPF',
    category: 'Networking & Security',
    level: 'Senior',
    evidenceCount: 3,
    marketDemandScore: 90,
    evidenceItems: [
      {
        id: 'ev_106',
        title: 'Multi-Threaded Queue Payload Architecture',
        type: 'DEFENSE_BENCHMARK',
        provenance: 'IntelliGuard Pipeline Checkpoints',
        verifiedDate: 'May 2026',
        metric: '27 remote synchronized checkpoints',
      },
    ],
  },
];
