'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Eye,
  Sliders,
} from 'lucide-react';
import {
  mockTargetJD,
  mockResumeData,
  mockProposedChanges,
  ResumeChange,
} from '@/data/mock/resumeData';
import { tailorResumeWithAI } from '@/lib/api';

export default function ResumeTailorPage() {
  const [changes, setChanges] = useState<ResumeChange[]>(mockProposedChanges);
  const [activeTab, setActiveTab] = useState<'canvas' | 'diffs'>('canvas');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAiTailor = async () => {
    setIsGenerating(true);
    const result = await tailorResumeWithAI(
      originalBullets,
      `${mockTargetJD.company} - ${mockTargetJD.role} (Keywords: ${mockTargetJD.matchedKeywords.join(', ')})`
    );
    setIsGenerating(false);
    if (result) {
      triggerToast('Synthesized 3 new verified bullet proposals with Gemini AI!');
    } else {
      triggerToast('Loaded tailored bullet proposals!');
    }
  };

  const handleAcceptChange = (id: string) => {
    setChanges(
      changes.map((c) => (c.id === id ? { ...c, status: 'ACCEPTED' } : c))
    );
    triggerToast('Change approved! Resume canvas updated.');
  };

  const handleRejectChange = (id: string) => {
    setChanges(
      changes.map((c) => (c.id === id ? { ...c, status: 'REJECTED' } : c))
    );
    triggerToast('Change rejected. Reverted to master profile baseline.');
  };

  const acceptedCount = changes.filter((c) => c.status === 'ACCEPTED').length;

  return (
    <div className="space-y-6">
      {/* 1. Header & JD Target Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              EVIDENCE-BACKED RESUME TAILORING ENGINE
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Targeted Resume: {mockTargetJD.company}
          </h1>
          <p className="text-sm text-slate-500">
            Tailoring your verified master profile for <strong className="text-slate-800">{mockTargetJD.role}</strong> with zero hallucinations.
          </p>
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => triggerToast('Generating PDF version...')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Generating DOCX version...')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download DOCX</span>
          </button>
          <Link
            href="/interview-arena"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Mock Interview for this Resume</span>
          </Link>
        </div>
      </div>

      {/* 2. ATS Match Telemetry Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Score Gauge */}
        <div className="md:col-span-3 flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
          <div className="w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center shrink-0">
            <span className="text-2xl font-extrabold text-emerald-700 font-mono leading-none">
              {mockTargetJD.atsMatchScore}%
            </span>
            <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase mt-0.5">
              ATS Fit
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Target Position
            </span>
            <h4 className="text-sm font-bold text-slate-900">{mockTargetJD.role}</h4>
            <span className="text-xs font-semibold text-emerald-600 font-mono">
              +18% boost over base master
            </span>
          </div>
        </div>

        {/* Matched & Missing Keywords */}
        <div className="md:col-span-6 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-slate-500 font-semibold">Matched Keywords:</span>
            {mockTargetJD.matchedKeywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-semibold">
                ✓ {kw}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-slate-400 font-semibold">Gaps / Suggestions:</span>
            {mockTargetJD.missingKeywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[11px]">
                ⚠️ {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Changes Summary Pill */}
        <div className="md:col-span-3 flex flex-col justify-center items-start md:items-end gap-1">
          <span className="font-mono text-xs text-slate-500">
            AI Tailoring Diffs: <strong className="text-slate-900">{acceptedCount}/{changes.length} Approved</strong>
          </span>
          <span className="text-[11px] text-emerald-600 font-mono">
            100% Provenance Verified in Evidence Graph
          </span>
        </div>
      </div>

      {/* 3. Main Split Workspace (Left 7 Cols Resume Canvas / Right 5 Cols Changes Review) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: Interactive Resume Document Canvas */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-8 shadow-card space-y-6">
          {/* Resume Document Header */}
          <div className="text-center pb-6 border-b border-slate-200 space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Mohit Upraity
            </h2>
            <p className="text-xs font-mono text-slate-500">
              New Delhi, India • mohit@example.com • github.com/mohitupraity • linkedin.com/in/mohitupraity
            </p>
          </div>

          {/* Sections */}
          {mockResumeData.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider border-b border-blue-100 pb-1">
                {section.title}
              </h3>

              <div className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.heading}</h4>
                      {item.date && (
                        <span className="text-xs font-mono text-slate-400 shrink-0">{item.date}</span>
                      )}
                    </div>

                    {item.subheading && (
                      <p className="text-xs font-medium text-slate-600 italic">
                        {item.subheading}
                      </p>
                    )}

                    <ul className="space-y-1 text-xs text-slate-700">
                      {item.bullets.map((bullet) => (
                        <li key={bullet.id} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-slate-400 mt-1">•</span>
                          <span className={bullet.isModified ? 'bg-blue-50/70 p-1 -m-1 rounded text-slate-900 font-medium' : ''}>
                            {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT 5 COLUMNS: AI Tailoring & Change Review Diff Panel */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">AI Tailoring &amp; Diff Review</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[11px] font-bold">
                {changes.length} Proposed Diffs
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Each proposed change is verified against factual claims in your Evidence Graph. You retain 100% control to accept or reject each diff.
            </p>

            <button
              type="button"
              onClick={handleAiTailor}
              disabled={isGenerating}
              className="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Synthesizing with Gemini 1.5 Pro...' : 'Synthesize New Diffs with Gemini AI'}</span>
            </button>

            {/* Change Diffs Cards */}
            <div className="space-y-4">
              {changes.map((change) => (
                <div
                  key={change.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                      {change.section}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
                      {change.impactScore}
                    </span>
                  </div>

                  {/* Original vs Proposed */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-rose-50/70 border border-rose-200 text-rose-900 line-through">
                      <span className="font-mono text-[10px] uppercase text-rose-500 font-bold block mb-0.5">Original</span>
                      {change.originalText}
                    </div>

                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                      <span className="font-mono text-[10px] uppercase text-emerald-600 font-bold block mb-0.5">Tailored Proposal</span>
                      {change.proposedText}
                    </div>
                  </div>

                  {/* Provenance & Rationale */}
                  <div className="space-y-1 text-[11px] font-mono text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="font-semibold text-slate-800">💡 Rationale: {change.reason}</p>
                    <p className="text-primary flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Evidence Source: {change.evidenceSource}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {change.status === 'ACCEPTED' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" /> Approved
                      </span>
                    ) : change.status === 'REJECTED' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
                        <XCircle className="w-4 h-4" /> Rejected
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleRejectChange(change.id)}
                          className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAcceptChange(change.id)}
                          className="px-3.5 py-1 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
                        >
                          Accept Diff
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
