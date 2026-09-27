'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Search,
  Layers,
  PlayCircle,
  Video,
  FileText,
  BookOpen,
  FlaskConical,
  Wrench,
  LayoutTemplate,
  Bookmark,
  ExternalLink,
  Plus,
  Star,
  Clock,
  CheckCircle2,
  ChevronDown,
  User,
  Sparkles,
} from 'lucide-react';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['res_1', 'res_3']);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleSave = (id: string, title: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((i) => i !== id));
      triggerToast(`Removed "${title}" from saved bookmarks.`);
    } else {
      setSavedIds([...savedIds, id]);
      triggerToast(`Saved "${title}" to your personal library!`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Resources', count: '250+', icon: Layers },
    { id: 'courses', name: 'Courses', count: '80+', icon: PlayCircle },
    { id: 'youtube', name: 'YouTube', count: '120+', icon: Video },
    { id: 'docs', name: 'Documentation', count: '40+', icon: FileText },
    { id: 'books', name: 'Books', count: '30+', icon: BookOpen },
    { id: 'papers', name: 'Research Papers', count: '25+', icon: FlaskConical },
    { id: 'tools', name: 'Tools', count: '35+', icon: Wrench },
    { id: 'templates', name: 'Templates', count: '18+', icon: LayoutTemplate },
  ];

  const recommendedItems = [
    {
      id: 'rec_1',
      title: 'Retrieval Augmented Generation (RAG) – Full Course',
      provider: 'freeCodeCamp',
      duration: '4h 12m',
      level: 'Beginner',
      tags: ['RAG', 'LLM', 'Vector DB'],
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'rec_2',
      title: 'System Design for Large Scale AI Applications',
      provider: 'ByteByteGo',
      duration: '2h 35m',
      level: 'Intermediate',
      tags: ['System Design', 'Scalability', 'Architecture'],
      icon: Layers,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      id: 'rec_3',
      title: 'Modern LLMOps & Continuous Inference Serving',
      provider: 'DeepLearning.AI',
      duration: '3h 20m',
      level: 'Intermediate',
      tags: ['MLOps', 'Deployment', 'vLLM'],
      icon: FolderGit2,
      color: 'bg-blue-50 text-primary',
    },
  ];

  const resourceFeed = [
    {
      id: 'res_1',
      title: 'FlashAttention-3: Fast and Accurate Attention with FP8',
      provider: 'ArXiv / Tri Dao et al.',
      type: 'Research Paper',
      level: 'Advanced',
      readTime: '25 min',
      category: 'papers',
      tags: ['CUDA', 'Hopper GPU', 'FP8', 'Attention'],
      description: 'Breakthrough architectural paper optimizing GPU memory warp utilization on NVIDIA H100s.',
      url: 'https://arxiv.org/abs/2407.08608',
    },
    {
      id: 'res_2',
      title: 'Designing Data-Intensive Applications: Distributed Systems Bible',
      provider: "O'Reilly / Martin Kleppmann",
      type: 'Book',
      level: 'Advanced',
      readTime: '12h study',
      category: 'books',
      tags: ['Replication', 'Partitioning', 'Consensus', 'Transactions'],
      description: 'The definitive architectural guide to distributed storage, Raft, Paxos, and fault-tolerant computing.',
      url: 'https://dataintensive.net',
    },
    {
      id: 'res_3',
      title: 'vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention',
      provider: 'UC Berkeley Sky Computing Lab',
      type: 'Documentation',
      level: 'Intermediate',
      readTime: '45 min',
      category: 'docs',
      tags: ['vLLM', 'PagedAttention', 'Continuous Batching'],
      description: 'Complete documentation for high-throughput model serving and Multi-LoRA runtime configs.',
      url: 'https://docs.vllm.ai',
    },
    {
      id: 'res_4',
      title: 'Let’s build GPT: from scratch, in code, spelled out.',
      provider: 'Andrej Karpathy',
      type: 'YouTube',
      level: 'Intermediate',
      readTime: '2h 15m',
      category: 'youtube',
      tags: ['Transformers', 'PyTorch', 'Self-Attention'],
      description: 'Comprehensive line-by-line breakdown and training script for decoder-only language models.',
      url: 'https://youtube.com',
    },
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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            ENGINEERING RFCs, PAPERS &amp; SYSTEM CHEATSHEETS
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Resources Library
          </h1>
          <p className="text-sm text-slate-500">
            Curated technical knowledge base to accelerate your architectural depth and interview readiness.
          </p>
        </div>

        <button
          type="button"
          onClick={() => triggerToast('Custom resource submission modal opened.')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-2xs transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Resource Categories Row (8 cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-start p-3 rounded-xl transition-all text-left shadow-2xs border ${
                isActive
                  ? 'bg-blue-50/80 border-primary text-primary font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${
                  isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold leading-tight line-clamp-1">{cat.name}</span>
              <span className="font-mono text-[10px] text-slate-400 mt-0.5">{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* Recommended For You Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="font-bold text-base text-slate-900">Recommended for You</h2>
            <span className="hidden sm:inline text-xs text-slate-400">
              Personalized based on your AI Engineer goal and target roles.
            </span>
          </div>
          <button
            type="button"
            onClick={() => triggerToast('Viewing all 18 personalized recommendations...')}
            className="text-xs font-semibold text-primary hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedItems.map((rec) => {
            const isSaved = savedIds.includes(rec.id);
            const Icon = rec.icon;
            return (
              <div
                key={rec.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${rec.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">{rec.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span className="font-medium text-slate-700">{rec.provider}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {rec.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {rec.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSave(rec.id, rec.title)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isSaved ? 'text-primary bg-blue-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content 2-Column Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sub-tabs & Search */}
          <div className="flex items-center gap-4 border-b border-slate-200 pb-2 text-xs">
            {['All Resources', 'Saved', 'Completed', 'In Progress', 'Bookmarks'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-1.5 font-semibold transition-all relative ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, paper title, framework, or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary shadow-2xs"
            />
          </div>

          {/* Feed */}
          <div className="space-y-3">
            {resourceFeed.map((item) => {
              const isSaved = savedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                          {item.type}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">{item.readTime}</span>
                        <span className="font-medium text-[11px] text-slate-500">· {item.provider}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{item.title}</h3>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleSave(item.id, item.title)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved ? 'text-primary bg-blue-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Popular Topics Cloud */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Popular Engineering Topics</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                'LLMs',
                'vLLM',
                'eBPF',
                'Raft Consensus',
                'Triton Kernels',
                'Quantization (AWQ)',
                'Kubernetes',
                'Vector Databases',
                'System Design',
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSearchQuery(topic)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Top Creators / Channels */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Featured AI Creators</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Andrej Karpathy', field: 'Deep Learning & Neural Networks', sub: '850k Subs' },
                { name: 'Sebastian Raschka', field: 'LLM Architectures & PyTorch', sub: 'Book Author' },
                { name: 'Tri Dao', field: 'FlashAttention & GPU Hardware', sub: 'Princeton / Stanford' },
              ].map((creator, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-none">
                  <div>
                    <h4 className="font-bold text-slate-900">{creator.name}</h4>
                    <p className="text-[11px] text-slate-400">{creator.field}</p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">{creator.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
