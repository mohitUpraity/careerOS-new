'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Calendar as CalendarIcon,
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
  X,
  Clock,
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import { generateAIPost } from '@/lib/api';

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  scheduledTime: string;
  status: 'SCHEDULED' | 'DRAFT' | 'PUBLISHED';
  category: string;
  forecastReach: string;
}

const initialScheduled: ScheduledPost[] = [
  {
    id: 'sp_1',
    title: 'IntelliGuard NGFW: Zero-Copy eBPF Throughput',
    content: 'Deep dive into zero-copy ring buffers and Linux kernel bypass using XDP. Sustained 4.8M pps throughput benchmarked.',
    scheduledTime: 'Tomorrow • 09:30 AM',
    status: 'SCHEDULED',
    category: 'Systems & Kernel',
    forecastReach: '12.5k - 18k views',
  },
  {
    id: 'sp_2',
    title: 'Lessons from DRDO ADRDE AI Research Internship',
    content: 'Key architectural insights from building high-reliability telemetry pipelines and real-time inference monitoring.',
    scheduledTime: 'Sep 29 • 11:00 AM',
    status: 'SCHEDULED',
    category: 'Experience & Story',
    forecastReach: '8k - 12k views',
  },
  {
    id: 'sp_3',
    title: 'Top 5 Memory Pitfalls in Triton GPU Kernels',
    content: 'Warp divergence, shared memory bank conflicts, and global memory coalescing tips for AI systems engineers.',
    scheduledTime: 'Oct 02 • 10:00 AM',
    status: 'DRAFT',
    category: 'AI Infrastructure',
    forecastReach: '15k - 22k views',
  },
];

export default function LinkedInAndPresencePage() {
  const [activeTab, setActiveTab] = useState<'Post Studio' | 'Content Calendar' | 'Profile Optimizer' | 'Engagement' | 'Network' | 'Analytics'>('Post Studio');
  const [checkInText, setCheckInText] = useState('');
  const [postDraft, setPostDraft] = useState(
    `Excited to share that I've completed the zero-copy eBPF packet filtering pipeline for IntelliGuard! 🚀\n\nBy leveraging XDP hardware ring buffers and custom Linux kernel hooks, we achieved 4.8M packets/sec sustained throughput at under 120ns latency.\n\nKey takeaways:\n1. Kernel bypass / XDP eliminates OS socket overhead entirely\n2. Memory alignment is paramount for zero-copy ring buffers\n3. AST-based validation ensures deterministic rule enforcement\n\nCode provenance and benchmarks are live on GitHub! 💡\n\n#eBPF #LinuxKernel #Cybersecurity #HighPerformance #BuildInPublic #AI`
  );
  
  // Interactive Feed state
  const [likeCount, setLikeCount] = useState(48);
  const [isLiked, setIsLiked] = useState(false);
  const [repostCount, setRepostCount] = useState(7);
  const [isReposted, setIsReposted] = useState(false);

  // Scheduled posts list
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(initialScheduled);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalTime, setModalTime] = useState('Tomorrow • 10:00 AM');
  const [modalCategory, setModalCategory] = useState('Engineering');

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGeneratePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInText.trim()) return;
    triggerToast('Generating technical post via Gemini AI...');
    const aiPost = await generateAIPost(checkInText);
    if (aiPost) {
      setPostDraft(aiPost);
      triggerToast('Generated technical post draft using Gemini 1.5 Pro!');
    } else {
      setPostDraft(
        `Just pushed a major milestone: ${checkInText}! 🚀\n\nBenchmarked the architecture and verified full integration with zero hallucinations.\n\nKey findings:\n- Optimized processing latency\n- Validated with automated test harness\n- Pushed telemetry updates to CareerOS graph\n\n#Engineering #AI #FullStack #BuildInPublic`
      );
      triggerToast('Generated technical post draft!');
    }
    setCheckInText('');
  };

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalContent.trim()) return;

    const newPost: ScheduledPost = {
      id: `sp_${Date.now()}`,
      title: modalTitle,
      content: modalContent,
      scheduledTime: modalTime,
      status: 'SCHEDULED',
      category: modalCategory,
      forecastReach: '10k - 15k views',
    };

    setScheduledPosts([newPost, ...scheduledPosts]);
    setIsCreateModalOpen(false);
    setModalTitle('');
    setModalContent('');
    triggerToast('New post scheduled into Content Calendar!');
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      triggerToast('Liked LinkedIn post mockup!');
    }
  };

  const toggleRepost = () => {
    if (isReposted) {
      setRepostCount((prev) => prev - 1);
      setIsReposted(false);
    } else {
      setRepostCount((prev) => prev + 1);
      setIsReposted(true);
      triggerToast('Reposted to feed!');
    }
  };

  const tabs = [
    { name: 'Post Studio' as const, icon: Edit3 },
    { name: 'Content Calendar' as const, icon: CalendarIcon },
    { name: 'Profile Optimizer' as const, icon: Award },
    { name: 'Engagement' as const, icon: MessageSquare },
    { name: 'Network' as const, icon: Users },
    { name: 'Analytics' as const, icon: BarChart3 },
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
            onClick={() => setIsCreateModalOpen(true)}
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

      {/* TAB 1: POST STUDIO */}
      {activeTab === 'Post Studio' && (
        <div className="space-y-6">
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
                      onClick={() => {
                        const newP: ScheduledPost = {
                          id: `sp_${Date.now()}`,
                          title: 'Engineering Breakthrough Post',
                          content: postDraft,
                          scheduledTime: 'Tomorrow • 09:30 AM',
                          status: 'SCHEDULED',
                          category: 'Technical Deep Dive',
                          forecastReach: '12k - 18k views',
                        };
                        setScheduledPosts([newP, ...scheduledPosts]);
                        triggerToast('Post scheduled for 9:30 AM tomorrow!');
                      }}
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

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2 font-mono">
                    <span>{likeCount} Likes</span>
                    <span>{repostCount} Reposts</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <button
                      type="button"
                      onClick={toggleLike}
                      className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Like
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerToast('Comment drawer opened.')}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Comment
                    </button>
                    <button
                      type="button"
                      onClick={toggleRepost}
                      className={`flex items-center gap-1 transition-colors ${isReposted ? 'text-emerald-600 font-bold' : 'hover:text-blue-600'}`}
                    >
                      <Repeat className="w-3.5 h-3.5" /> Repost
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(postDraft);
                        triggerToast('Link copied to share!');
                      }}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <Send className="w-3.5 h-3.5" /> Share
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
      )}

      {/* TAB 2: CONTENT CALENDAR */}
      {activeTab === 'Content Calendar' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">Scheduled Posts &amp; Editorial Pipeline</h3>
              <p className="text-xs text-slate-500">Automated syndication of verified engineering progress.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule New</span>
            </button>
          </div>

          <div className="space-y-3">
            {scheduledPosts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                      {p.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      p.status === 'SCHEDULED' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {p.status}
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.scheduledTime}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{p.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-emerald-600 font-bold">{p.forecastReach}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setScheduledPosts(scheduledPosts.filter((x) => x.id !== p.id));
                      triggerToast('Scheduled post cancelled.');
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROFILE OPTIMIZER */}
      {activeTab === 'Profile Optimizer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
            <h3 className="font-bold text-base text-slate-900">Technical Headline Evaluator</h3>
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Current Headline:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">96/100 SCORE</span>
              </div>
              <p className="text-xs font-mono text-slate-800">
                AI Systems &amp; Low-Latency Engineer | Building eBPF Zero-Copy Firewalls &amp; Triton CUDA Kernels | DRDO Research Intern
              </p>
            </div>
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Key Keyword Densities:</h4>
              <div className="flex flex-wrap gap-1.5">
                {['eBPF (+98%)', 'CUDA (+92%)', 'Triton (+89%)', 'Distributed Systems (+95%)', 'vLLM (+90%)'].map((kw) => (
                  <span key={kw} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono text-[11px]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
            <h3 className="font-bold text-base text-slate-900">Featured Proofs Sync</h3>
            <p className="text-xs text-slate-500">Sync CareerOS verified proof artifacts directly into your LinkedIn Featured section.</p>
            <div className="space-y-2.5 text-xs">
              {[
                { title: 'IntelliGuard NGFW Repository & Paper', status: 'SYNCED' },
                { title: 'Flash-Triton CUDA Kernel Benchmark', status: 'SYNCED' },
                { title: 'Raft Distributed Consensus in Rust', status: 'READY TO SYNC' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <span className="font-mono text-[10px] text-emerald-600 font-bold">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ENGAGEMENT */}
      {activeTab === 'Engagement' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="font-bold text-base text-slate-900">Inbound Engagement &amp; Comments Queue</h3>
          <div className="space-y-3">
            {[
              {
                author: 'Staff AI Engineer @ Scale AI',
                comment: 'Impressive throughput on the eBPF filter! Are you using XDP_REDIRECT or native drop?',
                time: '1h ago',
              },
              {
                author: 'Founder @ AI Infra Startup',
                comment: 'We are hiring for our CUDA kernel optimization team. Would love to chat!',
                time: '3h ago',
              },
            ].map((msg, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{msg.author}</span>
                  <span className="text-[10px] font-mono text-slate-400">{msg.time}</span>
                </div>
                <p className="text-xs text-slate-700">{msg.comment}</p>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => triggerToast('AI Reply draft generated!')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-primary text-xs font-semibold hover:bg-blue-100"
                  >
                    Draft Technical Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: NETWORK */}
      {activeTab === 'Network' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="font-bold text-base text-slate-900">Target Companies &amp; Key Engineers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { company: 'Anthropic', connections: '14 Engineers', status: 'High Engagement' },
              { company: 'Google DeepMind', connections: '28 Engineers', status: 'Active Dialogue' },
              { company: 'Scale AI', connections: '19 Engineers', status: 'Interview In-Flight' },
            ].map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">{c.company}</h4>
                <p className="text-slate-500 font-mono">{c.connections}</p>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ANALYTICS */}
      {activeTab === 'Analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">Monthly Impressions</h4>
            <div className="text-3xl font-extrabold font-mono text-slate-900">142,400</div>
            <p className="text-xs text-emerald-600 font-semibold">+24.5% vs last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">Top Reader Persona</h4>
            <div className="text-xl font-bold text-slate-900">Engineering Managers</div>
            <p className="text-xs text-slate-500">42% of profile viewers are hiring decision makers.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">Profile Views</h4>
            <div className="text-3xl font-extrabold font-mono text-slate-900">3,890</div>
            <p className="text-xs text-emerald-600 font-semibold">+18% inbound recruiter searches</p>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create &amp; Schedule Post</h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Post Title / Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Profiling CUDA Warp Divergence in Triton"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Post Content</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your technical insight or breakdown..."
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={modalCategory}
                    onChange={(e) => setModalCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Systems & Kernel">Systems &amp; Kernel</option>
                    <option value="AI Infrastructure">AI Infrastructure</option>
                    <option value="Experience & Story">Experience &amp; Story</option>
                    <option value="Technical Deep Dive">Technical Deep Dive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Scheduled Time</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow • 10:00 AM"
                    value={modalTime}
                    onChange={(e) => setModalTime(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-2xs"
                >
                  Schedule Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
