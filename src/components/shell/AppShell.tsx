"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SidebarNav from "./SidebarNav";
import TopCommandBar from "./TopCommandBar";
import LandingPage from "@/components/landing/LandingPage";
import { AuthModal } from "@/components/auth/AuthModal";
import { ShieldAlert, Sparkles, Lock, ArrowRight, LogIn } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { firebaseUser, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // 1. Initial Auth Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white select-none">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-indigo-500/20 blur-xl animate-pulse" />
        </div>
        <p className="mt-6 font-mono text-sm tracking-wider text-slate-300">
          INITIALIZING CAREEROS ENGINE...
        </p>
        <span className="mt-2 font-mono text-xs text-slate-500">
          Syncing Supabase PostgreSQL & Firebase Auth
        </span>
      </div>
    );
  }

  // 2. Unauthenticated User on Root ("/") -> Full-Width Standalone Landing Page
  if (!firebaseUser && pathname === "/") {
    return <LandingPage />;
  }

  // 3. Unauthenticated User on Protected Route ("/applications", "/resume", etc.) -> Protected Route Gate
  if (!firebaseUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase mb-3">
            Protected Workspace Route
          </span>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            Authentication Required
          </h2>

          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            This module contains your private candidate telemetry, AST evidence graphs, and live AI pipelines. Please sign in to unlock.
          </p>

          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-98"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Google / Email</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium rounded-xl text-xs transition"
            >
              Return to Product Overview
            </button>
          </div>
        </div>

        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  // 4. Onboarding Route -> Full-Width Dedicated Engine Setup Canvas (No Sidebar/TopBar)
  if (pathname === "/onboarding") {
    return (
      <div className="bg-[#f8f9ff] text-slate-900 antialiased min-h-screen selection:bg-blue-100">
        {children}
      </div>
    );
  }

  // 5. Authenticated User Workspace Shell with Sidebar & Top Command Bar
  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen">
      {/* Left Persistent Navigation Rail (240px) */}
      <SidebarNav />

      {/* Top Command Bar & Utility Header (56px) */}
      <TopCommandBar />

      {/* Main Workspace Content Area */}
      <div className="pl-60 pt-14 min-h-screen bg-[#f8f9ff]">
        <main className="max-w-7xl mx-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
