import { OpportunityItem } from '@/types';

export const mockOpportunities: OpportunityItem[] = [];

export interface HackathonItem {
  id: string;
  title: string;
  organizer: string;
  prizePool: string;
  status: 'LIVE' | 'UPCOMING' | 'PAST';
  date: string;
  location: string;
  teamStatus: string;
  tracks: string[];
  tags: string[];
  applyUrl: string;
  description: string;
  registeredCount: number;
  matchScore: number;
}

export const mockHackathons: HackathonItem[] = [];
