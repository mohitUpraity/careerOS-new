'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { mockHackathons } from '@/data/mock/opportunitiesData';
import { fetchHackathons, LiveHackathon } from '@/lib/api';

export default function HackathonsPage() {
  const [hackathonsList, setHackathonsList] = useState<any[]>(mockHackathons);
  const [activeTab, setActiveTab] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'PAST'>('ALL');
  const [registeredIds, setRegisteredIds] = useState<string[]>(['hack_02']);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch live hackathons from Supabase PostgreSQL
  React.useEffect(() => {
    async function loadLiveHackathons() {
      setIsLoading(true);
      try {
        const liveData = await fetchHackathons({ status: activeTab });
        if (liveData && liveData.length > 0) {
          const mapped = liveData.map((h: LiveHackathon) => ({
            id: h.id,
            title: h.title,
            organizer: h.organizer,
            prizePool: h.prize_pool,
            status: h.status,
            date: h.deadline ? `Deadline: ${new Date(h.deadline).toLocaleDateString()}` : (h.start_date ? new Date(h.start_date).toLocaleDateString() : 'Active Arena'),
            location: h.location || 'Virtual',
            teamStatus: `Up to ${h.team_size || '1-4'} engineers`,
            tracks: h.tracks || ['AI Systems', 'Distributed Systems'],
            tags: h.tags || ['Global', 'Virtual'],
            applyUrl: h.url || 'https://unstop.com',
            description: h.description || 'Pioneering verified engineering challenges.',
            registeredCount: h.registered_count || 1200,
            matchScore: 94,
          }));
          setHackathonsList(mapped);
        }
      } catch (err) {
        console.error('Failed to load live hackathons:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveHackathons();
  }, [activeTab]);

  const handleRegister = (id: string, title: string) => {
    if (registeredIds.includes(id)) {
      setRegisteredIds(registeredIds.filter((item) => item !== id));
      setToast(`Cancelled registration for "${title}"`);
    } else {
      setRegisteredIds([...registeredIds, id]);
      setToast(`Successfully registered for "${title}"! Team dashboard unlocked.`);
    }
    setTimeout(() => setToast(null), 3000);
  };

  const filteredHackathons = hackathonsList.filter((h) => {
    if (activeTab === 'ALL') return true;
    return h.status?.toUpperCase() === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            COMPETITIVE TELEMETRY &amp; PROOF-OF-WORK
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Hackathons, Bounties &amp; Engineering Challenges
          </h1>
          <p className="text-sm text-slate-500">
            High-leverage engineering arenas to build verified evidence, win grants, and fast-track recruiter referrals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors shrink-0"
          >
            <span>Back to Opportunities</span>
          </Link>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['ALL', 'LIVE', 'UPCOMING', 'PAST'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab === 'ALL' ? 'All Arenas' : tab}
          </button>
        ))}
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHackathons.map((hack) => {
          const isRegistered = registeredIds.includes(hack.id);
          return (
            <div
              key={hack.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-primary font-mono text-xs font-semibold">
                    {hack.organizer}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[11px] font-bold">
                    {hack.matchScore || 94}% Skill Fit
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {hack.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {hack.description}
                </p>

                {/* Details Strip */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{hack.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
                    <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{hack.prizePool}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hack.teamStatus}</span>
                  </div>
                  {hack.location && (
                    <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <MapPin className="w-3 h-3" />
                      <span>{hack.location}</span>
                    </div>
                  )}
                </div>

                {/* Skill Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {hack.tags?.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleRegister(hack.id, hack.title)}
                  className={`flex-1 h-9 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isRegistered
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-primary hover:bg-primary-hover text-white shadow-2xs'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Registered (View Team Hub)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Register &amp; Match Team</span>
                    </>
                  )}
                </button>

                {hack.applyUrl && (
                  <a
                    href={hack.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center"
                    title="External Arena Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
