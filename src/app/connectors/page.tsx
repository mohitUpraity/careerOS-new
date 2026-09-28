'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlugZap,
  RefreshCw,
  Plus,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Github,
  Code2,
  Share2,
  Sparkles,
  Layers,
  ArrowUpRight,
  Filter,
  Check,
  X,
  Clock,
  Terminal,
  AlertCircle,
  Database,
} from 'lucide-react';
import {
  mockConnectors,
  mockExtractedEvidence,
  mockIngestionLogs,
  EvidenceConnector,
  ExtractedEvidenceItem,
  IngestionLog,
} from '@/data/mock/connectorsData';

export default function ConnectorsPage() {
  const [connectors, setConnectors] = useState<EvidenceConnector[]>(mockConnectors);
  const [evidenceItems, setEvidenceItems] = useState<ExtractedEvidenceItem[]>(mockExtractedEvidence);
  const [logs, setLogs] = useState<IngestionLog[]>(mockIngestionLogs);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Connector Form state
  const [selectedProvider, setSelectedProvider] = useState('github');
  const [accountHandle, setAccountHandle] = useState('');
  const [apiToken, setApiToken] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const categories = [
    'All',
    'Code & Repositories',
    'Competitive Programming',
    'Professional Network',
    'AI Models & Datasets',
    'Publications & Writing',
  ];

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    triggerToast('Triggered background crawler across all connected pipelines...');
    setTimeout(() => {
      setIsSyncingAll(false);
      setConnectors((prev) =>
        prev.map((c) =>
          c.status === 'connected' ? { ...c, lastSyncedAt: 'Just now' } : c
        )
      );
      const newLog: IngestionLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        provider: 'Global Crawler',
        action: 'Omni-Channel Sync',
        itemsProcessed: 14,
        status: 'success',
        message: 'Successfully verified and extracted 14 new proof points across GitHub, LeetCode, and Hugging Face.',
      };
      setLogs((prev) => [newLog, ...prev]);
      triggerToast('Omni-channel sync completed! 14 new evidence items parsed.');
    }, 1500);
  };

  const handleSyncSingle = (id: string, name: string) => {
    triggerToast(`Syncing ${name}...`);
    setConnectors((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, lastSyncedAt: 'Syncing...' } : c
      )
    );
    setTimeout(() => {
      setConnectors((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, lastSyncedAt: 'Just now', status: 'connected' } : c
        )
      );
      triggerToast(`${name} synced successfully!`);
    }, 1200);
  };

  const handleApproveEvidence = (id: string) => {
    setEvidenceItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'verified_in_graph' } : item
      )
    );
    triggerToast('Evidence approved and mapped to your verified Skills Graph!');
  };

  const handleDismissEvidence = (id: string) => {
    setEvidenceItems((prev) => prev.filter((item) => item.id !== id));
    triggerToast('Item dismissed from ingestion feed.');
  };

  const handleAddConnector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountHandle.trim()) return;

    const providerNameMap: Record<string, string> = {
      github: 'GitHub',
      leetcode: 'LeetCode',
      linkedin: 'LinkedIn',
      huggingface: 'Hugging Face',
      kaggle: 'Kaggle',
      medium: 'Medium',
      codeforces: 'Codeforces',
    };

    const newConnector: EvidenceConnector = {
      id: `conn_${Date.now()}`,
      name: providerNameMap[selectedProvider] || selectedProvider,
      category: 'Code & Repositories',
      iconType: selectedProvider,
      description: 'Ingesting technical commits, benchmarks, and portfolio proof items.',
      status: 'connected',
      lastSyncedAt: 'Just now',
      verifiedItemsCount: 1,
      accountHandle: accountHandle.startsWith('@') ? accountHandle : `@${accountHandle}`,
      authMethod: 'PAT_TOKEN',
      telemetryStream: `${selectedProvider}.events.v1`,
    };

    setConnectors([newConnector, ...connectors]);
    setIsConnectModalOpen(false);
    setAccountHandle('');
    setApiToken('');
    triggerToast(`Connected ${newConnector.name} pipeline successfully!`);
  };

  const filteredConnectors = connectors.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  const totalConnected = connectors.filter((c) => c.status === 'connected').length;
  const totalEvidenceExtracted = connectors.reduce((acc, c) => acc + (c.verifiedItemsCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              DATA INGESTION &amp; HARVESTING PIPELINE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {totalConnected} Active Connectors
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Evidence Connectors &amp; Automated Harvesters
          </h1>
          <p className="text-sm text-slate-500">
            Automatically crawl, index, and AST-verify real proof-of-work across GitHub, LeetCode, LinkedIn, Hugging Face, Kaggle, and technical publications.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-primary ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>{isSyncingAll ? 'Syncing Ingestion Engine...' : 'Sync All Sources'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsConnectModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Source</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Connected Sources</span>
            <PlugZap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{totalConnected} / {connectors.length}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">All webhooks responding in &lt;140ms</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Verified Proofs Extracted</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{totalEvidenceExtracted}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Mapped to 18 verified skills</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">AST Verification Score</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">98.4%</p>
          <p className="text-[11px] text-purple-600 font-medium mt-0.5">Zero-hallucination guarantee</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pipeline Ingestion Rate</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">Real-Time</p>
          <p className="text-[11px] text-slate-400 mt-0.5">GitHub webhook active</p>
        </div>
      </div>

      {/* 3. Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnectors.map((c) => {
          const isConnected = c.status === 'connected';
          return (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm overflow-hidden">
                      {c.iconType === 'github' && <Github className="w-5 h-5 text-slate-900" />}
                      {c.iconType === 'leetcode' && <Code2 className="w-5 h-5 text-amber-600" />}
                      {c.iconType === 'linkedin' && <Share2 className="w-5 h-5 text-blue-600" />}
                      {c.iconType === 'huggingface' && <Sparkles className="w-5 h-5 text-amber-500" />}
                      {c.iconType === 'kaggle' && <span className="font-mono text-blue-500 font-extrabold text-sm">K</span>}
                      {c.iconType === 'medium' && <span className="font-serif font-black text-slate-900 text-base">M</span>}
                      {c.iconType === 'codeforces' && <Code2 className="w-5 h-5 text-red-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">{c.name}</h3>
                      <p className="text-xs font-mono text-slate-400">{c.accountHandle}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                      }`}
                    ></span>
                    {isConnected ? 'LIVE SYNC' : 'INACTIVE'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-2">
                  {c.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Verified Proofs</span>
                    <span className="text-xs font-bold font-mono text-slate-900 mt-0.5 block">{c.verifiedItemsCount}</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Auth Method</span>
                    <span className="text-xs font-bold font-mono text-primary mt-0.5 block">{c.authMethod}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  Synced {c.lastSyncedAt}
                </span>

                {isConnected ? (
                  <button
                    type="button"
                    onClick={() => handleSyncSingle(c.id, c.name)}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Sync Now</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConnectModalOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-semibold text-[11px] hover:bg-slate-800 transition-colors"
                  >
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Split Section: Live Extracted Evidence & Ingestion Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Extracted Evidence Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Newly Harvested Evidence Feed
              </h2>
              <p className="text-xs text-slate-500">
                Proof points automatically extracted from linked accounts, verified via AST code parsing.
              </p>
            </div>
            <Link
              href="/skills-and-evidence"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Full Evidence Graph</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {evidenceItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-card space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px] font-bold">
                        {item.provider}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{item.extractedAt}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{item.title}</h3>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-bold shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {item.verificationScore}% Score
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                  {item.proofSnippet}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(item.skillsAssociated || item.mappedSkills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 font-medium transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Source</span>
                    </a>

                    {item.status === 'verified_in_graph' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                        <Check className="w-3 h-3" />
                        <span>Mapped to Graph</span>
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDismissEvidence(item.id)}
                          className="px-2 py-1 rounded-lg text-slate-400 hover:text-slate-600 text-[11px] font-medium"
                        >
                          Dismiss
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApproveEvidence(item.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-hover text-white text-[11px] font-semibold shadow-2xs transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve &amp; Map</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Ingestion Logs */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Crawler &amp; Webhook Logs
            </h2>
            <p className="text-xs text-slate-500">
              Live streaming audit trail of AST verification and webhooks.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 text-slate-200 font-mono text-xs space-y-3 shadow-card">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>telemetry.log</span>
              </span>
              <span className="text-[10px] text-emerald-400">STREAMING ACTIVE</span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {logs.map((log) => (
                <div key={log.id} className="text-[11px] space-y-0.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-blue-400 font-bold">[{log.provider}]</span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">{log.message}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
              <span>AST parser v2.4 (libclang + tree-sitter)</span>
              <span>Buffer: 4096 KB</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Connect Source Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                  <PlugZap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Connect Data Source</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsConnectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddConnector} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Select Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-primary bg-white"
                >
                  <option value="github">GitHub (Repositories, PRs, Commits)</option>
                  <option value="leetcode">LeetCode (Algorithm Solutions &amp; Rank)</option>
                  <option value="linkedin">LinkedIn (Technical Posts &amp; Articles)</option>
                  <option value="huggingface">Hugging Face (Models &amp; Benchmarks)</option>
                  <option value="kaggle">Kaggle (Competitions &amp; Notebooks)</option>
                  <option value="medium">Medium / Substack (Engineering Blogs)</option>
                  <option value="codeforces">Codeforces (Contest Submissions)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Username / Profile Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mohitupraity or @handle"
                  value={accountHandle}
                  onChange={(e) => setAccountHandle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Personal Access Token / API Key <span className="text-slate-400 font-normal">(Optional for public profiles)</span>
                </label>
                <input
                  type="password"
                  placeholder="ghp_••••••••••••••••••••"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-primary"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Tokens are stored encrypted via Cloud KMS and only read metadata with read-only scope.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-2xs"
                >
                  Authorize &amp; Start Ingesting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
