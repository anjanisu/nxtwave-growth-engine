import React from 'react';
import { Rocket, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#080B11] text-slate-400 py-8 px-4 text-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">NxtWave Growth Engine</span>
          <span className="text-slate-500 font-mono">v1.0 (7-Day College Growth Challenge)</span>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Duplicate Protection Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Impact Score Engine</span>
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          Target: 500 Final-Year Engineering Students • Budget: ₹2,000
        </div>
      </div>
    </footer>
  );
}
