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

export interface TargetJobDescription {
  company: string;
  role: string;
  level: string;
  track: string;
  atsTargetScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface ResumeSectionItem {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  location: string;
  bullets: { id: string; text: string; verifiedEvidenceId?: string }[];
}

export interface ResumeSection {
  id: string;
  title: string;
  items: ResumeSectionItem[];
}

export const mockTargetJD: TargetJobDescription = {
  company: 'Target Company',
  role: 'AI / Software Engineer',
  level: 'Staff / Senior',
  track: 'Distributed Systems & AI Infrastructure',
  atsTargetScore: 90,
  matchedKeywords: [],
  missingKeywords: [],
};

export const mockResumeData: ResumeSection[] = [];
export const mockProposedChanges: ResumeChange[] = [];
