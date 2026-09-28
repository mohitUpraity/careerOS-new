export interface ASTProofDetails {
  nodesVerified: number;
  complexityScore: string;
  benchmark: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  evidenceCount: number;
  lastUpdated: string;
  verifiedByAst: boolean;
  astProofHash?: string;
  astDetails?: ASTProofDetails;
  evidenceItems?: any[];
  marketDemandScore?: number;
}

export interface SkillsGraphData {
  nodes: SkillNode[];
  targetDiscipline: string;
  overallCoverage: number;
  unlockedOpportunitiesCount: number;
}

export const mockSkillsGraph: SkillsGraphData = {
  nodes: [
    {
      id: 'sk-1',
      name: 'Distributed Systems & Raft Consensus',
      category: 'Distributed Systems',
      proficiency: 96,
      evidenceCount: 5,
      lastUpdated: '1d ago',
      verifiedByAst: true,
      astProofHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      astDetails: {
        nodesVerified: 1420,
        complexityScore: 'O(log N) Leader Election',
        benchmark: '120k QPS @ 4.2ms P99'
      },
      marketDemandScore: 98
    },
    {
      id: 'sk-2',
      name: 'PyTorch & vLLM Inference Engine',
      category: 'AI & ML Infra',
      proficiency: 94,
      evidenceCount: 4,
      lastUpdated: '2d ago',
      verifiedByAst: true,
      astProofHash: 'sha256:4d607dc9703c152a42de1761d47348911043328e1834f895c104e768cb4ab9fb',
      astDetails: {
        nodesVerified: 980,
        complexityScore: 'CUDA Kernel Tuning',
        benchmark: '48% Latency Reduction'
      },
      marketDemandScore: 99
    },
    {
      id: 'sk-3',
      name: 'eBPF / XDP Network Telemetry',
      category: 'Networking & Security',
      proficiency: 92,
      evidenceCount: 3,
      lastUpdated: '3d ago',
      verifiedByAst: true,
      astProofHash: 'sha256:8899aabbccddeeff00112233445566778899aabbccddeeff0011223344556677',
      astDetails: {
        nodesVerified: 640,
        complexityScore: 'Kernel-space Packet Filter',
        benchmark: 'Zero Packet Drop @ 100Gbps'
      },
      marketDemandScore: 94
    },
    {
      id: 'sk-4',
      name: 'PostgreSQL & pgvector RAG Schema',
      category: 'Distributed Systems',
      proficiency: 95,
      evidenceCount: 4,
      lastUpdated: '4d ago',
      verifiedByAst: true,
      astProofHash: 'sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
      astDetails: {
        nodesVerified: 512,
        complexityScore: 'HNSW Index Optimization',
        benchmark: 'Sub-15ms Hybrid Search'
      },
      marketDemandScore: 96
    },
    {
      id: 'sk-5',
      name: 'Rust & Async Tokio Runtime',
      category: 'Low-Level & Hardware',
      proficiency: 91,
      evidenceCount: 3,
      lastUpdated: '5d ago',
      verifiedByAst: true,
      astProofHash: 'sha256:aa11bb22cc33dd44ee55ff6600778899aa11bb22cc33dd44ee55ff6600778899',
      astDetails: {
        nodesVerified: 1100,
        complexityScore: 'Lock-free Ring Buffer',
        benchmark: 'Memory Safe Zero-Copy'
      },
      marketDemandScore: 95
    }
  ],
  targetDiscipline: 'Software & AI Systems Engineering',
  overallCoverage: 94,
  unlockedOpportunitiesCount: 18,
};
