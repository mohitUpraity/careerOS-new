export interface EvidenceConnector {
  id: string;
  name: string;
  category: string;
  iconType: string;
  description: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSyncedAt: string;
  verifiedItemsCount: number;
  badgeLabel?: string;
  accountHandle?: string;
  authMethod: 'OAUTH' | 'PAT_TOKEN' | 'PUBLIC_SCRAPER';
  telemetryStream: string;
}

export interface ExtractedEvidenceItem {
  id: string;
  connectorId?: string;
  provider?: string;
  title: string;
  category: string;
  provenance?: string;
  extractedAt: string;
  verificationScore?: number;
  metric?: string;
  proofSnippet?: string;
  skillsAssociated?: string[];
  sourceUrl?: string;
  status?: string;
  hash?: string;
  verified?: boolean;
  rawPayloadPreview?: string;
  mappedSkills?: string[];
}

export interface IngestionLog {
  id: string;
  timestamp: string;
  provider: string;
  action: string;
  itemsProcessed: number;
  status: 'success' | 'warning' | 'error';
  message: string;
}

export const mockConnectors: EvidenceConnector[] = [
  {
    id: 'conn_github',
    name: 'GitHub Repositories & PRs',
    category: 'Code & Repositories',
    iconType: 'github',
    description: 'Vectorizes pull requests, commits, and AST code complexity across your public and private repositories.',
    status: 'disconnected',
    lastSyncedAt: 'Not connected',
    verifiedItemsCount: 0,
    authMethod: 'OAUTH',
    telemetryStream: 'Pull Requests, Commits, Issues & Code Complexity AST',
  },
  {
    id: 'conn_leetcode',
    name: 'LeetCode & Algorithmic Rigor',
    category: 'Competitive Programming',
    iconType: 'code',
    description: 'Syncs contest ratings, verified algorithmic solutions, runtime percentiles, and problem tags.',
    status: 'disconnected',
    lastSyncedAt: 'Not connected',
    verifiedItemsCount: 0,
    authMethod: 'PUBLIC_SCRAPER',
    telemetryStream: 'Contest Rating, Solved Submissions, Runtime Percentiles',
  },
  {
    id: 'conn_linkedin',
    name: 'LinkedIn Professional Profile',
    category: 'Professional Network',
    iconType: 'share',
    description: 'Synchronizes headline, experience trajectory, peer endorsements, and corporate tenure.',
    status: 'disconnected',
    lastSyncedAt: 'Not connected',
    verifiedItemsCount: 0,
    authMethod: 'OAUTH',
    telemetryStream: 'Experience History, Education, Recommendations',
  },
  {
    id: 'conn_huggingface',
    name: 'Hugging Face Hub',
    category: 'AI Models & Datasets',
    iconType: 'sparkles',
    description: 'Extracts published AI model weights, dataset downloads, model card documentation, and Spaces demos.',
    status: 'disconnected',
    lastSyncedAt: 'Not connected',
    verifiedItemsCount: 0,
    authMethod: 'PAT_TOKEN',
    telemetryStream: 'Model Weights, Spaces Demos, Hugging Face Datasets',
  },
  {
    id: 'conn_kaggle',
    name: 'Kaggle Competitions & Notebooks',
    category: 'Competitive Programming',
    iconType: 'layers',
    description: 'Extracts competition tier medals, verified Jupyter notebooks, and community upvotes.',
    status: 'disconnected',
    lastSyncedAt: 'Not connected',
    verifiedItemsCount: 0,
    authMethod: 'PUBLIC_SCRAPER',
    telemetryStream: 'Competition Tier, Notebook Upvotes, Kaggle Medals',
  },
  {
    id: 'conn_arxiv',
    name: 'ArXiv & Google Scholar',
    category: 'Publications & Writing',
    iconType: 'terminal',
    description: 'Indexes peer-reviewed systems papers, preprints, citations, and author h-index metrics.',
    status: 'disconnected',
    lastSyncedAt: 'Not connected',
    verifiedItemsCount: 0,
    authMethod: 'PUBLIC_SCRAPER',
    telemetryStream: 'Author h-index, Published Preprints, Paper Citations',
  },
];

export const mockExtractedEvidence: ExtractedEvidenceItem[] = [];
export const mockIngestionLogs: IngestionLog[] = [];
