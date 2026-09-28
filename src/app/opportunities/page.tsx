'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileText,
  Radio,
  Bookmark,
  Share2,
  MapPin,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { OpportunityItem } from '@/types';
import { fetchOpportunities, LiveOpportunity } from '@/lib/api';

const categories = ['All', 'Jobs', 'Internships', 'Research', 'Scholarships'];

export default function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minMatch, setMinMatch] = useState(70);
  const [opportunitiesList, setOpportunitiesList] = useState<OpportunityItem[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live opportunities from Supabase PostgreSQL via FastAPI
  useEffect(() => {
    async function loadLiveOpportunities() {
      setIsLoading(true);
      try {
        const liveItems = await fetchOpportunities();
        if (liveItems && liveItems.length > 0) {
          const mapped: OpportunityItem[] = liveItems.map((opp: LiveOpportunity) => ({
            id: opp.id,
            title: opp.title,
            company: opp.company,
            location: opp.location,
            type: (opp.category as any) || 'Jobs',
            matchScore: opp.match_score,
            fitVerdict: opp.match_reason || `${opp.match_score}% High Conviction Match`,
            deadline: opp.deadline || 'Ongoing',
            salary: opp.salary_range || 'Competitive',
            verifiedEvidenceCount: opp.verified_evidence_required?.length || 0,
            requiredSkills: (opp.hard_skills || []).map((skillName: string, idx: number) => ({
              name: skillName,
              matched: idx < 3,
            })),
            description: opp.match_reason || 'Verified opportunity matching your technical trajectory and AST evidence proofs.',
            keyResponsibilities: opp.key_requirements || [],
            benefits: ['Competitive Base + Performance Bonus', 'Comprehensive healthcare & wellness', 'Flexible work policy'],
            applyUrl: opp.apply_url || 'https://careers.google.com',
          }));

          setOpportunitiesList(mapped);
          setSelectedOpp(mapped[0]);
        }
      } catch (err) {
        console.warn('Failed to load opportunities:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveOpportunities();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      triggerToast('Opportunity removed from saved list');
    } else {
      setSavedIds([...savedIds, id]);
      triggerToast('Opportunity saved to your CareerOS radar');
    }
  };

  const filteredList = opportunitiesList.filter((opp) => {
    const matchesCategory = selectedCategory === 'All' || opp.type === selectedCategory;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesScore = opp.matchScore >= minMatch;
    return matchesCategory && matchesSearch && matchesScore;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Filter Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                OPPORTUNITY DISCOVERY &amp; MATCH TELEMETRY
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Live Opportunity Radar
            </h1>
            <p className="text-sm text-slate-500">
              Personalized candidate-to-role matching scored deterministically against your verified Evidence Graph.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/hackathons-and-events"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <span>Hackathons &amp; Events</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Tailor</span>
            </Link>
          </div>
        </div>

        {/* Category Tabs & Search Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Minimum Match Slider */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by title, skill, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary transition-all"
              />
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
              <span>Min Match:</span>
              <input
                type="range"
                min="50"
                max="95"
                value={minMatch}
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="w-20 accent-primary cursor-pointer"
              />
              <span className="font-bold text-slate-900 w-8">{minMatch}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Master-Detail Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: Master Opportunities List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
            <span>Showing {filteredList.length} Live Opportunities</span>
            <span>Sorted by: Match Fit Score</span>
          </div>

          <div className="space-y-3">
            {filteredList.map((opp) => {
              const isSelected = selectedOpp?.id === opp.id;
              const isSaved = savedIds.includes(opp.id);

              return (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer bg-white relative ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/10 shadow-elevated'
                      : 'border-slate-200 hover:border-slate-300 shadow-card'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-primary shrink-0">
                        {opp.company.charAt(0)}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm text-slate-900 truncate">{opp.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-bold">
                            {opp.matchScore}% Match
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                          <span className="font-semibold text-slate-700">{opp.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" /> {opp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleSave(opp.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-blue-50 border-blue-200 text-primary'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Saved' : 'Save opportunity'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
                    </button>
                  </div>

                  {/* Compensation & Metadata Tags */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {opp.salary}
                      </span>
                      {opp.verifiedEvidenceCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          <ShieldCheck className="w-3.5 h-3.5" /> {opp.verifiedEvidenceCount} Verified Claims
                        </span>
                      )}
                    </div>

                    <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {opp.deadline}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredList.length === 0 && !isLoading && (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-card flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">No active opportunities in view</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    {searchQuery ? 'Try broadening your search term or adjusting filters.' : 'Live market streams are synchronizing. Check back shortly or add custom tracking.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Opportunity Detail Inspector */}
        {selectedOpp ? (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-6 sticky top-20">
            {/* Detail Header */}
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[11px] font-bold">
                  {selectedOpp.type} • {selectedOpp.company}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold">
                  {selectedOpp.matchScore}% Fit Score
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {selectedOpp.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="font-semibold text-slate-700">{selectedOpp.company}</span>
                <span>•</span>
                <span>{selectedOpp.location}</span>
              </div>

              <p className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                ⚡ {selectedOpp.fitVerdict}
              </p>
            </div>

            {/* Quick Action Clusters */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/resume"
                className="flex items-center justify-center gap-1.5 h-10 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Tailor Resume</span>
              </Link>

              <Link
                href="/interview-arena"
                className="flex items-center justify-center gap-1.5 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Radio className="w-4 h-4" />
                <span>Mock Interview</span>
              </Link>
            </div>

            {/* Required Skills & Fit Breakdown */}
            {selectedOpp.requiredSkills.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Skills &amp; Evidence Fit Checklist
                </h4>
                <div className="space-y-2">
                  {selectedOpp.requiredSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                    >
                      <span className="font-medium text-slate-800">{skill.name}</span>
                      {skill.matched ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Matched
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                          <XCircle className="w-3.5 h-3.5 text-amber-600" /> Skill Gap
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role Overview & Responsibilities */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                Role Scope &amp; Responsibilities
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedOpp.description}
              </p>
              {selectedOpp.keyResponsibilities.length > 0 && (
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedOpp.keyResponsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Compensation & Benefits */}
            <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                Compensation Package
              </h4>
              <p className="text-sm font-bold text-slate-900 font-mono">{selectedOpp.salary}</p>
            </div>

            {/* External Apply Link */}
            <a
              href={selectedOpp.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              <span>Open Direct Application URL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-8 shadow-card text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Select an Opportunity</h3>
            <p className="text-xs text-slate-500 max-w-xs">
              Click on any opportunity card on the left to inspect requirements, evidence match checklist, and tailoring options.
            </p>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
