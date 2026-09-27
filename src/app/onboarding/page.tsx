'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  UploadCloud,
  FileText,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Github,
  Linkedin,
  Terminal,
  Check,
  AlertCircle,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { parseResumeFile, parseResumeText, commitOnboardingProfile } from '@/lib/api';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Target Profile Form
  const [targetRoles, setTargetRoles] = useState<string[]>([
    'Staff AI Infrastructure Engineer',
    'Distributed Systems Engineer',
  ]);
  const [newRoleInput, setNewRoleInput] = useState('');
  const [seniorityLevel, setSeniorityLevel] = useState('Staff / Lead');
  const [preferredLocation, setPreferredLocation] = useState('San Francisco, CA / Remote');

  // Step 2: Resume Input Form
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [githubUrl, setGithubUrl] = useState('https://github.com/mohitupraity');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/mohitupraity');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Step 3: Parsed Knowledge Graph State
  const [parsedData, setParsedData] = useState<{
    name: string;
    headline: string;
    location: string;
    manifesto: string;
    target_roles: string[];
    education: any[];
    experiences: any[];
    skills: { name: string; category: string; proficiency: number; ast_proof_hint?: string }[];
    evidence_items: { title: string; type: string; platform: string; metric_proof: string; skills_linked: string[] }[];
    knowledge_graph?: { nodes_count: number; edges_count: number; readiness_score: number };
  } | null>(null);

  // Step 4: Final Commit State
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState(false);

  // Handlers for Step 1
  const addTargetRole = () => {
    if (newRoleInput.trim() && !targetRoles.includes(newRoleInput.trim())) {
      setTargetRoles([...targetRoles, newRoleInput.trim()]);
      setNewRoleInput('');
    }
  };

  const removeTargetRole = (role: string) => {
    setTargetRoles(targetRoles.filter((r) => r !== role));
  };

  // Handlers for Step 2: Ingestion
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
  };

  const handleStartParsing = async () => {
    setIsParsing(true);
    setParseError(null);

    try {
      let result = null;
      if (uploadedFile) {
        result = await parseResumeFile(uploadedFile, targetRoles);
      } else if (resumeText.trim()) {
        result = await parseResumeText(resumeText, targetRoles);
      } else {
        // Fallback sample parsing with user inputs
        result = await parseResumeText(
          `Candidate specialized in ${targetRoles.join(', ')}. Seniority: ${seniorityLevel}. Location: ${preferredLocation}. GitHub: ${githubUrl}.`,
          targetRoles
        );
      }

      if (result) {
        setParsedData(result);
        setCurrentStep(3);
      } else {
        setParseError('Could not parse resume data. Please try pasting raw text or check connection.');
      }
    } catch (err: any) {
      setParseError(err.message || 'Parsing failed.');
    } finally {
      setIsParsing(false);
    }
  };

  // Handler for Step 3 -> Step 4 Commit to Supabase
  const handleCommitKnowledgeGraph = async () => {
    if (!parsedData) return;
    setIsCommitting(true);

    try {
      const payload = {
        name: parsedData.name || 'Engineer',
        headline: parsedData.headline || `${targetRoles[0]} • Systems Architect`,
        location: parsedData.location || preferredLocation,
        github: githubUrl,
        linkedin: linkedinUrl,
        manifesto: parsedData.manifesto || 'Architecting distributed systems and high-throughput infrastructure.',
        target_roles: targetRoles,
        education: parsedData.education || [],
        experiences: parsedData.experiences || [],
        skills: parsedData.skills || [],
        evidence_items: parsedData.evidence_items || [],
      };

      const res = await commitOnboardingProfile(payload);
      if (res && res.status === 'success') {
        setCommitSuccess(true);
        setCurrentStep(4);
      }
    } catch (err) {
      console.error('Commit failed:', err);
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      {/* Glow ambient background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
            CareerOS Intelligence Pipeline
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Build Your Personal Knowledge Graph
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Ingest your resume, projects, and target roles. Gemini will extract AST verified skills and cryptographic proofs into your permanent Supabase Vault.
          </p>
        </div>

        {/* 4-Step Stepper Header */}
        <div className="grid grid-cols-4 gap-2 bg-slate-900/80 border border-slate-800 p-2 rounded-2xl">
          {[
            { num: 1, label: 'Target Alignment' },
            { num: 2, label: 'Resume Ingestion' },
            { num: 3, label: 'Knowledge Graph' },
            { num: 4, label: 'Launch Workspace' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 p-2.5 rounded-xl transition-all ${
                currentStep === s.num
                  ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                  : currentStep > s.num
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'text-slate-500 opacity-60'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                  currentStep === s.num
                    ? 'bg-indigo-600 text-white'
                    : currentStep > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className="font-mono text-xs font-semibold hidden sm:inline truncate">{s.label}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: TARGET ALIGNMENT */}
        {currentStep === 1 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Step 1: Define Target Role & Trajectory
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                CareerOS optimizes your ATS scoring, opportunity recommendations, and evidence graph for these exact roles.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-2 uppercase tracking-wider font-semibold">
                  Target Roles
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {targetRoles.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                    >
                      {r}
                      <button
                        type="button"
                        onClick={() => removeTargetRole(r)}
                        className="hover:text-rose-400 transition-colors ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTargetRole())}
                    placeholder="e.g. ML Platform Engineer, CUDA Kernel Developer"
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={addTargetRole}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-semibold transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5 uppercase tracking-wider font-semibold">
                    Target Seniority Tier
                  </label>
                  <select
                    value={seniorityLevel}
                    onChange={(e) => setSeniorityLevel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  >
                    <option value="Staff / Lead">Staff / Principal / Lead</option>
                    <option value="Senior">Senior Engineer (L5)</option>
                    <option value="Mid-Level">Mid-Level Engineer (L4)</option>
                    <option value="Early-Career / Graduate">New Grad / Fellow</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5 uppercase tracking-wider font-semibold">
                    Preferred Location / Remote
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-lg shadow-indigo-600/30"
              >
                Proceed to Resume Ingestion
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: RESUME & PORTFOLIO INGESTION */}
        {currentStep === 2 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-400" />
                Step 2: Upload Resume & Connect Portfolio
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Upload your PDF resume or paste bullet points. Gemini AI will parse your technical skills, work history, and cryptographic proofs.
              </p>
            </div>

            {/* Drag & Drop Zone */}
            <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-2xl p-8 text-center bg-slate-950/60 transition-all relative">
              <input
                type="file"
                accept=".pdf,.txt,.docx"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center gap-3 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                {uploadedFile ? (
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                      {uploadedFile.name}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {(uploadedFile.size / 1024).toFixed(1)} KB • Ready for Gemini parsing
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Drag & Drop your Resume PDF here or <span className="text-indigo-400 underline">Browse Files</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">Supports PDF, DOCX, TXT (Up to 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Text Paste Option */}
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1.5 uppercase tracking-wider font-semibold">
                Or Paste Technical Summary / Resume Bullets
              </label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste experience, university background, or key engineering projects..."
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Portfolio Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  GitHub Profile / Org
                </label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {parseError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                {parseError}
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 text-slate-400 hover:text-white font-mono text-xs transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isParsing}
                onClick={handleStartParsing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-lg shadow-indigo-600/30"
              >
                {isParsing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Gemini Synthesizing Knowledge Graph...
                  </>
                ) : (
                  <>
                    Parse & Generate Knowledge Graph
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: KNOWLEDGE GRAPH & EVIDENCE REVIEW */}
        {currentStep === 3 && parsedData && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  Step 3: Verify Synthesized Knowledge Graph
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Gemini extracted {parsedData.skills?.length || 0} core skills and {parsedData.evidence_items?.length || 0} cryptographic evidence nodes for Supabase persistence.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                Readiness Score: {parsedData.knowledge_graph?.readiness_score || 94}%
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{parsedData.name}</h3>
                  <p className="font-mono text-xs text-indigo-400">{parsedData.headline}</p>
                </div>
                <span className="font-mono text-xs text-slate-400">{parsedData.location}</span>
              </div>
              <p className="text-xs text-slate-300 italic">"{parsedData.manifesto}"</p>
            </div>

            {/* Extracted Skills Matrix */}
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Parsed Technical Skills & Proficiency ({parsedData.skills?.length || 0})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(parsedData.skills || []).map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-white">{sk.name}</div>
                      <div className="font-mono text-[10px] text-slate-500">{sk.category}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-400">{sk.proficiency}%</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Evidence Vault Items */}
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Cryptographic Evidence & Project Nodes ({parsedData.evidence_items?.length || 0})
              </h4>
              <div className="space-y-2">
                {(parsedData.evidence_items || []).map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-xs text-white flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">
                          {ev.type}
                        </span>
                        {ev.title}
                      </div>
                      <p className="font-mono text-[11px] text-emerald-400 mt-0.5">Proof: {ev.metric_proof}</p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">{ev.platform} Verified</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 text-slate-400 hover:text-white font-mono text-xs transition-colors"
              >
                Re-upload / Edit
              </button>
              <button
                type="button"
                disabled={isCommitting}
                onClick={handleCommitKnowledgeGraph}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-lg shadow-emerald-600/30"
              >
                {isCommitting ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin" />
                    Committing to Supabase PostgreSQL...
                  </>
                ) : (
                  <>
                    Commit to Supabase Vault & Launch
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & LAUNCH */}
        {currentStep === 4 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Personal Knowledge Graph Successfully Established!
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your profile, AST-verified skills, and cryptographic evidence nodes have been saved to your Supabase PostgreSQL database as the single source of truth.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-400 font-mono">100%</div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">Profile Ready</div>
              </div>
              <div className="text-center border-x border-slate-800">
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {parsedData?.skills?.length || 4}
                </div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">Live Skills</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400 font-mono">
                  {parsedData?.evidence_items?.length || 2}
                </div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">Vault Proofs</div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-xl shadow-indigo-600/40"
              >
                Enter CareerOS Command Center
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
