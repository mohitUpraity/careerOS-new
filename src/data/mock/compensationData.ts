import { OfferItem } from '@/types';

export const mockOffers: OfferItem[] = [
  {
    id: 'off_google_01',
    company: 'Google Cloud Systems',
    role: 'Senior AI Infrastructure Engineer (L6)',
    status: 'LEADING',
    decisionDeadline: 'Oct 3, 2026 (4 days left)',
    baseSalary: 245000,
    equityTotal: 680000,
    equityVestingSchedule: '4-Year Frontloaded (33% / 33% / 22% / 12%)',
    signOnBonus: 50000,
    annualBonusPercent: 15,
    annualBonusAmount: 36750,
    year1TotalComp: 519400,
    fourYearTotalComp: 1812000,
    percentileRank: 89,
  },
  {
    id: 'off_anthropic_02',
    company: 'Anthropic',
    role: 'ML Platform & Serving Engineer',
    status: 'COMPETING',
    decisionDeadline: 'Oct 7, 2026 (8 days left)',
    baseSalary: 260000,
    equityTotal: 600000,
    equityVestingSchedule: '4-Year Linear (25% / 25% / 25% / 25%)',
    signOnBonus: 40000,
    annualBonusPercent: 0,
    annualBonusAmount: 0,
    year1TotalComp: 450000,
    fourYearTotalComp: 1680000,
    percentileRank: 82,
  },
];

export const mockNegotiationCopilot = {
  leverageScore: 94,
  leverageStatus: 'Exceptional Leverage Status',
  keyLeveragePoints: [
    'Competing Anthropic offer provides +$15,000 base salary anchor to challenge Google band ceiling.',
    'Validated production expertise in distributed inference (vLLM / Triton kernel PR) directly fulfills Google team’s Q4 tier-1 objective.',
    'Rare DRDO low-level C++ telemetry systems background eliminates hiring team’s ramp-up latency.',
  ],
  counterScriptPreset: 'Preset: Targeted +$45k Equity & Level Confirmation',
  counterScriptEmail: `Hi [Recruiter Name],

Thank you again for extending the offer for the L6 AI Infrastructure team. I’m incredibly excited about the work the team is doing on vLLM kernel optimization and distributed inference architecture.

As discussed, I have also received an offer from Anthropic with a higher base compensation of $260,000. Given my verified production background in distributed inference and immediate readiness to contribute to the Q4 infra milestones, if Google can adjust the initial equity grant to $725,000 (+$45k) or increase the sign-on bonus to $80,000 to bridge the base spread, I am prepared to sign the offer immediately.

Best regards,
Mohit Upraity`,
  objectionScenarios: [
    {
      trigger: 'If recruiter cites equity band ceiling',
      playbook: 'Pivot immediately to Sign-on Bonus boost (Target: $80,000 – $90,000 upfront cash).',
    },
    {
      trigger: 'If asked for competing written offer',
      playbook: 'Deploy Stage-2 Verification Protocol: Disclose numerical terms & level without leaking confidential IP.',
    },
    {
      trigger: 'If artificial deadline pressure is applied',
      playbook: 'Request standard 5-business-day board approval extension to complete due diligence.',
    },
  ],
};
