'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { CollegeRanking } from './RankingsTable';

interface DashboardChartsProps {
  rankings: CollegeRanking[];
  channelStats: Array<{
    channel: string;
    signups: number;
    attendees: number;
    attendanceRatePct: number;
  }>;
  dailyTrend: Array<{ date: string; registrations: number }>;
}

export default function DashboardCharts({
  rankings,
  channelStats,
  dailyTrend,
}: DashboardChartsProps) {
  // Top 8 Colleges for Bar Comparison
  const topColleges = rankings.slice(0, 8).map((c) => ({
    name: c.name.split(',')[0].replace('Institute of Technology', 'IT').replace('University', 'Univ'),
    Registrations: c.registrations,
    Attendees: c.attendees,
    ImpactScore: c.impactScore,
  }));

  const formattedChannels = channelStats.map((cs) => {
    const labelMap: Record<string, string> = {
      CLUB: 'Student Clubs',
      COORDINATOR: 'Coordinators',
      FACULTY: 'TPO / Faculty',
      WHATSAPP: 'WhatsApp Groups',
      PAID_ADS: 'Paid Experiment (₹2k)',
    };
    return {
      channelName: labelMap[cs.channel] || cs.channel,
      Registrations: cs.signups,
      Attendees: cs.attendees,
      RatePct: cs.attendanceRatePct,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Chart 1: Top Colleges - Registrations vs Attendees */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white">Top Colleges Conversion Comparison</h3>
            <p className="text-xs text-slate-400">Comparing total registrations against verified workshop attendance</p>
          </div>
        </div>

        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topColleges} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} angle={-25} textAnchor="end" />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Registrations" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Attendees" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Acquisition Channel Breakdown */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white">Acquisition Channel Conversion Efficiency</h3>
            <p className="text-xs text-slate-400">Comparing volume vs quality across clubs, faculty, and paid experiment</p>
          </div>
        </div>

        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedChannels} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="channelName" stroke="#94A3B8" fontSize={10} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Registrations" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Attendees" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: 7-Day Campaign Timeline (Full Width) */}
      {dailyTrend.length > 0 && (
        <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-white">7-Day Registration Velocity Timeline</h3>
              <p className="text-xs text-slate-400">Daily trajectory toward the 500-student workshop target</p>
            </div>
          </div>

          <div className="h-60 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRegistrations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
