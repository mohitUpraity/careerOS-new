'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Network,
  FileText,
  Compass,
  Trophy,
  TrendingUp,
  Sparkles,
  Radio,
  BarChart3,
  Share2,
  Calendar,
  PlugZap,
  GraduationCap,
  FolderGit2,
  Settings,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SubNavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeType?: 'primary' | 'emerald' | 'purple' | 'amber' | 'neutral';
}

interface NavSection {
  id: string;
  title: string;
  collapsible?: boolean;
  items: SubNavItem[];
}

const navSections: NavSection[] = [
  {
    id: 'core',
    title: 'CORE WORKSPACE',
    collapsible: false,
    items: [
      { name: 'Command Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Profile & Resume Ingestion', href: '/profile', icon: User, badge: 'GOLDEN', badgeType: 'primary' },
      { name: 'Knowledge Graph Studio', href: '/skills-and-evidence', icon: Network, badge: '60 FPS', badgeType: 'purple' },
      { name: 'AI Resume Tailor', href: '/resume', icon: FileText, badge: 'AST', badgeType: 'neutral' },
    ]
  },
  {
    id: 'opportunities',
    title: 'OPPORTUNITIES & RADAR',
    collapsible: true,
    items: [
      { name: 'Opportunity Radar', href: '/opportunities', icon: Compass, badge: 'RADAR', badgeType: 'amber' },
      { name: 'Hackathons & Events', href: '/hackathons-and-events', icon: Trophy, badge: 'LIVE', badgeType: 'emerald' },
      { name: 'Applications Pipeline', href: '/applications', icon: TrendingUp },
      { name: 'Compensation & Offers', href: '/compensation', icon: Sparkles },
    ]
  },
  {
    id: 'studio',
    title: 'STUDIO & SIMULATION',
    collapsible: true,
    items: [
      { name: 'AI Interview Arena', href: '/interview-arena', icon: Radio, badge: 'MOCK', badgeType: 'purple' },
      { name: 'Interview Debrief', href: '/interview-debrief', icon: BarChart3 },
      { name: 'LinkedIn & Presence', href: '/linkedin-and-presence', icon: Share2 },
      { name: 'Daily Strategic Planner', href: '/planner', icon: Calendar },
    ]
  },
  {
    id: 'system',
    title: 'DATA & SYSTEM',
    collapsible: true,
    items: [
      { name: 'Evidence Connectors', href: '/connectors', icon: PlugZap, badge: '6 LIVE', badgeType: 'emerald' },
      { name: 'Learning & Roadmap', href: '/learning', icon: GraduationCap },
      { name: 'Resources Vault', href: '/resources', icon: FolderGit2 },
      { name: 'Settings & Calibration', href: '/settings', icon: Settings },
    ]
  }
];

export default function SidebarNav() {
  const pathname = usePathname();
  const { user, profile } = useAuth();

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    opportunities: false,
    studio: false,
    system: false
  });

  // Auto-expand section when navigating into its routes
  useEffect(() => {
    navSections.forEach((section) => {
      const hasActiveChild = section.items.some((item) => {
        if (item.href === '/') return pathname === '/' || pathname === '/dashboard';
        return pathname?.startsWith(item.href);
      });
      if (hasActiveChild) {
        setCollapsedSections((prev) => ({ ...prev, [section.id]: false }));
      }
    });
  }, [pathname]);

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  const displayName = profile?.name || user?.displayName || 'Alex Rivera';
  const targetRole = profile?.target_role || 'Lead Systems & AI Engineer';
  const readiness = profile?.overall_readiness || 98;
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AR';

  // Badge Color Mapper
  const renderBadge = (badge: string, type?: string) => {
    switch (type) {
      case 'primary':
        return (
          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-blue-100 text-primary border border-blue-200">
            {badge}
          </span>
        );
      case 'emerald':
        return (
          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {badge}
          </span>
        );
      case 'purple':
        return (
          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            {badge}
          </span>
        );
      case 'amber':
        return (
          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            {badge}
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            {badge}
          </span>
        );
    }
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-slate-200/90 z-50 flex flex-col justify-between select-none shadow-[1px_0_3px_0_rgba(15,23,42,0.03)] font-sans">
      {/* ── TOP: Brand Header & Telemetry Pill ────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
        {/* Brand Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center shadow-xs text-white group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] tracking-tight text-slate-900 leading-none">
                Career<span className="text-primary">OS</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 font-semibold tracking-wider pt-0.5">
                INTELLIGENCE ENGINE
              </span>
            </div>
          </Link>

          <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[9px] font-bold">
            v2.5
          </span>
        </div>

        {/* Readiness Telemetry Capsule */}
        <div className="mx-3 mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-500" />
              <span>Graph Readiness</span>
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs">{readiness}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        {/* ── NAVIGATION SECTIONS ────────────────────────────────────────── */}
        <nav className="p-3 space-y-4">
          {navSections.map((section) => {
            const isCollapsed = collapsedSections[section.id];
            const hasActiveChild = section.items.some((item) => isItemActive(item.href));

            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <div className="flex items-center justify-between px-2 py-1">
                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      hasActiveChild ? 'text-primary' : 'text-slate-400'
                    }`}
                  >
                    {section.title}
                  </span>

                  {section.collapsible && (
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="p-0.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
                      aria-label="Toggle section"
                    >
                      {isCollapsed ? (
                        <ChevronRight className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Section Links */}
                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const active = isItemActive(item.href);
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all group ${
                            active
                              ? 'bg-blue-50/90 text-primary font-semibold shadow-2xs border border-blue-100 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                active ? 'text-primary stroke-[2]' : 'text-slate-400 group-hover:text-slate-700 stroke-[1.75]'
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>

                          {item.badge && renderBadge(item.badge, item.badgeType)}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── BOTTOM: User Profile Card & Quick Actions ──────────────────── */}
      <div className="p-3 border-t border-slate-200/90 bg-slate-50/80 shrink-0">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <Link href="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  initials
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                  {displayName}
                </p>
                <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              </div>
              <p className="text-[10px] font-mono text-slate-400 truncate">
                {targetRole}
              </p>
            </div>
          </Link>

          <Link
            href="/settings"
            title="Settings & Calibration"
            className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ${
              pathname === '/settings' ? 'text-primary bg-blue-50' : ''
            }`}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
