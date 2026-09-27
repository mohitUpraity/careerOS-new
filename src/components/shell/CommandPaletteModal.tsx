'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  FileText,
  Briefcase,
  Radio,
  Sparkles,
  TrendingUp,
  X,
  ArrowRight,
  GraduationCap,
  FolderGit2,
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  { label: 'Launch AI Interview Arena Mock', icon: Radio, href: '/interview-arena', category: 'Interview' },
  { label: 'Tailor Resume for Google AI Role', icon: FileText, href: '/resume', category: 'Resume' },
  { label: 'Explore High-Match Opportunities (94%+)', icon: Briefcase, href: '/opportunities', category: 'Jobs' },
  { label: 'Review Offer Negotiation Strategy ($519k)', icon: Sparkles, href: '/compensation', category: 'Offer' },
  { label: 'View Today’s Execution Tasks', icon: TrendingUp, href: '/planner', category: 'Planner' },
  { label: 'Browse Engineering Resources & RFCs', icon: FolderGit2, href: '/resources', category: 'Learning' },
];

export default function CommandPaletteModal({ isOpen, onClose }: CommandPaletteModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredActions = quickActions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-modal border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search opportunities, skills, resumes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-[14px] placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          <p className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Actions & Navigation
          </p>
          {filteredActions.length > 0 ? (
            filteredActions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-blue-50 hover:text-primary transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px] group-hover:bg-blue-100 group-hover:text-primary">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-slate-400 text-sm">
              No matching actions found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation: <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">↓</kbd></span>
            <span>Select: <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">↵</kbd></span>
          </div>
          <span>Close: <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
