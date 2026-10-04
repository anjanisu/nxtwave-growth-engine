'use client';

import React from 'react';
import { Lightbulb, AlertTriangle, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

interface InsightItem {
  id: string;
  type: 'ALERT' | 'HIGH_INTENT' | 'STAR_PERFORMER' | 'CHANNEL_ROI';
  collegeName?: string;
  title: string;
  description: string;
  actionableTip: string;
  metric: string;
}

interface GrowthInsightsProps {
  insights: InsightItem[];
}

export default function GrowthInsights({ insights }: GrowthInsightsProps) {
  const getBadgeStyle = (type: InsightItem['type']) => {
    switch (type) {
      case 'STAR_PERFORMER':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: Sparkles,
          iconColor: 'text-emerald-400',
        };
      case 'ALERT':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: AlertTriangle,
          iconColor: 'text-amber-400',
        };
      case 'HIGH_INTENT':
        return {
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          icon: TrendingUp,
          iconColor: 'text-cyan-400',
        };
      case 'CHANNEL_ROI':
        return {
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          icon: DollarSign,
          iconColor: 'text-purple-400',
        };
    }
  };

  return (
    <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl mb-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Lightbulb className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Rule-Based Growth Campaign Insights</h3>
            <p className="text-xs text-slate-400">
              Automated growth recommendations computed directly from live student conversion metrics.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
          Transparent Rule Engine Active
        </span>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          No insights generated yet. Click &quot;Seed Demo Data&quot; to populate 500+ registrations.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((item) => {
            const style = getBadgeStyle(item.type);
            const Icon = style.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${style.bg}`}>
                      <Icon className={`w-3.5 h-3.5 ${style.iconColor}`} />
                      {item.title}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider shrink-0">Action:</span>
                  <p className="text-[11px] text-slate-400 italic">
                    {item.actionableTip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
