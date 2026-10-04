'use client';

import React, { useState, useEffect } from 'react';
import CampaignFunnel from '@/components/CampaignFunnel';
import GrowthInsights from '@/components/GrowthInsights';
import RankingsTable, { CollegeRanking } from '@/components/RankingsTable';
import DashboardCharts from '@/components/DashboardCharts';
import {
  LayoutDashboard,
  Sparkles,
  RefreshCw,
  Trash2,
  Share2,
  Copy,
  Check,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<{
    summary: {
      targetGoal: number;
      totalRegistrations: number;
      totalAttendees: number;
      overallAttendanceRate: number;
      totalCollegesCount: number;
      totalImpactScore: number;
    };
    rankings: CollegeRanking[];
    insights: Array<{
      id: string;
      type: 'ALERT' | 'HIGH_INTENT' | 'STAR_PERFORMER' | 'CHANNEL_ROI';
      collegeName?: string;
      title: string;
      description: string;
      actionableTip: string;
      metric: string;
    }>;
    channelStats: Array<{
      channel: string;
      signups: number;
      attendees: number;
      attendanceRatePct: number;
    }>;
    dailyTrend: Array<{ date: string; registrations: number }>;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/stats');
      const resData = await res.json();
      if (resData.success) {
        setData(resData);
      }
    } catch (err) {
      console.error('Failed to load stats', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleSeed = async () => {
    setIsSeeding(true);
    setActionMessage(null);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      });
      const resData = await res.json();
      if (resData.success) {
        setActionMessage(resData.message);
        await loadStats();
      }
    } catch (err) {
      console.error('Seeding failed', err);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to clear all student registrations and reset the database?')) return;
    setIsResetting(true);
    setActionMessage(null);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      const resData = await res.json();
      if (resData.success) {
        setActionMessage(resData.message);
        await loadStats();
      }
    } catch (err) {
      console.error('Reset failed', err);
    } finally {
      setIsResetting(false);
    }
  };

  const copyReferralUrl = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const url = `${origin}/register?college=${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Demo Control Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold mb-3">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>NxtWave Growth Command Center</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Growth Dashboard</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium">
            Real-time analytics for the 7-day college workshop campaign. Evaluating acquisition volume against verified attendance & engaged learner impact.
          </p>
        </div>

        {/* 1-Click Demo Actions */}
        <div className="flex items-center gap-3 bg-slate-950/90 p-3 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Seeding 500 Records...' : 'Seed Demo Data (~500)'}</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isResetting}
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-950/50 text-rose-400 border border-slate-800 hover:border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
            <span>{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {isLoading || !data ? (
        <div className="text-center py-20 text-slate-400 text-sm flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
          <span>Loading dashboard analytics...</span>
        </div>
      ) : (
        <>
          {/* 1. Prominent Campaign Funnel */}
          <CampaignFunnel summary={data.summary} />

          {/* 2. Transparent Rule-Based Growth Insights */}
          <GrowthInsights insights={data.insights} />

          {/* 3. Interactive Conversion Charts */}
          <DashboardCharts
            rankings={data.rankings}
            channelStats={data.channelStats}
            dailyTrend={data.dailyTrend}
          />

          {/* 4. Engaged Learner Rankings Table */}
          <RankingsTable rankings={data.rankings} />

          {/* 5. College Referral URL Generator helper for Demo */}
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Unique College Referral Link Generator</h3>
                <p className="text-xs text-slate-400">
                  Copy unique referral URLs to test auto-attribution (`/register?college=slug`)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.rankings.slice(0, 6).map((c) => (
                <div
                  key={c.slug}
                  className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-bold text-white truncate">{c.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">/register?college={c.slug}</div>
                  </div>
                  <button
                    onClick={() => copyReferralUrl(c.slug)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors shrink-0"
                    title="Copy unique referral link"
                  >
                    {copiedSlug === c.slug ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
