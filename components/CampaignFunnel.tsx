'use client';

import React from 'react';
import { Target, Users, UserCheck, TrendingUp, Award, ArrowDownRight } from 'lucide-react';

interface CampaignFunnelProps {
  summary: {
    targetGoal: number;
    totalRegistrations: number;
    totalAttendees: number;
    overallAttendanceRate: number;
    totalCollegesCount: number;
    totalImpactScore: number;
  };
}

export default function CampaignFunnel({ summary }: CampaignFunnelProps) {
  const goalProgress = Math.min(
    100,
    Math.round((summary.totalRegistrations / summary.targetGoal) * 100)
  );

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Target className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Campaign Conversion Funnel</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking genuine conversion from acquisition to verified workshop attendance & engaged learner output.
          </p>
        </div>

        {/* Target Progress Pill */}
        <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">7-Day Target Progress</div>
            <div className="text-sm font-extrabold text-cyan-400">
              {summary.totalRegistrations} / {summary.targetGoal} Signups ({goalProgress}%)
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center font-bold text-xs text-white relative">
            <svg className="w-12 h-12 transform -rotate-90 absolute">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                className="text-cyan-500"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * goalProgress) / 100}
                fill="transparent"
              />
            </svg>
            <span>{goalProgress}%</span>
          </div>
        </div>
      </div>

      {/* Visual Funnel Step Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Step 1: Target Goal */}
        <div className="relative bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 1 • Target</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{summary.targetGoal}</div>
            <div className="text-[11px] font-medium text-slate-400">Target Registrations</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-400 font-mono">
            7-Day Student Goal
          </div>
        </div>

        {/* Step 2: Registrations */}
        <div className="relative bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between group hover:border-cyan-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Step 2 • Acquisition</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-cyan-400">{summary.totalRegistrations}</div>
            <div className="text-[11px] font-medium text-slate-400">Actual Registrations</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-emerald-400 font-semibold flex items-center justify-between">
            <span>{goalProgress}% of Target</span>
            <ArrowDownRight className="w-3 h-3 text-cyan-400" />
          </div>
        </div>

        {/* Step 3: Verified Attendees */}
        <div className="relative bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Step 3 • Attendance</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">{summary.totalAttendees}</div>
            <div className="text-[11px] font-medium text-slate-400">Verified Attendees</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-emerald-400 font-semibold flex items-center justify-between">
            <span>Live Check-Ins</span>
            <ArrowDownRight className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Step 4: Attendance Rate */}
        <div className="relative bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between group hover:border-purple-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Step 4 • Efficiency</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-purple-400">{summary.overallAttendanceRate}%</div>
            <div className="text-[11px] font-medium text-slate-400">Overall Attendance Rate</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-purple-300 font-semibold flex items-center justify-between">
            <span>Attended / Signups</span>
            <ArrowDownRight className="w-3 h-3 text-purple-400" />
          </div>
        </div>

        {/* Step 5: Engaged Learners / Total Impact Score */}
        <div className="relative bg-gradient-to-br from-cyan-950/50 via-slate-950 to-blue-950/40 p-4 rounded-2xl border border-cyan-500/30 flex flex-col justify-between group shadow-lg shadow-cyan-950/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">Step 5 • Output</span>
            <Award className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{summary.totalImpactScore}</div>
            <div className="text-[11px] font-medium text-cyan-200">Engaged Impact Score</div>
          </div>
          <div className="mt-3 pt-2 border-t border-cyan-900/50 text-[10px] text-cyan-300 font-semibold">
            Across {summary.totalCollegesCount} Colleges
          </div>
        </div>
      </div>
    </div>
  );
}
