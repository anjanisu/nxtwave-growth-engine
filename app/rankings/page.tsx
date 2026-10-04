'use client';

import React, { useState, useEffect } from 'react';
import RankingsTable, { CollegeRanking } from '@/components/RankingsTable';
import { Trophy, Zap, Building2, UserCheck, AlertCircle } from 'lucide-react';

export default function RankingsPage() {
  const [rankings, setRankings] = useState<CollegeRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success && data.rankings) {
          setRankings(data.rankings);
        } else {
          setError(data.error || 'Failed to load rankings.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Network error';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Engaged Learner Rankings</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">College Leaderboard</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium">
            Rewarding colleges that bring real, engaged learners. Ranked strictly by Impact Score to eliminate registration spam and prioritize verified workshop attendance.
          </p>
        </div>

        {/* Formula Explainer Card */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 text-xs max-w-xs shrink-0">
          <div className="font-extrabold text-cyan-400 mb-1 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" /> Impact Score Formula
          </div>
          <p className="text-[11px] text-slate-300 font-mono">
            Attendees × (1 + Attendance Rate)
          </p>
          <span className="text-[10px] text-slate-400 mt-2 block">
            Example: 40 attendees & 80% attendance rate = 40 × (1 + 0.80) = <strong>72.0 Impact Score</strong>
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Rankings Table Component */}
      <RankingsTable rankings={rankings} isLoading={isLoading} />
    </div>
  );
}
