'use client';

import React, { useState } from 'react';
import { Trophy, Search, Sparkles, Filter, Info } from 'lucide-react';

export interface CollegeRanking {
  rank: number;
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  coordinatorName: string;
  channelType: string;
  registrations: number;
  attendees: number;
  attendanceRatePct: number;
  impactScore: number;
}

interface RankingsTableProps {
  rankings: CollegeRanking[];
  isLoading?: boolean;
}

export default function RankingsTable({ rankings, isLoading }: RankingsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('ALL');

  const filteredRankings = rankings.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.coordinatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = selectedChannel === 'ALL' || item.channelType === selectedChannel;
    return matchesSearch && matchesChannel;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-extrabold text-xs shadow-md shadow-amber-500/10">
          🥇 1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-xl bg-slate-300/20 text-slate-200 border border-slate-400/40 flex items-center justify-center font-extrabold text-xs">
          🥈 2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-xl bg-amber-700/20 text-amber-500 border border-amber-600/40 flex items-center justify-center font-extrabold text-xs">
          🥉 3
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 flex items-center justify-center font-bold text-xs">
        #{rank}
      </div>
    );
  };

  const getChannelBadge = (channel: string) => {
    const map: Record<string, { label: string; color: string }> = {
      CLUB: { label: 'Student Club', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
      COORDINATOR: { label: 'Coordinator', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
      FACULTY: { label: 'TPO / Faculty', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
      WHATSAPP: { label: 'WhatsApp', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
      PAID_ADS: { label: 'Paid Ads (₹2k)', color: 'bg-pink-500/10 text-pink-400 border-pink-500/30' },
    };
    const c = map[channel] || { label: channel, color: 'bg-slate-800 text-slate-300 border-slate-700' };
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${c.color}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl overflow-hidden mb-8">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">Engaged Learner Rankings</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ranked by Impact Score <code className="text-cyan-400 font-mono text-[11px] bg-slate-950 px-1.5 py-0.5 rounded">Verified Attendees × (1 + Attendance Rate)</code>
          </p>
        </div>

        {/* Search & Channel Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search college, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="bg-transparent text-slate-300 font-medium py-1 px-2 focus:outline-none text-xs cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">All Channels</option>
              <option value="CLUB" className="bg-slate-900 text-white">Student Clubs</option>
              <option value="COORDINATOR" className="bg-slate-900 text-white">Coordinators</option>
              <option value="FACULTY" className="bg-slate-900 text-white">TPO / Faculty</option>
              <option value="WHATSAPP" className="bg-slate-900 text-white">WhatsApp Groups</option>
              <option value="PAID_ADS" className="bg-slate-900 text-white">Paid Experiment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 text-center">Rank</th>
              <th className="py-3.5 px-4">College Institute</th>
              <th className="py-3.5 px-4 text-center">Acquisition Channel</th>
              <th className="py-3.5 px-4 text-right">Registrations</th>
              <th className="py-3.5 px-4 text-right">Verified Attendees</th>
              <th className="py-3.5 px-4 text-right">Attendance Rate</th>
              <th className="py-3.5 px-4 text-right">
                <span className="inline-flex items-center gap-1 text-cyan-400">
                  Impact Score <Sparkles className="w-3 h-3" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  Loading rankings data...
                </td>
              </tr>
            ) : filteredRankings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No colleges found. Click &quot;Seed Demo Data&quot; to populate 500+ registrations.
                </td>
              </tr>
            ) : (
              filteredRankings.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    item.rank <= 3 ? 'bg-slate-900/40' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 flex justify-center">
                    {getRankBadge(item.rank)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{item.city}, {item.state}</span>
                      <span>•</span>
                      <span className="text-slate-400">{item.coordinatorName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {getChannelBadge(item.channelType)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-300">
                    {item.registrations}
                  </td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-emerald-400">
                    {item.attendees}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-bold text-slate-200">{item.attendanceRatePct}%</div>
                    <div className="w-16 h-1.5 bg-slate-950 rounded-full ml-auto overflow-hidden mt-1 border border-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          item.attendanceRatePct >= 70
                            ? 'bg-emerald-400'
                            : item.attendanceRatePct >= 50
                            ? 'bg-cyan-400'
                            : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min(100, item.attendanceRatePct)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-black text-sm text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-xl border border-cyan-500/30">
                      {item.impactScore}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Formula Explanation */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Why Impact Score? Colleges with high attendance rates rank significantly higher than raw signup volume.</span>
        </div>
        <div className="font-mono text-slate-400">
          Showing {filteredRankings.length} of {rankings.length} Colleges
        </div>
      </div>
    </div>
  );
}
