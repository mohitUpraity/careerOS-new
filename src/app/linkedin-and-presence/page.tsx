'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Calendar,
  Edit3,
  Award,
  MessageSquare,
  Users,
  BarChart3,
  Sun,
  Paperclip,
  ArrowRight,
  Copy,
  Plus,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Heart,
  ThumbsUp,
  MessageCircle,
  Repeat,
  Send,
  Globe,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

export default function LinkedInAndPresencePage() {
  const [activeTab, setActiveTab] = useState('Post Studio');
  const [checkInText, setCheckInText] = useState('');
  const [postDraft, setPostDraft] = useState(
    `Excited to share that I've completed the zero-copy eBPF packet filtering pipeline for IntelliGuard! 🚀\n\nBy leveraging XDP hardware ring buffers and custom Linux kernel hooks, we achieved 4.8M packets/sec sustained throughput at under 120ns latency.\n\nKey takeaways:\n1. Kernel bypass / XDP eliminates OS socket overhead entirely\n2. Memory alignment is paramount for zero-copy ring buffers\n3. AST-based validation ensures deterministic rule enforcement\n\nCode provenance and benchmarks are live on GitHub! 💡\n\n#eBPF #LinuxKernel #Cybersecurity #HighPerformance #BuildInPublic #AI`
  );
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGeneratePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInText.trim()) return;
    setPostDraft(
      `Just pushed a major milestone: ${checkInText}! 🚀\n\nBenchmarked the architecture and verified full integration with zero hallucinations.\n\nKey findings:\n- Optimized processing latency\n- Validated with automated test harness\n- Pushed telemetry updates to CareerOS graph\n\n#Engineering #AI #FullStack #BuildInPublic`
    );
    setCheckInText('');
    triggerToast('Generated technical post draft using Gemini AI!');
  };

  const tabs = [
    { name: 'Content Calendar', icon: Calendar },
    { name: 'Post Studio', icon: Edit3 },
    { name: 'Profile Optimizer', icon: Award },
    { name: 'Engagement', icon: MessageSquare },
    { name: 'Network', icon: Users },
    { name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0077B5] flex items-center justify-center shrink-0 shadow-xs text-white font-bold">
            <span className="text-lg font-serif">in</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              LinkedIn &amp; Professional Presence
            </h1>
            <p className="text-sm text-slate-500">
              Create authoritative engineering content, optimize technical reach, and syndicate proof-of-work.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => triggerToast('Post creation modal opened.')}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>
      </section>

      {/* Top Tab Navigation */}
      <nav className="flex items-center gap-2 overflow-x-auto bg-white p-1 rounded-xl border border-slate-200 shadow-card">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              type="button"
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-blue-50 text-primary border border-blue-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Daily Check-in Banner Card */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">Daily Engineering Check-in</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                What breakthrough did you build today? Drop a bullet point and AI will distill it into an authoritative LinkedIn post with verified code metrics.
              </p>
            </div>
          </div>

          <form onSubmit={handleGeneratePost} className="flex-1 max-w-xl w-full">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1.5 shadow-2xs">
              <input
                type="text"
                value={checkInText}
                onChange={(e) => setCheckInText(e.target.value)}
                placeholder="E.g. Optimized vLLM AWQ quantization; achieved 3.4x throughput speedup..."
                className="flex-1 bg-transparent px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-8 px-3.5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center gap-1 shrink-0 shadow-2xs"
              >
                <span>Generate Post</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main 3-Column Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Column 1: Generated Post Editor & Content Ideas (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Post Editor */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-card flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Draft Editor</h3>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(postDraft);
                  triggerToast('Draft copied to clipboard!');
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>

            <textarea
              value={postDraft}
              onChange={(e) => setPostDraft(e.target.value)}
              rows={11}
              className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 leading-relaxed focus:outline-none focus:bg-white focus:border-primary font-sans"
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-mono text-[11px] text-slate-400">{postDraft.length} / 3000 chars</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => triggerToast('Draft saved.')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('Post scheduled for 9:30 AM tomorrow!')}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-2xs"
                >
                  Schedule Post
                </button>
              </div>
            </div>
          </section>

          {/* Content Ideas */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Content Ideas for You</h3>
              <button
                type="button"
                onClick={() => triggerToast('Generated fresh topics from GitHub & LeetCode!')}
                className="text-primary hover:underline text-xs flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="space-y-2">
              {[
                { title: 'IntelliGuard NGFW: eBPF zero-copy throughput breakdown', tag: 'Project' },
                { title: 'Lessons from DRDO ADRDE AI Research Internship', tag: 'Experience' },
                { title: 'Top 5 memory pitfalls when writing Triton CUDA kernels', tag: 'Deep Dive' },
              ].map((idea, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setPostDraft(`Deep dive: ${idea.title} 🚀\n\nKey architectural takeaways...\n\n#Engineering #AI #Systems`);
                    triggerToast(`Loaded prompt: ${idea.title}`);
                  }}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer transition-colors flex items-center justify-between gap-2"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug">{idea.title}</h4>
                    <span className="font-mono text-[10px] text-slate-400">{idea.tag}</span>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Column 2: Realistic LinkedIn Post Preview (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Live LinkedIn Preview</h3>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                FEED PREVIEW
              </span>
            </div>

            {/* LinkedIn Post Mockup */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Mohit Upraity"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-slate-900">Mohit Upraity</h4>
                    <span className="text-[10px] text-slate-400">· 1st</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    AI Engineer | High-Performance Systems | DRDO Intern
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <span>Just now</span>
                    <span>·</span>
                    <Globe className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                {postDraft}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ThumbsUp className="w-3.5 h-3.5" /> Like
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <MessageCircle className="w-3.5 h-3.5" /> Comment
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <Repeat className="w-3.5 h-3.5" /> Repost
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Column 3: Presence Analytics & Growth (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Presence &amp; Network Analytics</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">30D Impressions</span>
                <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">142,400</span>
                <span className="text-[10px] text-emerald-600 font-medium">+24% this month</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Network Size</span>
                <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">5,420</span>
                <span className="text-[10px] text-emerald-600 font-medium">+180 new connections</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <h4 className="font-semibold text-slate-800">Recruiter Inbound Index</h4>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <p className="text-[11px] text-slate-500">
                Your profile ranks in the <strong className="text-slate-900 font-bold">Top 3%</strong> for AI Infrastructure in Bengaluru &amp; Remote PST.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
