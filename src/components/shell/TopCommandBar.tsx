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
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import CommandPaletteModal from './CommandPaletteModal';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

export default function TopCommandBar() {
  const { firebaseUser, userProfile, logout } = useAuth();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

          {/* Notification Button & Popover */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isNotificationsOpen
                  ? 'bg-blue-50 text-primary'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>

            {/* Notification Dropdown Panel */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white rounded-xl border border-slate-200 shadow-modal p-4 space-y-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">Notifications</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-primary font-mono text-[10px] font-bold">
                      3 New
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-[11px] text-primary hover:underline font-semibold"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
                      <span>Anthropic Interview Ready</span>
                      <span className="font-mono text-[10px] text-slate-400">10m ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Your technical debrief scorecard is ready for review with 91% match.
                    </p>
                    <Link
                      href="/interview-debrief"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[11px] text-primary hover:underline font-semibold block pt-0.5"
                    >
                      View Debrief Scorecard →
                    </Link>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
                      <span>New Top Match Opportunity</span>
                      <span className="font-mono text-[10px] text-slate-400">1h ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      DeepMind posted &ldquo;AI Infrastructure Engineer&rdquo; matching 94% of your skills.
                    </p>
                    <Link
                      href="/opportunities"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[11px] text-primary hover:underline font-semibold block pt-0.5"
                    >
                      Inspect Opportunity →
                    </Link>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
                      <span>GitHub AST Proof Harvested</span>
                      <span className="font-mono text-[10px] text-slate-400">2h ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      3 new PRs indexed from vLLM repository.
                    </p>
                    <Link
                      href="/connectors"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[11px] text-primary hover:underline font-semibold block pt-0.5"
                    >
                      View Connectors Hub →
                    </Link>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href="/settings"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-slate-500 hover:text-slate-800 text-[11px]"
                  >
                    Notification Preferences
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-primary hover:underline font-semibold text-[11px]"
                  >
                    Mark all read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle (Light/Dark Mode toggle) */}
          <button
            type="button"
            aria-label="Toggle Theme"
            onClick={() => setIsDark(!isDark)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            {isDark ? <Moon className="w-4 h-4 text-blue-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          {/* User Profile Avatar / Sign-In Button */}
          {firebaseUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shadow-xs hover:ring-2 hover:ring-primary/20 transition-all overflow-hidden"
              >
                {firebaseUser.photoURL ? (
                  <img src={firebaseUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>
                    {(userProfile?.name || firebaseUser.displayName || firebaseUser.email || "U")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-10 w-56 bg-white rounded-xl border border-slate-200 shadow-modal p-2 space-y-1 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {userProfile?.name || firebaseUser.displayName || "Engineer"}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{firebaseUser.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                    Career Profile
                  </Link>

                  <button
                    type="button"
                    onClick={async () => {
                      setIsUserMenuOpen(false);
                      await logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* ⌘ K Command Palette Modal */}
      <CommandPaletteModal isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Auth Modal for Google / Email */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
