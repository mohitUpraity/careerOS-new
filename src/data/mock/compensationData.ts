export interface CompensationOffer {
  id: string;
  company: string;
  role: string;
  level: string;
  status: 'OFFER_RECEIVED' | 'IN_NEGOTIATION' | 'TARGET_FLOOR';
  baseSalary: number;
  equityTotal: number;
  equityVestingYears: number;
  signOnBonus: number;
  targetBonusPercentage: number;
  year1Total: number;
  fourYearTotal: number;
  leverageScore: number;
  deadline: string;
  notes: string;
  color: string;
}

export interface NegotiationCopilotData {
  primaryTargetCompany: string;
  competingOfferCompany: string;
  recommendedCounterBase: number;
  recommendedCounterEquity: number;
  recommendedCounterSignOn: number;
  keyLeveragePoints: string[];
  counterScriptEmail: string;
}

export const mockOffers: CompensationOffer[] = [];

export const mockNegotiationCopilot: NegotiationCopilotData = {
  primaryTargetCompany: 'Target Company',
  competingOfferCompany: 'Competing Offer',
  recommendedCounterBase: 250000,
  recommendedCounterEquity: 500000,
  recommendedCounterSignOn: 50000,
  keyLeveragePoints: [],
  counterScriptEmail: 'Dear Hiring Team,\n\nThank you for extending the offer. Based on current competing market offers and my domain expertise, I would like to discuss adjustments to the base and equity components.',
};
