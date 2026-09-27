'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Trophy,
  FileText,
  Radio,
  BarChart3,
  Network,
  GraduationCap,
  FolderGit2,
  Calendar,
  Share2,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingUp,
  User,
  PlugZap,
} from 'lucide-react';
import { mockUserProfile } from '@/data/mock/dashboardData';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Opportunities', href: '/opportunities', icon: Briefcase, badge: '24' },
  { name: 'Hackathons & Events', href: '/hackathons-and-events', icon: Trophy, badge: 'NEW', badgeColor: 'bg-emerald-100 text-emerald-700' },
  { name: 'Applications', href: '/applications', icon: TrendingUp, badge: '12', badgeColor: 'bg-blue-100 text-blue-700' },
  { name: 'Resume Tailor', href: '/resume', icon: FileText },
  { name: 'Interview Arena', href: '/interview-arena', icon: Radio, badge: 'LIVE', badgeColor: 'bg-purple-100 text-purple-700 animate-pulse' },
  { name: 'Interview Debrief', href: '/interview-debrief', icon: BarChart3, badge: '91%', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { name: 'Compensation & Offers', href: '/compensation', icon: Sparkles, badge: '$519k', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { name: 'Skills & Evidence', href: '/skills-and-evidence', icon: Network },
  { name: 'Evidence Connectors', href: '/connectors', icon: PlugZap, badge: '6 LIVE', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { name: 'Learning & Roadmap', href: '/learning', icon: GraduationCap },
  { name: 'Resources Library', href: '/resources', icon: FolderGit2 },
  { name: 'Daily Planner', href: '/planner', icon: Calendar },
  { name: 'LinkedIn & Presence', href: '/linkedin-and-presence', icon: Share2 },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const { firebaseUser, userProfile } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  const displayName = userProfile?.name || firebaseUser?.displayName || mockUserProfile.name;
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-slate-200 z-50 flex flex-col justify-between select-none shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
      {/* Brand & Workspace Header */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-xs group-hover:bg-primary-hover transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] tracking-tight text-slate-900 leading-none">
                Career<span className="text-primary">OS</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-medium tracking-wide">
                INTELLIGENCE v4.2
              </span>
            </div>
          </Link>
          <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-primary font-mono text-[10px] font-semibold">
            PRO
          </span>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-3 space-y-6">
          <div>
            <p className="px-2 mb-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </p>
            <nav className="space-y-0.5">
              {mainNavItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all group ${
                      active
                        ? 'bg-blue-50/80 text-primary font-semibold shadow-xs border border-blue-100/80'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-semibold shrink-0 ${
                          item.badgeColor || (active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Pinned Profile & System Footer */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-200 space-y-2">
        <Link
          href="/settings"
          className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
            pathname === '/settings'
              ? 'bg-white text-primary shadow-xs font-semibold'
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & API Keys</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {/* User Identity Card */}
        <Link
          href="/profile"
          className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs overflow-hidden">
            {firebaseUser?.photoURL ? (
              <img src={firebaseUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              initials || 'MU'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                {displayName}
              </p>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
            </div>
            <p className="text-[11px] font-mono text-slate-400 truncate">
              {firebaseUser?.email || mockUserProfile.targetRole}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
