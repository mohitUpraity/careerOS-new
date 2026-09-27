'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Calendar,
  Users,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { mockHackathons } from '@/data/mock/opportunitiesData';

export default function HackathonsPage() {
  const [registeredIds, setRegisteredIds] = useState<string[]>(['hack_02']);
  const [toast, setToast] = useState<string | null>(null);

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

        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors shrink-0"
        >
          <span>Back to Opportunities</span>
        </Link>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockHackathons.map((hack) => {
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
                    {hack.matchScore}% Skill Fit
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
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hack.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>{hack.prizePool}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Team Status: <strong className="text-slate-800">{hack.teamStatus}</strong></span>
                </div>

                {/* Skill Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {hack.tags.map((tag, i) => (
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
                  className={`w-full h-9 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
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
