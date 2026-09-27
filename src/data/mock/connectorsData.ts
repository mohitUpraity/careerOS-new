export interface EvidenceConnector {
  id: string;
  name: string;
  provider: 'github' | 'leetcode' | 'linkedin' | 'huggingface' | 'kaggle' | 'medium' | 'codeforces';
  category: 'Code & Repositories' | 'Competitive Programming' | 'Professional Network' | 'AI Models & Datasets' | 'Publications & Writing';
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSyncedAt: string;
  accountHandle: string;
  avatarUrl: string;
  metrics: {
    label: string;
    value: string | number;
  }[];
  extractedEvidenceCount: number;
  syncFrequency: 'Real-time Webhook' | 'Every 6 Hours' | 'Daily' | 'Manual';
  description: string;
}

export interface ExtractedEvidenceItem {
  id: string;
  connectorId: string;
  provider: string;
  title: string;
  sourceUrl: string;
  extractedAt: string;
  skillsAssociated: string[];
  proofSnippet: string;
  metric: string;
  verificationScore: number; // e.g., 98%
  status: 'pending_review' | 'verified_in_graph' | 'dismissed';
}

export interface IngestionLog {
  id: string;
  timestamp: string;
  provider: string;
  action: string;
  itemsProcessed: number;
  status: 'success' | 'warning' | 'in_progress';
  message: string;
}

export const mockConnectors: EvidenceConnector[] = [
  {
    id: 'conn_github',
    name: 'GitHub',
    provider: 'github',
    category: 'Code & Repositories',
    status: 'connected',
    lastSyncedAt: '3 mins ago',
    accountHandle: '@mohitupraity',
    avatarUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Repositories Indexed', value: 34 },
      { label: 'Merged PRs Analyzed', value: 128 },
      { label: 'Total Stars', value: '4.2k' },
      { label: 'Verified Code Proofs', value: 42 },
    ],
    extractedEvidenceCount: 42,
    syncFrequency: 'Real-time Webhook',
    description: 'Auto-ingests commit provenance, PR review discussions, benchmark scripts, and production firewalls.',
  },
  {
    id: 'conn_leetcode',
    name: 'LeetCode',
    provider: 'leetcode',
    category: 'Competitive Programming',
    status: 'connected',
    lastSyncedAt: '12 mins ago',
    accountHandle: 'mohit_algo_dev',
    avatarUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Solved Problems', value: 742 },
      { label: 'Hard / Med Solved', value: '184 / 412' },
      { label: 'Contest Rating', value: 2140 },
      { label: 'Global Ranking', value: 'Top 1.2%' },
    ],
    extractedEvidenceCount: 18,
    syncFrequency: 'Every 6 Hours',
    description: 'Syncs algorithm problem solutions, memory/runtime percentile proofs, and contest ranks.',
  },
  {
    id: 'conn_linkedin',
    name: 'LinkedIn',
    provider: 'linkedin',
    category: 'Professional Network',
    status: 'connected',
    lastSyncedAt: '1 hour ago',
    accountHandle: 'in/mohitupraity',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Technical Posts Ingested', value: 16 },
      { label: 'Post Impressions', value: '142k' },
      { label: 'Peer Endorsements', value: 38 },
      { label: 'Network Reach', value: '5,400+' },
    ],
    extractedEvidenceCount: 12,
    syncFrequency: 'Daily',
    description: 'Extracts published engineering case studies, architecture diagrams, and leadership milestones.',
  },
  {
    id: 'conn_huggingface',
    name: 'Hugging Face',
    provider: 'huggingface',
    category: 'AI Models & Datasets',
    status: 'connected',
    lastSyncedAt: '2 hours ago',
    accountHandle: 'mohit-ai-lab',
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Models Published', value: 6 },
      { label: 'Total Downloads', value: '89.4k' },
      { label: 'Dataset Benchmarks', value: 3 },
      { label: 'Model Stars', value: 520 },
    ],
    extractedEvidenceCount: 8,
    syncFrequency: 'Daily',
    description: 'Tracks open-weights fine-tunes, quantizations (AWQ/FP8), and vLLM serving configs.',
  },
  {
    id: 'conn_kaggle',
    name: 'Kaggle',
    provider: 'kaggle',
    category: 'AI Models & Datasets',
    status: 'connected',
    lastSyncedAt: 'Yesterday',
    accountHandle: 'mohit_kaggle_master',
    avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Competition Tier', value: 'Grandmaster' },
      { label: 'Gold Medals', value: 2 },
      { label: 'Silver Medals', value: 5 },
      { label: 'Top Kernel Views', value: '45k' },
    ],
    extractedEvidenceCount: 7,
    syncFrequency: 'Daily',
    description: 'Captures Kaggle competition write-ups, CV/NLP pipelines, and validated ensemble models.',
  },
  {
    id: 'conn_medium',
    name: 'Medium & Substack',
    provider: 'medium',
    category: 'Publications & Writing',
    status: 'connected',
    lastSyncedAt: '3 hours ago',
    accountHandle: '@mohit.systems',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Published Deep Dives', value: 9 },
      { label: 'Technical Reads', value: '38k' },
      { label: 'Average Read Time', value: '8.4 min' },
      { label: 'Citations', value: 14 },
    ],
    extractedEvidenceCount: 9,
    syncFrequency: 'Daily',
    description: 'Ingests architectural deep dives into eBPF packet processing, Raft consensus, and Triton GPU kernels.',
  },
  {
    id: 'conn_codeforces',
    name: 'Codeforces',
    provider: 'codeforces',
    category: 'Competitive Programming',
    status: 'disconnected',
    lastSyncedAt: 'Never',
    accountHandle: 'Not Connected',
    avatarUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Max Rating', value: '—' },
      { label: 'Rank Title', value: 'Candidate Master' },
      { label: 'Contests Participated', value: '—' },
      { label: 'Extracted Proofs', value: 0 },
    ],
    extractedEvidenceCount: 0,
    syncFrequency: 'Manual',
    description: 'Syncs competitive programming contest solves, graph theory implementations, and mathematical proofs.',
  },
];

export const mockExtractedEvidence: ExtractedEvidenceItem[] = [
  {
    id: 'ext_1',
    connectorId: 'conn_github',
    provider: 'GitHub',
    title: 'IntelliGuard NGFW: Zero-Copy eBPF Packet Filtering Pipeline',
    sourceUrl: 'https://github.com/mohitupraity/intelliguard-ngfw/commit/9f84bc12',
    extractedAt: '15 mins ago',
    skillsAssociated: ['eBPF', 'C/C++', 'Linux Kernel', 'Packet Processing'],
    proofSnippet: 'Implemented XDP hardware offload ring buffer achieving 4.8M packets/sec sustained throughput at <120ns latency.',
    metric: '4.8M pps throughput / 120ns latency',
    verificationScore: 99,
    status: 'verified_in_graph',
  },
  {
    id: 'ext_2',
    connectorId: 'conn_leetcode',
    provider: 'LeetCode',
    title: 'Top 1% Runtime Proof: Advanced Graph & Flow Algorithms',
    sourceUrl: 'https://leetcode.com/submissions/detail/849201948/',
    extractedAt: '1 hour ago',
    skillsAssociated: ['Algorithms', 'Graph Theory', 'Dynamic Programming'],
    proofSnippet: 'Solved 184 Hard problems; achieved 99.4% memory efficiency on Dinic Max Flow & Hopcroft-Karp matching.',
    metric: '99.4% runtime percentile',
    verificationScore: 96,
    status: 'verified_in_graph',
  },
  {
    id: 'ext_3',
    connectorId: 'conn_huggingface',
    provider: 'Hugging Face',
    title: 'vLLM Multi-LoRA Batching Optimization Model Weights',
    sourceUrl: 'https://huggingface.co/mohit-ai-lab/vllm-deepseek-awq-fp8',
    extractedAt: '3 hours ago',
    skillsAssociated: ['vLLM', 'CUDA', 'Quantization (AWQ/FP8)', 'Distributed Inference'],
    proofSnippet: 'Published FP8 quantized weights with continuous batching support; downloaded 42k+ times across AI research labs.',
    metric: '42k downloads / 3.4x throughput speedup',
    verificationScore: 98,
    status: 'pending_review',
  },
  {
    id: 'ext_4',
    connectorId: 'conn_linkedin',
    provider: 'LinkedIn',
    title: 'Distributed Consensus & Raft Invariants Breakdown',
    sourceUrl: 'https://linkedin.com/posts/mohitupraity_distributed-systems-raft-activity-7193849102',
    extractedAt: '5 hours ago',
    skillsAssociated: ['Distributed Systems', 'Raft Consensus', 'Fault Tolerance'],
    proofSnippet: 'Published 2,400-word engineering breakdown on split-brain prevention with 14,000+ views and 450+ developer engagements.',
    metric: '14k reads / 450 engagements',
    verificationScore: 94,
    status: 'pending_review',
  },
  {
    id: 'ext_5',
    connectorId: 'conn_medium',
    provider: 'Medium',
    title: 'Custom Triton Kernel for FlashAttention-3 on Hopper GPUs',
    sourceUrl: 'https://medium.com/@mohit.systems/writing-custom-triton-kernels-for-hopper-gpu-b74981f',
    extractedAt: 'Yesterday',
    skillsAssociated: ['Triton', 'GPU Kernel Programming', 'PyTorch'],
    proofSnippet: 'Benchmarked tensor core memory warp utilization with NVLink-C2C bandwidth analysis.',
    metric: '38k views / 14 academic citations',
    verificationScore: 97,
    status: 'verified_in_graph',
  },
];

export const mockIngestionLogs: IngestionLog[] = [
  {
    id: 'log_1',
    timestamp: '21:42:10',
    provider: 'GitHub',
    action: 'Webhook PR Ingestion',
    itemsProcessed: 3,
    status: 'success',
    message: 'Extracted commit 9f84bc12 from repo intelliguard-ngfw; AST verified C++ headers.',
  },
  {
    id: 'log_2',
    timestamp: '21:30:00',
    provider: 'LeetCode',
    action: 'Routine Contest Sync',
    itemsProcessed: 6,
    status: 'success',
    message: 'Fetched weekly contest 416 leaderboard results; contest rating adjusted to 2140.',
  },
  {
    id: 'log_3',
    timestamp: '20:15:22',
    provider: 'Hugging Face',
    action: 'Model Registry Crawl',
    itemsProcessed: 1,
    status: 'success',
    message: 'Detected 4,200 new model downloads for vllm-deepseek-awq-fp8.',
  },
  {
    id: 'log_4',
    timestamp: '18:00:00',
    provider: 'LinkedIn',
    action: 'Post & Endorsement Refresh',
    itemsProcessed: 2,
    status: 'success',
    message: 'Indexed 1 new architecture diagram post and 4 new Distributed Systems endorsements.',
  },
];
