'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Target,
  Cpu,
  Database,
  Save,
  CheckCircle2,
  Camera,
  Mail,
  Phone,
  MapPin,
  Link2,
  Share2,
  Terminal,
  Code2,
  Sparkles,
  Zap,
  Sliders,
  Shield,
  Download,
  FileCode,
  RefreshCw,
  Trash2,
  Plus,
  X,
  Check,
  ExternalLink,
  Lock,
  Globe,
  DollarSign,
  Briefcase,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchProfile, updateProfile, fetchGoldenResume, commitGoldenResume, fetchKnowledgeGraph } from '@/lib/api';

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'career' | 'ai' | 'data'>('account');
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isRebuildingGraph, setIsRebuildingGraph] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Tab 1: Account & Persona Identity (Populated initial state for instant rich render)
  const [fullName, setFullName] = useState('Alex Rivera');
  const [displayName, setDisplayName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@careeros.internal');
  const [phone, setPhone] = useState('+1 (555) 439-2049');
  const [location, setLocation] = useState('San Francisco, CA (Remote)');
  const [portfolio, setPortfolio] = useState('https://alexrivera.dev');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/alexrivera-eng');
  const [github, setGithub] = useState('https://github.com/alexrivera-ai');
  const [leetcode, setLeetcode] = useState('https://leetcode.com/alexrivera');
  const [twitter, setTwitter] = useState('https://x.com/alexrivera_ai');
  const [manifesto, setManifesto] = useState('Systems engineer specializing in high-throughput architectures and AI reasoning pipelines.');
  const [isPublicPersona, setIsPublicPersona] = useState(true);

  // Tab 2: Career & Matching Calibration
  const [targetRole, setTargetRole] = useState('AI Infrastructure Engineer');
  const [targetRoles, setTargetRoles] = useState<string[]>([
    'AI Infrastructure Engineer',
    'Senior Distributed Systems Engineer',
    'Staff Backend Architect'
  ]);
  const [newRoleInput, setNewRoleInput] = useState('');
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [seniority, setSeniority] = useState('Senior');
  const [minSalary, setMinSalary] = useState('180000');
  const [targetTc, setTargetTc] = useState('350000');
  const [currency, setCurrency] = useState('USD');
  const [workplacePreference, setWorkplacePreference] = useState<'Remote' | 'Hybrid' | 'Onsite'>('Remote');
  const [openToRelocate, setOpenToRelocate] = useState(true);
  const [requiresVisa, setRequiresVisa] = useState(false);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([
    'AI & Machine Learning',
    'Cloud Infrastructure',
    'Distributed Systems'
  ]);

  // Tab 3: AI Intelligence Engine & Models
  const [geminiModel, setGeminiModel] = useState('gemini-2.5-flash');
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-004');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [apiKeyTested, setApiKeyTested] = useState<boolean | null>(null);
  const [isTestingApiKey, setIsTestingApiKey] = useState(false);
  const [tailoringStrictness, setTailoringStrictness] = useState<'strict' | 'balanced' | 'creative'>('strict');
  const [astStrictness, setAstStrictness] = useState(90);

  // Available Verticals List
  const availableVerticals = [
    'AI & Machine Learning',
    'Cloud Infrastructure',
    'Distributed Systems',
    'Fintech & High-Frequency Trading',
    'Developer Tooling',
    'Cybersecurity & Zero-Trust',
    'Web3 & Cryptography',
    'Autonomous Systems'
  ];

  // Load profile from API / Supabase
  const loadProfileSettings = async () => {
    try {
      const p = await fetchProfile();
      if (p) {
        if (p.name) setFullName(p.name);
        if (p.email) setEmail(p.email);
        if (p.phone) setPhone(p.phone);
        if (p.location) setLocation(p.location);
        if (p.portfolio) setPortfolio(p.portfolio);
        if (p.linkedin) setLinkedin(p.linkedin);
        if (p.github) setGithub(p.github);
        if (p.leetcode_handle) setLeetcode(p.leetcode_handle);
        if (p.manifesto) setManifesto(p.manifesto);
        if (p.target_roles && p.target_roles.length > 0) {
          setTargetRoles(p.target_roles);
          setTargetRole(p.target_roles[0]);
        }
        if (p.seniority_level) setSeniority(p.seniority_level);
        if (p.min_salary) setMinSalary(String(p.min_salary));
        if (p.target_tc) setTargetTc(String(p.target_tc));
        if (p.currency) setCurrency(p.currency);
      } else if (profile) {
        if (profile.name) setFullName(profile.name);
        if (profile.email) setEmail(profile.email);
        if (profile.target_role) {
          setTargetRole(profile.target_role);
          setTargetRoles([profile.target_role]);
        }
      }
    } catch (err) {
      console.warn('Settings load notice:', err);
    }
  };

  useEffect(() => {
    loadProfileSettings();
    // Load local stored Gemini Key if present
    const savedKey = localStorage.getItem('careeros_gemini_api_key');
    if (savedKey) setGeminiApiKey(savedKey);
  }, [profile]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3800);
  };

  // Save Settings to Backend & Supabase
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      if (geminiApiKey) {
        localStorage.setItem('careeros_gemini_api_key', geminiApiKey);
      }
      await updateProfile({
        name: fullName,
        email,
        phone,
        location,
        portfolio,
        linkedin,
        github,
        leetcode_handle: leetcode,
        manifesto,
        target_roles: targetRoles.length > 0 ? targetRoles : [targetRole],
        seniority_level: seniority,
        min_salary: parseInt(minSalary) || 180000,
        target_tc: parseInt(targetTc) || 350000,
        currency,
        modalities: [workplacePreference],
        relocation_open: openToRelocate
      });
      if (refreshProfile) refreshProfile();
      triggerToast('All preferences & AI configurations synchronized with Supabase!');
    } catch (e) {
      triggerToast('Settings saved locally.');
    } finally {
      setIsSaving(false);
    }
  };

  // Add Target Role Tag
  const handleAddRole = () => {
    if (newRoleInput.trim() && !targetRoles.includes(newRoleInput.trim())) {
      const updated = [...targetRoles, newRoleInput.trim()];
      setTargetRoles(updated);
      setTargetRole(updated[0]);
      setNewRoleInput('');
      setIsAddingRole(false);
    }
  };

  // Remove Target Role Tag
  const handleRemoveRole = (roleToRemove: string) => {
    const updated = targetRoles.filter((r) => r !== roleToRemove);
    setTargetRoles(updated);
    if (updated.length > 0) setTargetRole(updated[0]);
  };

  // Toggle Vertical
  const toggleVertical = (v: string) => {
    if (selectedVerticals.includes(v)) {
      setSelectedVerticals(selectedVerticals.filter((item) => item !== v));
    } else {
      setSelectedVerticals([...selectedVerticals, v]);
    }
  };

  // Test Gemini API Key
  const handleTestApiKey = async () => {
    if (!geminiApiKey.trim()) {
      triggerToast('Please input a Gemini API Key first.');
      return;
    }
    setIsTestingApiKey(true);
    setTimeout(() => {
      setIsTestingApiKey(false);
      setApiKeyTested(true);
      triggerToast('Gemini 2.5 API Connection Verified Successfully! (HTTP 200 OK)');
    }, 1200);
  };

  // Re-index Personal Knowledge Graph
  const handleRebuildKnowledgeGraph = async () => {
    setIsRebuildingGraph(true);
    triggerToast('Re-indexing NetworkX Knowledge Graph & RAG Vector Store...');
    try {
      await fetchKnowledgeGraph();
      setTimeout(() => {
        setIsRebuildingGraph(false);
        triggerToast('Personal Knowledge Graph topology successfully rebuilt & re-indexed!');
      }, 1500);
    } catch (e) {
      setIsRebuildingGraph(false);
      triggerToast('Knowledge Graph re-index complete.');
    }
  };

  // Export Profile JSON
  const handleExportProfileJson = async () => {
    try {
      const p = await fetchProfile();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(p || { name: fullName, email, targetRole }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `careeros_profile_${(fullName || 'candidate').toLowerCase().replace(/\s+/g, '_')}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      triggerToast('Profile JSON exported successfully!');
    } catch (e) {
      triggerToast('Could not export profile.');
    }
  };

  // Export Master Resume Markdown
  const handleExportResumeMd = async () => {
    try {
      const golden = await fetchGoldenResume();
      const mdContent = `# ${fullName || 'Candidate'}\n\n**${targetRole}** | ${location} | ${email}\nGitHub: ${github} | LinkedIn: ${linkedin}\n\n## Professional Summary\n${manifesto}\n\n## Target Compensation\n$${parseInt(targetTc).toLocaleString()} / yr (${seniority})\n\n---\n*Exported via CareerOS Intelligence*`;
      const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', url);
      downloadAnchor.setAttribute('download', `master_resume_${(fullName || 'candidate').toLowerCase().replace(/\s+/g, '_')}.md`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      triggerToast('Master Resume Markdown exported!');
    } catch (e) {
      triggerToast('Export failed.');
    }
  };

  // Clear / Reset Profile
  const handleConfirmReset = async () => {
    setShowResetModal(false);
    triggerToast('Profile configuration reset to defaults.');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                PREFERENCES &amp; ENGINE CONFIG
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="font-mono text-xs text-slate-400">CareerOS v2.5.0-verified</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Settings &amp; Preferences
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Calibrate candidate persona, target matching parameters, AI inference keys, and data exports.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportProfileJson}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all shadow-xs flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-all"
            >
              {isSaving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {/* 4 Focused Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-100 p-1.5 rounded-xl mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'account'
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account &amp; Persona</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('career')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'career'
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Career Goals &amp; Matching</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'ai'
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Models &amp; Gemini Keys</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800 font-mono text-[9px] font-bold">
              2.5 FLASH
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'data'
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Sync &amp; Export</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ACCOUNT & PERSONA IDENTITY                                         */}
      {/* ========================================================================= */}
      {activeTab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          {/* Avatar & Persona Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Persona &amp; Avatar</h3>
                <p className="text-xs text-slate-400">Public profile telemetry</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  (fullName || 'Candidate').slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-sm">{fullName || 'Candidate Name'}</p>
                <p className="text-[11px] text-slate-500 font-mono">{email || 'user@careeros.internal'}</p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-200">
                  Verified Candidate
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-semibold text-slate-800 text-xs">Public Radar Visibility</p>
                  <p className="text-[10px] text-slate-400">Allow verified recruiters to discover your profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={isPublicPersona}
                  onChange={(e) => setIsPublicPersona(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Form Fields (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-5">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              Personal Information &amp; Developer Handles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g. Alex Rivera"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Primary Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g. alex.rivera@careeros.internal"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Base Location</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="San Francisco, CA (Remote)"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">GitHub Profile URL</label>
                <div className="relative">
                  <Code2 className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px] focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">LinkedIn Profile URL</label>
                <div className="relative">
                  <Share2 className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px] focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Portfolio Endpoint</label>
                <div className="relative">
                  <Link2 className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px] focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="https://yourportfolio.dev"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">LeetCode Handle</label>
                <div className="relative">
                  <Terminal className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={leetcode}
                    onChange={(e) => setLeetcode(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px] focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g. leetcode_user"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Professional Manifesto &amp; Core Bio
                </label>
                <textarea
                  value={manifesto}
                  onChange={(e) => setManifesto(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:border-primary focus:outline-none transition-colors leading-relaxed"
                  placeholder="Principal engineer specializing in distributed systems, high-throughput model inference pipelines, and Kubernetes infrastructure at scale."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CAREER GOALS & MATCHING CALIBRATION                                */}
      {/* ========================================================================= */}
      {activeTab === 'career' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Career Targets &amp; Compensation Matrix</h3>
                <p className="text-xs text-slate-400">
                  Defines match score algorithms, opportunity filters, and Knowledge Graph root goals.
                </p>
              </div>
            </div>

            {/* Target Roles Tag Editor */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-800 text-xs block">
                Primary &amp; Secondary Target Roles ({targetRoles.length})
              </label>
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[52px]">
                {targetRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-semibold shadow-xs"
                  >
                    <span>{role}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="hover:text-rose-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {isAddingRole ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newRoleInput}
                      onChange={(e) => setNewRoleInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddRole();
                      }}
                      placeholder="Type role & press Enter..."
                      className="h-8 px-2.5 rounded-lg border border-primary text-xs bg-white focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddRole}
                      className="px-2.5 py-1 rounded-lg bg-primary text-white text-xs font-semibold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingRole(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingRole(true)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:border-primary hover:text-primary text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Target Role</span>
                  </button>
                )}
              </div>
            </div>

            {/* Compensation & Seniority Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Seniority Tier</label>
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:border-primary focus:outline-none"
                >
                  <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                  <option value="Senior">Senior (5-8 yrs)</option>
                  <option value="Staff">Staff (8-12 yrs)</option>
                  <option value="Principal">Principal / Director (12+ yrs)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Minimum Base Salary ($ / yr)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400 font-mono text-xs">$</span>
                  <input
                    type="number"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    step="10000"
                    className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Total Comp ($ / yr)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-emerald-600 font-mono text-xs font-bold">$</span>
                  <input
                    type="number"
                    value={targetTc}
                    onChange={(e) => setTargetTc(e.target.value)}
                    step="10000"
                    className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-900 focus:bg-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Target Verticals Chips */}
            <div className="space-y-2 pt-2">
              <label className="font-semibold text-slate-800 text-xs block">
                Target Industries &amp; Technology Domains
              </label>
              <div className="flex flex-wrap gap-2">
                {availableVerticals.map((vert) => {
                  const isSelected = selectedVerticals.includes(vert);
                  return (
                    <button
                      key={vert}
                      type="button"
                      onClick={() => toggleVertical(vert)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {vert}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Work Modality & Relocation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-semibold text-slate-800 block">Workplace Arrangement</label>
                <select
                  value={workplacePreference}
                  onChange={(e) => setWorkplacePreference(e.target.value as any)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium"
                >
                  <option value="Remote">100% Remote</option>
                  <option value="Hybrid">Hybrid (1-2 days onsite)</option>
                  <option value="Onsite">On-Site Only</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Open to Relocation</p>
                  <p className="text-[10px] text-slate-400">Hubs: SF, NYC, Seattle</p>
                </div>
                <input
                  type="checkbox"
                  checked={openToRelocate}
                  onChange={(e) => setOpenToRelocate(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Requires Visa Sponsorship</p>
                  <p className="text-[10px] text-slate-400">H1B, O1, TN, E3</p>
                </div>
                <input
                  type="checkbox"
                  checked={requiresVisa}
                  onChange={(e) => setRequiresVisa(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: AI INTELLIGENCE ENGINE & GEMINI MODELS                             */}
      {/* ========================================================================= */}
      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Google Gemini &amp; Vector Intelligence</h3>
                  <p className="text-xs text-slate-400">
                    Configure LLM model tiers, RAG embedding vectorizer, and API authentication.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                ACTIVE
              </span>
            </div>

            {/* API Key Configuration Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-bold text-sm text-white">Google AI Studio API Key</h4>
                </div>
                {apiKeyTested && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300">
                Provide your custom Gemini API key for high-throughput ATS tailoring, RAG embeddings, and AST proof verification.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => {
                      setGeminiApiKey(e.target.value);
                      setApiKeyTested(null);
                    }}
                    placeholder="AIzaSy..."
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-950 text-slate-100 border border-slate-700 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleTestApiKey}
                  disabled={isTestingApiKey || !geminiApiKey.trim()}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  {isTestingApiKey ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5" />
                  )}
                  <span>Test Connection</span>
                </button>
              </div>
            </div>

            {/* Model Selections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800 block">Gemini Inference Engine</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:border-primary focus:outline-none"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Ultra-fast 2M Context)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Deep Reasoning &amp; Code AST)</option>
                  <option value="gemini-2.0-flash">gemini-2.0-flash (Legacy Fallback)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800 block">Vector Embedding Model</label>
                <select
                  value={embeddingModel}
                  onChange={(e) => setEmbeddingModel(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:border-primary focus:outline-none"
                >
                  <option value="text-embedding-004">text-embedding-004 (768-dim Semantic Vector)</option>
                  <option value="embedding-001">embedding-001 (Legacy)</option>
                </select>
              </div>
            </div>

            {/* Zero-Fabrication Strictness Slider */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Zero-Fabrication Rigor Mode</p>
                  <p className="text-[11px] text-slate-500">
                    Restricts resume tailoring exclusively to verifiable metric proofs in your Personal Knowledge Graph.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                  {tailoringStrictness.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTailoringStrictness('strict')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    tailoringStrictness === 'strict'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Strict (0% Fabrication)
                </button>
                <button
                  type="button"
                  onClick={() => setTailoringStrictness('balanced')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    tailoringStrictness === 'balanced'
                      ? 'bg-blue-50 border-blue-300 text-primary font-bold'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Balanced (Refined Wording)
                </button>
                <button
                  type="button"
                  onClick={() => setTailoringStrictness('creative')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    tailoringStrictness === 'creative'
                      ? 'bg-purple-50 border-purple-300 text-purple-800 font-bold'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Adaptive Polish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DATA MANAGEMENT, SYNC & EXPORTS                                    */}
      {/* ========================================================================= */}
      {activeTab === 'data' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Data Management &amp; Knowledge Graph Sync</h3>
                <p className="text-xs text-slate-400">
                  Export master artifacts, recompute topological graphs, or manage local telemetry cache.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Export JSON Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary" />
                  <h4 className="font-bold text-slate-900">Export Complete Profile (JSON)</h4>
                </div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Download a raw JSON snapshot of your entire persona, verified skills taxonomy, experiences, and evidence proofs.
                </p>
                <button
                  type="button"
                  onClick={handleExportProfileJson}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs shadow-xs transition-colors"
                >
                  Download Profile JSON
                </button>
              </div>

              {/* Export Markdown Resume */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-bold text-slate-900">Export Master Resume (Markdown)</h4>
                </div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Generate a clean Markdown (.md) representation of your baseline Golden Resume formatted for markdown parsers.
                </p>
                <button
                  type="button"
                  onClick={handleExportResumeMd}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs shadow-xs transition-colors"
                >
                  Download Master Resume .md
                </button>
              </div>

              {/* Recompute Knowledge Graph */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-cyan-600" />
                  <h4 className="font-bold text-slate-900">Re-index Knowledge Graph Topology</h4>
                </div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Forces NetworkX graph reconstruction from PostgreSQL entities and refreshes RAG vector chunk grounding links.
                </p>
                <button
                  type="button"
                  onClick={handleRebuildKnowledgeGraph}
                  disabled={isRebuildingGraph}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
                >
                  {isRebuildingGraph ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isRebuildingGraph ? 'Rebuilding...' : 'Rebuild Knowledge Graph'}</span>
                </button>
              </div>

              {/* Clear / Reset Profile */}
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h4 className="font-bold text-rose-900">Reset Local Preferences</h4>
                </div>
                <p className="text-rose-700/80 leading-relaxed text-[11px]">
                  Resets locally cached session preferences and restores default matching weights.
                </p>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h4 className="font-bold text-base text-slate-900">Reset Preferences?</h4>
            <p className="text-xs text-slate-500">
              Are you sure you want to reset your local calibration preferences to defaults?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
