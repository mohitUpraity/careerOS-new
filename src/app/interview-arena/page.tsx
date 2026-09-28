'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Radio,
  Mic,
  MicOff,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  RefreshCw,
  Clock,
  ChevronRight,
  Send,
} from 'lucide-react';
import { mockInterviewSession } from '@/data/mock/interviewData';
import { useAuth } from '@/context/AuthContext';

export default function InterviewArenaPage() {
  const { user, profile } = useAuth();
  const [isMicOn, setIsMicOn] = useState(true);
  const [activeCanvasTab, setActiveCanvasTab] = useState<'schematic' | 'code' | 'benchmarks'>('schematic');
  const [transcript, setTranscript] = useState(mockInterviewSession.transcript);
  const [inputSpeech, setInputSpeech] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const displayName = profile?.name || user?.displayName || user?.email?.split('@')[0] || 'Candidate';

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendCandidateTurn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSpeech.trim()) return;

    const newTurn = {
      id: `tr_${Date.now()}`,
      speaker: 'CANDIDATE' as const,
      speakerName: `${displayName} (Candidate)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputSpeech,
      chips: [{ label: '+Dynamic Concept: Live Evaluation Active', type: 'positive' as const }],
    };

    setTranscript([...transcript, newTurn]);
    setInputSpeech('');
    triggerToast('Voice response transcribed and processed by AI Evaluator.');
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Simulation Telemetry Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              LIVE SIMULATION ACTIVE
            </span>
            <span className="font-mono text-xs text-slate-500 font-semibold">
              Latency: 38ms • WebRTC Audio Stream Active
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-xs font-semibold">
              {mockInterviewSession.benchmarkStandard}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Time Elapsed: <strong className="text-slate-900">{mockInterviewSession.timeElapsed}</strong> / {mockInterviewSession.timeTotal}</span>
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Hint requested: Consider asynchronous prefill/decode split.')}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
            >
              Request Hint (2 left)
            </button>
            <Link
              href="/interview-debrief"
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors shadow-2xs"
            >
              End Round &amp; Debrief
            </Link>
          </div>
        </div>

        {/* Round Topic & Target Position */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {mockInterviewSession.role} — System Design &amp; Scalability
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Topic: {mockInterviewSession.topic}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 self-start sm:self-auto">
            Focus: KV-Cache &amp; PagedAttention
          </span>
        </div>
      </div>

      {/* 2. Main Master Workspace (Left 65% / Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7/8 COLUMNS: Synthetic Interviewer HUD, Speech Transcript & Canvas */}
        <div className="lg:col-span-8 space-y-6">
          {/* Synthetic Interviewer Audio HUD */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-5 shadow-card border border-slate-700 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-sm text-white shadow-xs">
                  AI
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{mockInterviewSession.interviewer.name}</h3>
                  <p className="text-xs text-slate-300 font-mono">{mockInterviewSession.interviewer.title}</p>
                </div>
              </div>

              {/* Dynamic Waveform Visualizer Simulation */}
              <div className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-lg border border-white/10">
                <div className="w-1 bg-emerald-400 h-3 animate-pulse rounded-full" />
                <div className="w-1 bg-emerald-400 h-6 animate-pulse delay-75 rounded-full" />
                <div className="w-1 bg-emerald-400 h-4 animate-pulse delay-150 rounded-full" />
                <div className="w-1 bg-emerald-400 h-7 animate-pulse rounded-full" />
                <div className="w-1 bg-emerald-400 h-5 animate-pulse delay-100 rounded-full" />
                <div className="w-1 bg-emerald-400 h-2 animate-pulse rounded-full" />
                <span className="text-[11px] font-mono text-emerald-300 font-semibold ml-2">
                  Speaking • 99.4% STT
                </span>
              </div>

              {/* Mic Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMicOn(!isMicOn);
                    triggerToast(isMicOn ? 'Microphone muted' : 'Microphone unmuted (Live streaming)');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isMicOn
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-900'
                      : 'bg-rose-500 hover:bg-rose-600 text-white'
                  }`}
                >
                  {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  <span>{isMicOn ? 'Mic Active' : 'Mic Muted'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Speech-to-Text Transcript Feed */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span>Turn-by-Turn Speech-to-Text Transcript</span>
              </h3>
              <span className="font-mono text-[11px] text-slate-400">Deepgram Nova-2 STT</span>
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {transcript.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl text-xs space-y-2 ${
                    item.speaker === 'INTERVIEWER'
                      ? 'bg-blue-50/70 border border-blue-100 text-slate-900'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 ml-4'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className={`font-bold ${item.speaker === 'INTERVIEWER' ? 'text-primary' : 'text-slate-700'}`}>
                      {item.speakerName}
                    </span>
                    <span className="text-slate-400">{item.timestamp}</span>
                  </div>

                  <p className="leading-relaxed text-slate-800">{item.content}</p>

                  {item.chips && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {item.chips.map((chip, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                            chip.type === 'positive'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {chip.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Candidate Voice/Text Input Form */}
            <form onSubmit={handleSendCandidateTurn} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Speak into microphone or type your architectural explanation here..."
                value={inputSpeech}
                onChange={(e) => setInputSpeech(e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
              >
                <span>Submit Turn</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Multi-Modal Interactive Architecture Canvas */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">Interactive Multi-Modal Canvas</h3>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveCanvasTab('schematic')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeCanvasTab === 'schematic' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  [Architecture Schematic]
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCanvasTab('code')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeCanvasTab === 'code' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  [Python / Triton Solution]
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCanvasTab('benchmarks')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeCanvasTab === 'benchmarks' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  [Cluster Benchmarks]
                </button>
              </div>
            </div>

            {/* Tab 1: Architecture Schematic */}
            {activeCanvasTab === 'schematic' && (
              <div className="bg-slate-900 text-white p-6 rounded-xl space-y-6 font-mono text-xs border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-3 border-b border-slate-800">
                  <span>DISAGGREGATED INFERENCE TOPOLOGY (8x H100 80GB SXM5)</span>
                  <span className="text-emerald-400">● NVLink Mesh 900 GB/s Active</span>
                </div>

                {/* SVG/HTML Diagram Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {/* Node 1 */}
                  <div className="p-4 rounded-lg bg-slate-800/90 border border-blue-500/40 space-y-2">
                    <span className="text-[10px] text-blue-400 uppercase font-bold">Ingress Layer</span>
                    <h4 className="font-bold text-white text-xs">Token Router &amp; Scheduler</h4>
                    <p className="text-[11px] text-slate-400">vLLM Continuous Batching Coordinator</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px]">
                      200ms SLO Bound
                    </span>
                  </div>

                  {/* Node 2 */}
                  <div className="p-4 rounded-lg bg-slate-800/90 border border-emerald-500/40 space-y-2">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold">Inference Fabric</span>
                    <h4 className="font-bold text-white text-xs">Megatron Tensor Parallel Ring</h4>
                    <p className="text-[11px] text-slate-400">8-Way GPU Tensor Slicing</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px]">
                      NVLink All-Reduce Mesh
                    </span>
                  </div>

                  {/* Node 3 */}
                  <div className="p-4 rounded-lg bg-slate-800/90 border border-purple-500/40 space-y-2">
                    <span className="text-[10px] text-purple-400 uppercase font-bold">Memory Pool</span>
                    <h4 className="font-bold text-white text-xs">Tiered Paged KV-Cache</h4>
                    <p className="text-[11px] text-slate-400">Non-contiguous Virtual Blocks</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 text-[10px]">
                      94% Locality on 100k
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-3 border-t border-slate-800">
                  <span>Candidate Verified Model: Disaggregated Prefill &amp; Decode</span>
                  <span className="text-primary-fixed font-semibold">Score: 92/100 Architectural Depth</span>
                </div>
              </div>
            )}

            {/* Tab 2: Python / Triton Solution */}
            {activeCanvasTab === 'code' && (
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-2 border border-slate-800 overflow-x-auto">
                <pre className="text-emerald-400 text-[11px]">
{`@triton.jit
def paged_attention_kernel(
    exp_ptr, kv_cache_ptr, block_tables_ptr,
    seq_lens_ptr, scale, BLOCK_SIZE: tl.constexpr
):
    # Triton non-contiguous memory access kernel
    pid = tl.program_id(0)
    block_id = tl.load(block_tables_ptr + pid)
    offs_m = tl.arange(0, BLOCK_SIZE)
    # Fast fused softmax and tensor memory loads over HBM3e...
    # Zero NVLink broadcast stalls during speculative verify.`}
                </pre>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => triggerToast('Triton spec validation passed! Zero memory leaks.')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                  >
                    Run Spec Validation
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Cluster Benchmarks */}
            {activeCanvasTab === 'benchmarks' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-700 font-bold border-b pb-2">
                  <span>Metric Parameter</span>
                  <span>Target Value</span>
                  <span>Candidate Score</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Time-to-First-Token (TTFT)</span>
                  <span>&lt; 120ms</span>
                  <span className="text-emerald-700 font-bold">84ms (Pass)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Inter-Token Latency (ITL)</span>
                  <span>&lt; 25ms</span>
                  <span className="text-emerald-700 font-bold">18.2ms (Pass)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Speculative Verification Efficiency</span>
                  <span>&gt; 75%</span>
                  <span className="text-emerald-700 font-bold">82.4% (Pass)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: Live Rubric Scorecard & Projected Outcome */}
        <div className="lg:col-span-4 space-y-6 sticky top-20">
          {/* Projected Scorecard Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-5">
            <div>
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Live AI Telemetry &amp; Rubric
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {mockInterviewSession.projectedScore}<span className="text-slate-400 text-lg">/100</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold">
                  STRONG HIRE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">
                {mockInterviewSession.projectedOutcome}
              </p>
            </div>

            {/* Competency Meters */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="font-mono text-xs font-bold text-slate-700">Competency Breakdown</h4>
              {mockInterviewSession.competencies.map((comp, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-700">{comp.name}</span>
                    <span className="font-bold text-slate-900">{comp.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${comp.color} rounded-full`} style={{ width: `${comp.score}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{comp.standard}</span>
                </div>
              ))}
            </div>

            {/* Telemetry Alerts */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-mono text-xs font-bold text-slate-700">Real-time Signals</h4>
              {mockInterviewSession.telemetrySignals.map((signal, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs space-y-0.5 ${
                    signal.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : signal.type === 'positive'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}
                >
                  <p className="font-bold font-mono text-[11px]">{signal.title}</p>
                  <p className="text-[11px] leading-relaxed">{signal.message}</p>
                </div>
              ))}
            </div>

            {/* Multi-Stage Question Stepper */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-mono text-xs font-bold text-slate-700">Question Progression</h4>
              <div className="space-y-1.5">
                {mockInterviewSession.questionStepper.map((st) => (
                  <div
                    key={st.step}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono ${
                      st.status === 'IN_PROGRESS'
                        ? 'bg-primary text-white font-bold'
                        : st.status === 'COMPLETED'
                        ? 'bg-slate-50 text-slate-700 border border-slate-200'
                        : 'text-slate-400'
                    }`}
                  >
                    <span>{st.step}. {st.title}</span>
                    <span>{st.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Sticky Action CTA */}
            <Link
              href="/interview-debrief"
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-colors"
            >
              <span>Complete &amp; Export Full Debrief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
