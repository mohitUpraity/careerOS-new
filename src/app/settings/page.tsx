'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  History,
  Save,
  User,
  Sliders,
  Bell,
  Blocks,
  Shield,
  Palette,
  CreditCard,
  BadgeCheck,
  Camera,
  Mail,
  Phone,
  MapPin,
  Link2,
  Share2,
  Terminal,
  Target,
  Plus,
  X,
  ChevronDown,
  CheckCircle2,
  Sun,
  Moon,
  Laptop,
  Key,
  Smartphone,
  FileLock2,
  Download,
  Trash2,
  ChevronRight,
  Zap,
  ArrowRight,
  Code2,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');
  const [toast, setToast] = useState<string | null>(null);

  // Profile Form State
  const [fullName, setFullName] = useState('Mohit Upraity');
  const [email, setEmail] = useState('mohitupraity@email.com');
  const [phone, setPhone] = useState('9876543210');
  const [location, setLocation] = useState('Agra, Uttar Pradesh, India');
  const [portfolio, setPortfolio] = useState('https://mohitupraity.dev');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/mohitupraity');
  const [github, setGithub] = useState('https://github.com/mohitupraity');
  const [manifesto, setManifesto] = useState('Computer Science student passionate about AI, ML, cybersecurity and building real-world products.');

  // Target Roles & Preferences
  const [targetRoles, setTargetRoles] = useState(['AI Engineer', 'ML Engineer', 'Full-Stack Dev']);
  const [targetVerticals, setTargetVerticals] = useState(['AI / ML Systems', 'Cybersecurity', 'Enterprise Cloud']);
  const [targetHubs, setTargetHubs] = useState(['Remote', 'Bengaluru', 'Hyderabad', 'Pune']);
  const [newRoleInput, setNewRoleInput] = useState('');
  const [isAddingRole, setIsAddingRole] = useState(false);

  // Modalities & Relocation
  const [fullTime, setFullTime] = useState(true);
  const [internship, setInternship] = useState(true);
  const [partTime, setPartTime] = useState(false);
  const [contract, setContract] = useState(false);
  const [openToRelocate, setOpenToRelocate] = useState(true);
  const [willingRemote, setWillingRemote] = useState(true);

  // Appearance
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [accentColor, setAccentColor] = useState('#2563EB');
  const [compactMode, setCompactMode] = useState(false);
  const [transitions, setTransitions] = useState(true);

  // Notifications
  const [notifJobs, setNotifJobs] = useState(true);
  const [notifInternships, setNotifInternships] = useState(true);
  const [notifHackathons, setNotifHackathons] = useState(true);
  const [notifApplications, setNotifApplications] = useState(true);
  const [notifLearning, setNotifLearning] = useState(true);
  const [notifDigest, setNotifDigest] = useState(true);
  const [notifChangelog, setNotifChangelog] = useState(false);
  const [notifMarketing, setNotifMarketing] = useState(false);

  // Integrations state
  const [connectedIntegrations, setConnectedIntegrations] = useState<Record<string, boolean>>({
    linkedin: true,
    github: true,
    google: false,
    leetcode: false,
    hackerrank: false,
    notion: false,
  });

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setTargetRoles(targetRoles.filter((r) => r !== roleToRemove));
  };

  const handleAddRole = () => {
    if (newRoleInput.trim() && !targetRoles.includes(newRoleInput.trim())) {
      setTargetRoles([...targetRoles, newRoleInput.trim()]);
      setNewRoleInput('');
      setIsAddingRole(false);
    }
  };

  const handleToggleIntegration = (key: string) => {
    setConnectedIntegrations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    triggerToast(`${key.toUpperCase()} integration status updated!`);
  };

  const tabs = [
    { name: 'Account', icon: User },
    { name: 'Preferences', icon: Target },
    { name: 'Notifications', icon: Bell, badge: '3' },
    { name: 'Integrations', icon: Blocks },
    { name: 'Privacy & Security', icon: Shield },
    { name: 'Appearance', icon: Palette },
    { name: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header & Breadcrumbs */}
      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                PREFERENCES &amp; ENGINE
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="font-mono text-xs text-slate-400">v2.4.0-stable</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Settings &amp; Preferences
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your telemetry credentials, career constraints, algorithmic weightings, and identity.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => triggerToast('Audit log export generated (34 telemetry actions).')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all shadow-xs flex items-center gap-2"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>Audit Log</span>
            </button>
            <button
              type="button"
              onClick={() => triggerToast('All configuration and profile settings saved!')}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Horizontal Nav Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-100 p-1 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveTab(tab.name)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-primary font-mono text-[10px] font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* 3-Column Bento Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= COLUMN 1: Profile & Identity (4 cols) ================= */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Settings Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">Profile Settings</h2>
                  <p className="text-xs text-slate-500">Manage personal identity details.</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                Verified
              </span>
            </div>

            {/* Avatar Row */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="relative group cursor-pointer shrink-0">
                <img
                  className="w-16 h-16 rounded-full object-cover shadow-xs border-2 border-white"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  alt="Mohit Upraity"
                />
                <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerToast('Avatar upload dialog opened.')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all shadow-xs border border-slate-200"
                  >
                    Change Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerToast('Photo reset.')}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-all"
                  >
                    Remove
                  </button>
                </div>
                <p className="font-mono text-[10px] text-slate-400">JPG, PNG or WebP under 4MB</p>
              </div>
            </div>

            {/* Identity Form */}
            <div className="flex flex-col gap-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Primary Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Phone Telemetry
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-700 shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Current Base Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Web Telemetry &amp; Handles
                </span>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Portfolio Endpoint</label>
                <div className="relative">
                  <Link2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-primary focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">LinkedIn Profile</label>
                <div className="relative">
                  <Share2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-800 focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">GitHub Graph</label>
                <div className="relative">
                  <Terminal className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-800 focus:outline-none focus:bg-white focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold uppercase tracking-wider text-slate-500">
                    Professional Manifesto
                  </label>
                  <span className="font-mono text-slate-400 text-[10px]">{manifesto.length}/300</span>
                </div>
                <textarea
                  value={manifesto}
                  onChange={(e) => setManifesto(e.target.value)}
                  rows={3}
                  maxLength={300}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-primary transition-all resize-none leading-relaxed"
                />
              </div>

              <button
                type="button"
                onClick={() => triggerToast('Profile details updated successfully!')}
                className="mt-2 w-full h-10 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>

          {/* Quick Signal Completeness */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-slate-500 font-bold">Signal Completeness</span>
              <span className="font-mono text-xs text-emerald-600 font-bold">94%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: '94%' }}></div>
            </div>
            <p className="text-xs text-slate-500">
              Add your LeetCode handle to reach 100% algorithm profile index match.
            </p>
          </div>
        </section>

        {/* ================= COLUMN 2: Preferences, Ecosystem & Look (4 cols) ================= */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          {/* Career Preferences Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Career Preferences</h2>
                <p className="text-xs text-slate-500">Model matching thresholds and role targets.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              {/* Target Roles */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Target Roles
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {targetRoles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-primary border border-blue-200/60 font-semibold"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role)}
                        className="hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  {isAddingRole ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="e.g. Systems Engineer"
                        value={newRoleInput}
                        onChange={(e) => setNewRoleInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                        className="px-2 py-0.5 rounded border border-primary text-xs w-32 focus:outline-none"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleAddRole}
                        className="px-2 py-0.5 rounded bg-primary text-white text-[11px] font-bold"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingRole(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  )}
                </div>
              </div>

              {/* Target Verticals */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Target Verticals
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {targetVerticals.map((vert) => (
                    <span
                      key={vert}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                    >
                      {vert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Hubs */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Target Hubs
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {targetHubs.map((hub) => (
                    <span
                      key={hub}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Salary Spectrum */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Expected Compensation Spectrum
                </label>
                <select className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-primary">
                  <option>₹15L – ₹30L (Full-time Standard)</option>
                  <option>₹30L – ₹50L (Senior / High Growth)</option>
                  <option>₹50L+ (Principal / Specialist)</option>
                  <option>₹80,000 – ₹1,50,000 / mo (Internship Stipend)</option>
                </select>
              </div>

              {/* Job Modalities */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Job Modalities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fullTime}
                      onChange={(e) => setFullTime(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="font-medium text-slate-800">Full-time</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={internship}
                      onChange={(e) => setInternship(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="font-medium text-slate-800">Internship</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partTime}
                      onChange={(e) => setPartTime(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="font-medium text-slate-800">Part-time</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contract}
                      onChange={(e) => setContract(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="font-medium text-slate-800">Contract</span>
                  </label>
                </div>
              </div>

              {/* Relocation Toggles */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-800">Open to Relocate</p>
                    <p className="text-[11px] text-slate-400">Match tier 1 relocation grants</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={openToRelocate}
                    onChange={(e) => setOpenToRelocate(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-800">Willing to Work Remotely</p>
                    <p className="text-[11px] text-slate-400">Async + global PST/IST overlap</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={willingRemote}
                    onChange={(e) => setWillingRemote(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerToast('Career preferences updated!')}
                className="w-full h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-primary font-semibold transition-all shadow-xs"
              >
                Update Preferences
              </button>
            </div>
          </div>

          {/* Connected Integrations Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                  <Blocks className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">Integrations</h2>
                  <p className="text-xs text-slate-500">Connect telemetry pipelines.</p>
                </div>
              </div>
              <Link
                href="/connectors"
                className="font-mono text-xs text-primary font-bold hover:underline"
              >
                {Object.values(connectedIntegrations).filter(Boolean).length}/6 LIVE →
              </Link>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 text-xs">
              {/* LinkedIn */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    in
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">LinkedIn</p>
                    <p className="font-mono text-[10px] text-slate-400">Network &amp; experience sync</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleIntegration('linkedin')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                    connectedIntegrations.linkedin
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {connectedIntegrations.linkedin ? '● Connected' : 'Connect'}
                </button>
              </div>

              {/* GitHub */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">GitHub</p>
                    <p className="font-mono text-[10px] text-slate-400">Repos, commits &amp; stars</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleIntegration('github')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                    connectedIntegrations.github
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {connectedIntegrations.github ? '● Connected' : 'Connect'}
                </button>
              </div>

              {/* LeetCode */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">LeetCode</p>
                    <p className="font-mono text-[10px] text-slate-400">Problem metrics &amp; contest rank</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleIntegration('leetcode')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                    connectedIntegrations.leetcode
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {connectedIntegrations.leetcode ? '● Connected' : 'Connect'}
                </button>
              </div>

              {/* Google */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Google</p>
                    <p className="font-mono text-[10px] text-slate-400">Calendar &amp; scheduling</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleIntegration('google')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                    connectedIntegrations.google
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {connectedIntegrations.google ? '● Connected' : 'Connect'}
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Appearance</h2>
                <p className="text-xs text-slate-500">Visual workspace personalization.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              {/* Theme Picker Tiles */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'bg-blue-50/80 border-2 border-primary text-primary font-bold shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-900 text-white font-bold shadow-xs border-2 border-slate-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    theme === 'system'
                      ? 'bg-blue-50/80 border-2 border-primary text-primary font-bold shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Laptop className="w-5 h-5" />
                  <span>System</span>
                </button>
              </div>

              {/* Accent Shading */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Accent Shading
                </label>
                <div className="flex items-center gap-3">
                  {['#2563EB', '#4F46E5', '#059669', '#D97706', '#E11D48', '#DB2777'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setAccentColor(col)}
                      style={{ backgroundColor: col }}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center text-white ${
                        accentColor === col ? 'scale-110 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-105'
                      }`}
                    >
                      {accentColor === col && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Micro Options */}
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-800 font-medium">Compact Workspace Mode</span>
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-800 font-medium">UI Transitions &amp; Shaders</span>
                  <input
                    type="checkbox"
                    checked={transitions}
                    onChange={(e) => setTransitions(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COLUMN 3: Alerts, Security & Billing (4 cols) ================= */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          {/* Notification Settings Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">Notifications</h2>
                  <p className="text-xs text-slate-500">Dispatcher rules &amp; frequency.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              {[
                { label: 'Job Recommendations', state: notifJobs, set: setNotifJobs },
                { label: 'Internship Opportunities', state: notifInternships, set: setNotifInternships },
                { label: 'Hackathons & Events', state: notifHackathons, set: setNotifHackathons },
                { label: 'Application Status Updates', state: notifApplications, set: setNotifApplications },
                { label: 'Learning Reminders', state: notifLearning, set: setNotifLearning },
                { label: 'Weekly Telemetry Digest', state: notifDigest, set: setNotifDigest },
                { label: 'Product Changelogs', state: notifChangelog, set: setNotifChangelog },
                { label: 'Marketing & Partner Offers', state: notifMarketing, set: setNotifMarketing },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <span className="font-medium text-slate-800">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={(e) => item.set(e.target.checked)}
                    className="w-4 h-4 text-primary rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Security Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Privacy &amp; Security</h2>
                <p className="text-xs text-slate-500">Access barriers and payload control.</p>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 text-xs">
              <button
                type="button"
                onClick={() => triggerToast('Password reset link sent to your email.')}
                className="py-2.5 flex items-center justify-between hover:text-primary transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Key className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-800 font-medium">Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => triggerToast('2FA setup initiated.')}
                className="py-2.5 flex items-center justify-between hover:text-primary transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-800 font-medium">Two-Factor Authentication</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-mono text-[10px] font-bold">
                    Disabled
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => triggerToast('Data privacy controls panel opened.')}
                className="py-2.5 flex items-center justify-between hover:text-primary transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileLock2 className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-800 font-medium">Data Privacy Controls</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => triggerToast('Preparing your encrypted ZIP telemetry archive...')}
                className="py-2.5 flex items-center justify-between hover:text-primary transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-800 font-medium">Download My Telemetry Archive</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => triggerToast('Account deletion confirmation requested.')}
                className="py-2.5 flex items-center justify-between text-rose-600 hover:text-rose-700 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="w-4 h-4" />
                  <span className="font-semibold">Delete Account &amp; Vault</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Billing & Plan Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">Billing &amp; Plan</h2>
                  <p className="text-xs text-slate-500">Seat limits &amp; computing quota.</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                FREE TIER
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Free Starter Tier</span>
                <span className="font-mono text-slate-500">₹0 / month</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Includes standard matching engine, 5 daily application submissions, and public trajectory telemetry.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-slate-800 font-semibold">Pro Engine available</span>
              </div>
              <button
                type="button"
                onClick={() => triggerToast('Pro Engine tier plans: ₹799/mo or ₹7,999/yr.')}
                className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>View Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
