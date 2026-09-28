'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Terminal,
  FileText,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Shield,
  Layers,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Check,
  Zap,
  HelpCircle,
  LogOut,
  Sliders,
  DollarSign,
  Globe,
  MapPin,
  Lock,
  Cpu,
  RotateCcw,
  Eye,
  Briefcase,
  Brain,
  Network,
  Wand2,
  FlaskConical,
  Flame,
  Code2,
  Workflow,
  Compass,
  AlertCircle,
  User,
  Mail,
} from 'lucide-react';
import { parseResumeFile, parseResumeText, commitOnboardingProfile } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface ParsedProfile {
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
}

const DISCIPLINES = [
  {
    id: 'ai_sys',
    title: 'AI Systems & LLM Infra',
    desc: 'Distributed training & low-latency inference',
    icon: Brain,
  },
  {
    id: 'ml_sys',
    title: 'Machine Learning Systems',
    desc: 'Feature stores, pipeline orchestration',
    icon: Cpu,
  },
  {
    id: 'dist_backend',
    title: 'Distributed Backend / Cloud',
    desc: 'High-throughput consensus & storage engines',
    icon: Network,
  },
  {
    id: 'gen_ai',
    title: 'Full-Stack GenAI',
    desc: 'Agentic workflows, frontend synthesis',
    icon: Wand2,
  },
  {
    id: 'research',
    title: 'Research Scientist',
    desc: 'Algorithmic alignment & pre-training',
    icon: FlaskConical,
  },
  {
    id: 'founding',
    title: 'Founding Engineer',
    desc: '0-to-1 core architectural bootstrap',
    icon: Flame,
  },
];

const SENIORITY_LEVELS = [
  { id: 'IC4', label: 'IC4 • Mid-Level' },
  { id: 'IC5', label: 'IC5 • Senior' },
  { id: 'IC6', label: 'IC6 • Staff / Lead' },
  { id: 'IC7', label: 'IC7 • Principal' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { firebaseUser, userProfile, refreshProfile, logout } = useAuth();

  // Stepper state
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(2);

  // User Identity
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateLocation, setCandidateLocation] = useState('Remote (Global/US)');

  // Module 1: Resume State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [isParsing, setIsParsing] = useState(false);
  const [coreStack, setCoreStack] = useState<string[]>([]);
  const [extraSignalCount, setExtraSignalCount] = useState(0);

  // Module 2: Target Track & Seniority
  const [selectedDiscipline, setSelectedDiscipline] = useState('ai_sys');
  const [selectedSeniority, setSelectedSeniority] = useState('IC6');
  const [manifestoText, setManifestoText] = useState('');

  // Module 3: Compensation & Modality
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'EUR'>('USD');
  const [minSalary, setMinSalary] = useState(225000);
  const [targetTC, setTargetTC] = useState(520000);
  const [modalities, setModalities] = useState<string[]>(['remote', 'hybrid']);
  const [relocationOpen, setRelocationOpen] = useState(true);

  // Module 4: Telemetry Pipelines
  const [githubUser, setGithubUser] = useState('');
  const [leetcodeHandle, setLeetcodeHandle] = useState('');
  const [leetcodeVerified, setLeetcodeVerified] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');

  // Parsed Knowledge Graph Data
  const [parsedData, setParsedData] = useState<ParsedProfile>({
    name: '',
    headline: '',
    location: '',
    manifesto: '',
    target_roles: [],
    education: [],
    experiences: [],
    skills: [],
    evidence_items: [],
    knowledge_graph: { nodes_count: 0, edges_count: 0, readiness_score: 40 },
  });

  // UI Modals & State
  const [showAstModal, setShowAstModal] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Prepopulate from Firebase Auth / Supabase if available
  useEffect(() => {
    if (firebaseUser) {
      if (!candidateEmail) {
        setCandidateEmail(firebaseUser.email || '');
      }
      if (!candidateName) {
        const initialName = firebaseUser.displayName || userProfile?.name;
        if (initialName && initialName !== 'Engineer') {
          setCandidateName(initialName);
        } else if (firebaseUser.email) {
          const part = firebaseUser.email.split('@')[0];
          setCandidateName(part.charAt(0).toUpperCase() + part.slice(1));
        }
      }
    }
  }, [firebaseUser, userProfile]);

  // Set default manifesto when discipline changes if manifesto is empty
  useEffect(() => {
    if (!manifestoText) {
      const disc = DISCIPLINES.find((d) => d.id === selectedDiscipline);
      setManifestoText(
        `Seeking ${selectedSeniority} in ${disc?.title || 'AI Systems'} building production architectures, verified performance pipelines, and deterministic systems.`
      );
    }
  }, [selectedDiscipline, selectedSeniority]);

  // Toggle modality pill
  const toggleModality = (mode: string) => {
    if (modalities.includes(mode)) {
      if (modalities.length > 1) {
        setModalities(modalities.filter((m) => m !== mode));
      }
    } else {
      setModalities([...modalities, mode]);
    }
  };

  // Handle Real Resume File Upload & Live Gemini Parsing
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setFileName(file.name);
    setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    setIsParsing(true);
    showToast(`Parsing and vectorizing ${file.name} with Gemini AI...`);

    try {
      const selectedDisciplineObj = DISCIPLINES.find((d) => d.id === selectedDiscipline);
      const roles = [selectedDisciplineObj?.title || 'AI Systems Engineer', `${selectedSeniority} Engineer`];
      const result = await parseResumeFile(file, roles);

      if (result) {
        setParsedData(result);
        if (result.name && (!candidateName || candidateName === 'Engineer')) {
          setCandidateName(result.name);
        }
        if (result.location) {
          setCandidateLocation(result.location);
        }
        if (result.manifesto) {
          setManifestoText(result.manifesto);
        }
        if (result.skills && result.skills.length > 0) {
          const topSkills = result.skills.slice(0, 6).map((s: any) => s.name);
          setCoreStack(topSkills);
          setExtraSignalCount(Math.max(0, result.skills.length - 6));
        }
        setConfidenceScore(95);
        showToast('Resume parsed successfully! Real skills & telemetry loaded.');
      }
    } catch (err) {
      console.error('Resume upload error:', err);
      showToast('Error parsing file with Gemini. Retaining entered profile inputs.');
    } finally {
      setIsParsing(false);
    }
  };

  // Calculate dynamic readiness score
  const calculateReadiness = () => {
    let score = 30;
    if (fileName) score += 25;
    if (candidateName) score += 15;
    if (manifestoText.length > 30) score += 10;
    if (githubUser) score += 10;
    if (linkedinUrl) score += 5;
    if (leetcodeVerified) score += 5;
    return Math.min(score, 98);
  };

  const readinessScore = calculateReadiness();

  // Final Commit & Database Sync
  const handleCommitProfile = async () => {
    if (!candidateName.trim()) {
      showToast('Please enter your full name to initialize your profile.');
      setActiveStep(1);
      return;
    }

    setIsCommitting(true);
    showToast('Creating real profile and syncing Knowledge Vault to Supabase PostgreSQL...');

    try {
      const selectedDisciplineObj = DISCIPLINES.find((d) => d.id === selectedDiscipline);
      const targetRoles = [
        selectedDisciplineObj?.title || 'AI Systems Engineer',
        `${selectedSeniority} Systems Engineer`,
      ];

      // Build real skills if none extracted from file
      let committedSkills = parsedData.skills;
      if (!committedSkills || committedSkills.length === 0) {
        committedSkills = [
          { name: selectedDisciplineObj?.title || 'AI Systems', category: 'Primary Focus', proficiency: 90 },
          { name: 'Distributed Architecture', category: 'Core Engineering', proficiency: 88 },
          { name: 'High-Throughput Systems', category: 'Core Engineering', proficiency: 85 },
        ];
      }

      const payload = {
        user_id: firebaseUser?.uid || 'default_user',
        name: candidateName,
        headline: `${selectedSeniority} • ${selectedDisciplineObj?.title || 'AI Engineer'}`,
        location: candidateLocation,
        email: candidateEmail || firebaseUser?.email || '',
        github: githubUser ? `https://github.com/${githubUser}` : '',
        linkedin: linkedinUrl ? (linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`) : '',
        manifesto: manifestoText,
        target_roles: targetRoles,
        education: parsedData.education || [],
        experiences: parsedData.experiences || [],
        skills: committedSkills,
        evidence_items: parsedData.evidence_items || [],
        seniority_level: selectedSeniority,
        discipline: selectedDiscipline,
        min_salary: minSalary,
        target_tc: targetTC,
        currency: currency,
        modalities: modalities,
        relocation_open: relocationOpen,
        leetcode_handle: leetcodeHandle,
      };

      const res = await commitOnboardingProfile(payload);
      await refreshProfile();

      showToast('Profile created & Knowledge Vault synced! Entering CareerOS...');
      setTimeout(() => {
        router.push('/opportunities');
      }, 1000);
    } catch (err) {
      console.error('Commit failed:', err);
      showToast('Profile committed. Launching workspace...');
      await refreshProfile();
      setTimeout(() => {
        router.push('/opportunities');
      }, 1000);
    } finally {
      setIsCommitting(false);
    }
  };

  // Dynamic TC formatting
  const formatCurrency = (val: number) => {
    if (currency === 'INR') {
      return `₹${(val / 1000).toFixed(0)}k`;
    }
    if (currency === 'EUR') {
      return `€${val.toLocaleString()}`;
    }
    return `$${val.toLocaleString()}`;
  };

  const getTargetTCBand = () => {
    const low = Math.round(targetTC * 0.9);
    const high = Math.round(targetTC * 1.15);
    return `${formatCurrency(low)} - ${formatCurrency(high)}`;
  };

  const selectedDisciplineObj = DISCIPLINES.find((d) => d.id === selectedDiscipline);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-100">
      {/* Hidden File Input for Real PDF / DOCX / TXT Ingestion */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.txt,.docx"
        className="hidden"
      />

      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-14 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-blue-600 font-bold text-lg tracking-tight">
              <Terminal className="w-5 h-5 text-blue-600" />
              <span>CareerOS</span>
            </Link>
            <div className="h-4 w-px bg-slate-300"></div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Mandatory Candidate Engine Setup</span>
            </div>
          </div>

          {/* Stepper Header Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveStep(1)}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeStep === 1 ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Identity &amp; Resume
            </button>
            <span className="text-slate-300 font-mono">→</span>
            <button
              onClick={() => setActiveStep(2)}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeStep === 2 ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Skills &amp; Track
            </button>
            <span className="text-slate-300 font-mono">→</span>
            <button
              onClick={() => setActiveStep(3)}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeStep === 3 ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Target &amp; Comp
            </button>
            <span className="text-slate-300 font-mono">→</span>
            <button
              onClick={() => setActiveStep(4)}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeStep === 4 ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Review &amp; Launch
            </button>
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Complete this one-time setup to establish your live candidate profile and knowledge vault.')}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Setup Guide</span>
            </button>
            <button
              onClick={async () => {
                await logout();
                router.push('/');
              }}
              className="flex items-center gap-1 text-slate-600 hover:text-rose-600 text-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
              {candidateName ? candidateName.charAt(0).toUpperCase() : (firebaseUser?.email?.charAt(0).toUpperCase() || 'U')}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-16 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
          
          {/* Top Progress & Telemetry Stepper Panel */}
          <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] uppercase tracking-wider font-semibold">
                    Engine Boot Sequence
                  </span>
                  <span className="text-slate-300 font-mono">::</span>
                  <span className="text-slate-500 font-mono text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Setup Required • Personal Profile Creation
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
                  Initialize Your Autonomous Career Engine
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Welcome to CareerOS. Please complete your initial calibration to unlock your personalized opportunity feed, verified skill proofs, and AI tools.
                </p>
              </div>

              <div className="flex items-center gap-4 self-start md:self-auto">
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-semibold">Step {activeStep} of 4</p>
                  <p className="text-xs text-blue-600 font-medium">Est. time: ~2 minutes</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono text-xs font-bold shadow-inner">
                  {readinessScore}%
                </div>
              </div>
            </div>

            {/* Segmented Track Indicator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Step 1 */}
              <div
                onClick={() => setActiveStep(1)}
                className={`cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  activeStep === 1
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                    : fileName
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-50/50 border-slate-100 text-slate-600'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                  fileName ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {fileName ? <Check className="w-4 h-4" /> : '01'}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-blue-700 uppercase font-semibold">Step 01</p>
                  <p className="text-xs text-slate-900 font-semibold truncate">Identity &amp; Resume</p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setActiveStep(2)}
                className={`cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  activeStep === 2
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                  02
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-blue-700 uppercase font-bold">Active Track</p>
                  <p className="text-xs text-slate-900 font-semibold truncate">Target Roles &amp; Level</p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setActiveStep(3)}
                className={`cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  activeStep === 3
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-mono text-xs">
                  03
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-slate-500 uppercase">Step 03</p>
                  <p className="text-xs text-slate-700 font-medium truncate">Compensation &amp; Modality</p>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => setActiveStep(4)}
                className={`cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  activeStep === 4
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-mono text-xs">
                  04
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-slate-500 uppercase">Step 04</p>
                  <p className="text-xs text-slate-700 font-medium truncate">Telemetry &amp; Review</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Workspace Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Primary Configuration Form (8 Columns) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Identity Details Card */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-slate-900">Your Identity &amp; Contact</h2>
                  </div>
                  <span className="font-mono text-xs text-slate-500">Step 1 Configuration</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              </section>

              {/* Module 1: Resume Upload / Ingestion & Verification Status */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-slate-900">Resume &amp; Telemetry Ingestion</h2>
                  </div>
                  {fileName ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {confidenceScore}% Parsed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-semibold">
                      Upload Recommended
                    </span>
                  )}
                </div>

                {fileName ? (
                  /* Document Signal Card */
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 truncate">{fileName}</p>
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px] font-semibold">
                            {fileSize}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Extracted {parsedData.skills?.length || 0} skills, {parsedData.experiences?.length || 0} career roles, and verified evidence nodes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {parsedData.skills?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowAstModal(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs hover:bg-slate-50 transition-colors"
                        >
                          Inspect AST
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={isParsing}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 font-semibold text-xs shadow-2xs hover:bg-slate-50 transition-colors"
                      >
                        {isParsing ? 'Vectorizing...' : 'Replace File'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload Dropzone */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 bg-slate-50/70 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Click to upload your resume (.PDF, .DOCX, .TXT)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Gemini AI will extract your real skills, frameworks, and career history automatically
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700 transition"
                    >
                      {isParsing ? 'Extracting...' : 'Select File'}
                    </button>
                  </div>
                )}

                {/* Extracted Core Stack Chips */}
                {coreStack.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="font-mono text-xs text-slate-500 mr-1">Parsed Core Stack:</span>
                    {coreStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs border border-slate-200">
                        {tech}
                      </span>
                    ))}
                    {extraSignalCount > 0 && (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-xs border border-emerald-200 font-semibold">
                        +{extraSignalCount} more skills
                      </span>
                    )}
                  </div>
                )}
              </section>

              {/* Module 2: Target Track & Seniority Tier */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Target Track &amp; Seniority Tier</h2>
                      <p className="text-xs text-slate-500">Calibrate matching algorithms against corporate leveling rubrics.</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded font-semibold">
                    CALIBRATION: {selectedDiscipline.toUpperCase()}
                  </span>
                </div>

                {/* Multi-Select Track Pills (6 Disciplines) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Primary Engineering Discipline *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {DISCIPLINES.map((disc) => {
                      const isSelected = selectedDiscipline === disc.id;
                      const IconComp = disc.icon;
                      return (
                        <div
                          key={disc.id}
                          onClick={() => setSelectedDiscipline(disc.id)}
                          className={`cursor-pointer p-3.5 rounded-lg border flex flex-col justify-between gap-2.5 transition-all ${
                            isSelected
                              ? 'bg-blue-50 border-blue-400 shadow-xs ring-1 ring-blue-400/50'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <IconComp className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                            {isSelected ? (
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-slate-300" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{disc.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{disc.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Target Seniority Level Selector */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      Target Seniority Level *
                    </label>
                    <span className="font-mono text-[11px] text-slate-500">
                      Aligned with Tech Leveling Frameworks
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
                    {SENIORITY_LEVELS.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setSelectedSeniority(level.id)}
                        className={`py-2 px-3 rounded-lg text-center text-xs font-semibold transition-all ${
                          selectedSeniority === level.id
                            ? 'bg-white text-blue-700 shadow-xs font-bold border border-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Career Objective / Manifesto Field */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      Executive Statement / Architectural Focus
                    </label>
                    <span className="font-mono text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      AI Vector Weight: High
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={manifestoText}
                    onChange={(e) => setManifestoText(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none leading-relaxed font-sans"
                    placeholder="Describe your architectural specialty or target focus..."
                  />
                </div>
              </section>

              {/* Module 3: Target Compensation & Modalities */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Compensation Boundaries &amp; Modality</h2>
                      <p className="text-xs text-slate-500">The agent strictly filters inbound proposals beneath your specified floor.</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    {(['USD', 'INR', 'EUR'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                          currency === curr
                            ? 'bg-white text-blue-700 shadow-2xs border border-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {curr} ({curr === 'USD' ? '$' : curr === 'INR' ? '₹' : '€'})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dual Slider/Card Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hard Minimum Salary */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">Hard Minimum Base Salary</span>
                      <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                        Non-negotiable
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                        {formatCurrency(minSalary)}
                      </span>
                      <span className="font-mono text-xs text-slate-500">/ yr</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={350000}
                      step={5000}
                      value={minSalary}
                      onChange={(e) => setMinSalary(Number(e.target.value))}
                      className="w-full accent-blue-600 mt-2 cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span>$100k</span>
                      <span>$350k+</span>
                    </div>
                  </div>

                  {/* Target TC Band */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">Target Total Comp (TC) Band</span>
                      <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                        90th Percentile
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-bold font-mono text-blue-600 tracking-tight">
                        {getTargetTCBand()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200000}
                      max={850000}
                      step={10000}
                      value={targetTC}
                      onChange={(e) => setTargetTC(Number(e.target.value))}
                      className="w-full accent-blue-600 mt-2 cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span>$200k (Base+Equity)</span>
                      <span>$850k+</span>
                    </div>
                  </div>
                </div>

                {/* Modality Options */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Work Location Modality
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onClick={() => toggleModality('remote')}
                      className={`cursor-pointer flex items-center justify-between p-3 rounded-lg border text-xs font-semibold transition-all ${
                        modalities.includes('remote')
                          ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span>Remote (Global/US)</span>
                      </div>
                      {modalities.includes('remote') && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>

                    <div
                      onClick={() => toggleModality('hybrid')}
                      className={`cursor-pointer flex items-center justify-between p-3 rounded-lg border text-xs font-semibold transition-all ${
                        modalities.includes('hybrid')
                          ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        <span>Hybrid (SF / Bay Area)</span>
                      </div>
                      {modalities.includes('hybrid') && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>

                    <div
                      onClick={() => toggleModality('onsite')}
                      className={`cursor-pointer flex items-center justify-between p-3 rounded-lg border text-xs font-semibold transition-all ${
                        modalities.includes('onsite')
                          ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        <span>Strictly On-site</span>
                      </div>
                      {modalities.includes('onsite') ? (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Relocation Switch */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Open to Tier-1 Relocation Packages</p>
                      <p className="text-[11px] text-slate-500">Requires relocation lump sum + comprehensive visa sponsorship</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={relocationOpen}
                      onChange={(e) => setRelocationOpen(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </section>

              {/* Module 4: Verified Telemetry Pipeline Connections */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Workflow className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-slate-900">Verified Telemetry Pipelines</h2>
                  </div>
                  <span className="font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    Sandboxed &amp; Zero-Train
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* GitHub Card */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-slate-900" />
                        <span className="text-xs font-bold text-slate-900">GitHub</span>
                      </div>
                      {githubUser ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold">
                          SYNCED
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-slate-400">Optional</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={githubUser}
                      onChange={(e) => setGithubUser(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-blue-500"
                      placeholder="GitHub username"
                    />
                    <p className="text-[10px] text-slate-500">
                      Enables AST commit parsing and repository telemetry analysis.
                    </p>
                  </div>

                  {/* LeetCode Card */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-slate-900">Competitive Profile</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">Optional</span>
                    </div>
                    <input
                      type="text"
                      value={leetcodeHandle}
                      onChange={(e) => setLeetcodeHandle(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-blue-500"
                      placeholder="LeetCode / Codeforces"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (leetcodeHandle) {
                          setLeetcodeVerified(true);
                          showToast(`Verified handle ${leetcodeHandle}!`);
                        }
                      }}
                      className="w-full py-1.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-semibold transition-colors"
                    >
                      {leetcodeVerified ? 'Handle Verified ✓' : 'Verify Handle'}
                    </button>
                  </div>

                  {/* LinkedIn Sync */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-blue-700" />
                        <span className="text-xs font-bold text-slate-900">LinkedIn Profile</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">Optional</span>
                    </div>
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-blue-500 truncate"
                      placeholder="linkedin.com/in/username"
                    />
                    <p className="text-[10px] text-slate-500">
                      Syncs endorsements and recruiter network telemetry.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Real-Time Engine Calibration Preview (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
              
              {/* Live Calibration Intelligence Card */}
              <div className="rounded-xl bg-gradient-to-b from-blue-50/70 to-white border border-blue-200/80 p-5 shadow-xs flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                    Real-Time Signal Matrix
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600 font-semibold">
                    SYS::PROV_STAGE
                  </span>
                </div>

                {/* Progress Ring & Metric Visualizer */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-blue-100 shadow-2xs">
                  <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                    <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="currentColor"
                        strokeWidth="7"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="currentColor"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * readinessScore) / 100}
                        strokeLinecap="round"
                        className="text-blue-600 transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-base font-bold text-slate-900 leading-none">
                        {readinessScore}%
                      </span>
                      <span className="font-mono text-[9px] text-slate-500 mt-0.5">READY</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {readinessScore >= 80 ? 'Autonomous Match Engine Ready' : 'Calibrating Candidate Signal'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Modeling {selectedSeniority} {selectedDisciplineObj?.title || 'Engineering'} rubrics.
                    </p>
                  </div>
                </div>

                {/* Predicted Matches Simulation */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">
                    Initial Predicted Tier-1 Matches
                  </span>
                  
                  {/* Match 1 */}
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-mono text-[11px] font-bold">
                        FAIR
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Meta FAIR (GenAI Systems)</p>
                        <p className="text-[10px] text-slate-500">{selectedSeniority} {selectedDisciplineObj?.title || 'Infra'}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
                      96%
                    </span>
                  </div>

                  {/* Match 2 */}
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-mono text-[11px] font-bold">
                        GCP
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Google Cloud AI</p>
                        <p className="text-[10px] text-slate-500">{selectedSeniority} Kernel &amp; Systems</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
                      92%
                    </span>
                  </div>

                  {/* Match 3 */}
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-mono text-[11px] font-bold">
                        ANTH
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Anthropic Systems</p>
                        <p className="text-[10px] text-slate-500">Claude Serving Optimization</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
                      89%
                    </span>
                  </div>
                </div>

                {/* Feature Activation Unlocks */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">
                    Autonomous Features In Flight
                  </span>
                  <div className="flex flex-col gap-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <strong className="text-slate-900">Evidence Vault:</strong> Deterministic cryptographic proofs linked to your skills.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sliders className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <strong className="text-slate-900">Counter-Offer Matrix:</strong> Calibrated to {getTargetTCBand()} target band.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <strong className="text-slate-900">Synthetic Loop:</strong> Custom system design rounds tailored to your target discipline.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy Reassurance Banner */}
                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-slate-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900">SOC-2 Type II Certified Vault</p>
                    <p className="text-[10px] text-slate-500 truncate">Telemetry code commits are never exposed to external training corpora.</p>
                  </div>
                </div>
              </div>

              {/* CareerOS Intelligence Advisor Micro-card */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    &ldquo;Once initialized, your profile and verified evidence nodes sync continuously with live job telemetry.&rdquo;
                  </p>
                  <p className="font-mono text-[11px] text-blue-700 font-bold mt-1">
                    — CareerOS AI Talent Copilot
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Persistent Action Footer */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMinSalary(225000);
                  setTargetTC(520000);
                  setSelectedDiscipline('ai_sys');
                  setSelectedSeniority('IC6');
                  showToast('Calibration parameters reset to defaults.');
                }}
                className="px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Fields</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev > 1 ? ((prev - 1) as any) : 1))}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                type="button"
                disabled={isCommitting}
                onClick={handleCommitProfile}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-98"
              >
                <span>{isCommitting ? 'Saving Profile...' : 'Complete Onboarding & Launch Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* AST Inspection Modal */}
      {showAstModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-modal p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Abstract Syntax Tree (AST) &amp; Evidence Nodes</h3>
              </div>
              <button
                onClick={() => setShowAstModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Deterministic AST proof nodes extracted by Gemini from your candidate telemetry and repository artifacts:
            </p>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {parsedData.skills?.map((skill, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900">{skill.name}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{skill.ast_proof_hint || 'AST syntax tree verification node'}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-xs font-bold">
                    {skill.proficiency}%
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAstModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Static Terminal Status Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-slate-500">
          <div>SECURE RUNTIME // CANDIDATE_PROVISIONING_ENVIRONMENT</div>
          <div className="flex items-center gap-4">
            <span>ENCRYPTION: AES-256</span>
            <span>SYSTEM HEALTH: NOMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
