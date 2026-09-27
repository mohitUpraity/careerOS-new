'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Zap,
  Radio,
  ExternalLink,
} from 'lucide-react';
import CommandPaletteModal from './CommandPaletteModal';

export default function TopCommandBar() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-60 right-0 h-14 bg-white/90 backdrop-blur-md z-40 border-b border-slate-200 px-6 flex items-center justify-between shadow-[0_1px_3px_0_rgba(15,23,42,0.03)]">
        {/* Global Search Bar (Trigger for ⌘ K modal) */}
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={() => setIsCommandOpen(true)}
            className="w-full h-9 pl-3 pr-2.5 rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-[13px] text-slate-500 flex items-center justify-between transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              <span>Search opportunities, skills, resumes...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600 shadow-2xs">
              ⌘ K
            </kbd>
          </button>
        </div>

        {/* Status Telemetry & Quick Action Icons */}
        <div className="flex items-center gap-4">
          {/* Active Autopilot Telemetry Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Telemetry Active (38ms)</span>
          </div>

          {/* Quick Mock Simulation Link */}
          <Link
            href="/interview-arena"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-primary text-[12px] font-medium hover:bg-blue-100/80 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-primary" />
            <span>Live Mock</span>
          </Link>

          {/* Notification Button */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>

          {/* Theme Toggle (Light/Dark Mode toggle) */}
          <button
            type="button"
            aria-label="Toggle Theme"
            onClick={() => setIsDark(!isDark)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            {isDark ? <Moon className="w-4 h-4 text-blue-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          {/* User Profile Avatar Circle */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shadow-xs hover:ring-2 hover:ring-primary/20 transition-all"
          >
            MU
          </Link>
        </div>
      </header>

      {/* ⌘ K Command Palette Modal */}
      <CommandPaletteModal isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
