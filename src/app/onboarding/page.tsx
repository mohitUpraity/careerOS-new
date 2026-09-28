'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full shadow-card text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary mx-auto flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Redirecting to Profile &amp; Calibration</h2>
        <p className="text-xs text-slate-500">
          Onboarding gates have been removed. You can edit your targets, upload resumes, and fine-tune AI recommendations anytime from your Profile page.
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <span>Continue to Profile</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
