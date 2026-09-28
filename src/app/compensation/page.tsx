'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Copy,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  AlertTriangle,
  FileCode2,
  BarChart3,
  Scale,
  Plus,
} from 'lucide-react';
import { fetchProfile, UserProfileData } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

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
}

export default function CompensationPage() {
  const { profile } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [offers, setOffers] = useState<CompensationOffer[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [equity, setEquity] = useState('');
  const [signOn, setSignOn] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const p = await fetchProfile();
      if (p) setProfileData(p);
    }
    load();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const currency = (profileData as any)?.currency || (profile as any)?.currency || 'USD';
  const minFloor = (profileData as any)?.min_salary || profile?.min_salary || 180000;
  const targetFloor = (profileData as any)?.target_tc || profile?.target_tc || 260000;

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !baseSalary) return;

    const base = Number(baseSalary.replace(/[^0-9]/g, '')) || 180000;
    const eq = Number(equity.replace(/[^0-9]/g, '')) || 0;
    const sign = Number(signOn.replace(/[^0-9]/g, '')) || 0;
    const y1 = base + sign + (eq / 4);
    const total4 = (base * 4) + sign + eq;

    const newOffer: CompensationOffer = {
      id: `off_${Date.now()}`,
      company,
      role: role || profileData?.target_roles?.[0] || profile?.target_role || 'AI Systems Engineer',
      level: (profileData as any)?.seniority_level || (profile as any)?.seniority_level || 'Senior',
      status: 'OFFER_RECEIVED',
      baseSalary: base,
      equityTotal: eq,
      equityVestingYears: 4,
      signOnBonus: sign,
      targetBonusPercentage: 15,
      year1Total: y1,
      fourYearTotal: total4,
      leverageScore: 88,
      deadline: 'Ongoing',
      notes: 'Initial formal offer logged.',
    };

    setOffers([...offers, newOffer]);
    setIsAddModalOpen(false);
    setCompany('');
    setRole('');
    setBaseSalary('');
    setEquity('');
    setSignOn('');
    triggerToast('Offer logged into Compensation Strategy Engine!');
  };

  return (
    <div className="space-y-6">
      {/* 1. Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              OFFER INTELLIGENCE &amp; FINANCIAL MODELING
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Compensation Intelligence &amp; Strategy
          </h1>
          <p className="text-sm text-slate-500">
            Multi-offer equity modeling, 4-year vesting simulation, and target compensation calibration.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Offer Package</span>
          </button>
        </div>
      </div>

      {/* Target Baseline Floor Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-slate-400 uppercase">
            Candidate Baseline Parameters ({currency})
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Calibrated Compensation Targets from Onboarding
          </h3>
          <p className="text-xs text-slate-500">
            Automated market leverage algorithms evaluate incoming offers against these benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Min Base Floor</span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              {currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}
              {Number(minFloor).toLocaleString()}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block font-mono">Target Total Comp</span>
            <span className="text-lg font-bold text-emerald-900 font-mono">
              {currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}
              {Number(targetFloor).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Offers List & Empty State */}
      {offers.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200 shadow-card flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Offer Packages Logged Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              When you receive an offer from a company, log the base salary, equity grants, and sign-on bonus to run 4-year vesting models and AI negotiation scripts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="mt-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs"
          >
            Log First Offer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                    {offer.status.replace('_', ' ')}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{offer.company}</h3>
                  <p className="text-xs text-slate-500">{offer.role} • {offer.level}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Salary:</span>
                  <span className="font-mono font-bold text-slate-900">${offer.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sign-on Bonus:</span>
                  <span className="font-mono font-bold text-slate-900">${offer.signOnBonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">4-Year Equity:</span>
                  <span className="font-mono font-bold text-slate-900">${offer.equityTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900">Year 1 Total:</span>
                  <span className="font-mono font-extrabold text-emerald-600 text-sm">
                    ${Math.round(offer.year1Total).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Offer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Log Offer Package</h3>
            <form onSubmit={handleAddOffer} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anthropic, Google, Scale AI"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. AI Systems Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Annual Base Salary ({currency}) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 240000"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sign-On Bonus</label>
                  <input
                    type="text"
                    placeholder="e.g. 30000"
                    value={signOn}
                    onChange={(e) => setSignOn(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Total 4-Year Equity / RSU Grant</label>
                <input
                  type="text"
                  placeholder="e.g. 400000"
                  value={equity}
                  onChange={(e) => setEquity(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-xs shadow-xs"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
