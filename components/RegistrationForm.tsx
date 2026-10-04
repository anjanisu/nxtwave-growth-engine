'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Rocket, Sparkles, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, GraduationCap, Code2, ArrowRight } from 'lucide-react';
import { PredefinedCollege } from '@/lib/colleges';

function FormContent() {
  const searchParams = useSearchParams();
  const collegeParam = searchParams.get('college');

  const [colleges, setColleges] = useState<PredefinedCollege[]>([]);
  const [selectedCollegeSlug, setSelectedCollegeSlug] = useState<string>('');
  const [attributedCollegeName, setAttributedCollegeName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    whatsapp: '',
    branch: 'Computer Science & Engg (CSE)',
    graduationYear: 2025,
    projectInterest: 'Generative AI App & LLM Wrapper',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    studentName: string;
    collegeName: string;
    whatsappGroupUrl: string;
  } | null>(null);

  // Fetch colleges list & handle query parameter attribution
  useEffect(() => {
    async function loadColleges() {
      try {
        const res = await fetch('/api/colleges');
        const data = await res.json();
        if (data.success && data.colleges) {
          setColleges(data.colleges);

          if (collegeParam) {
            const matched = data.colleges.find(
              (c: PredefinedCollege) => c.slug.toLowerCase() === collegeParam.toLowerCase()
            );
            if (matched) {
              setSelectedCollegeSlug(matched.slug);
              setAttributedCollegeName(matched.name);
            } else {
              setSelectedCollegeSlug(data.colleges[0]?.slug || '');
            }
          } else {
            setSelectedCollegeSlug(data.colleges[0]?.slug || '');
          }
        }
      } catch (err) {
        console.error('Failed to load colleges', err);
      }
    }
    loadColleges();
  }, [collegeParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.studentName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!selectedCollegeSlug) {
      setErrorMessage('Please select your college.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          collegeSlug: selectedCollegeSlug,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Registration failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSuccessData({
        message: data.message,
        studentName: data.registration.studentName,
        collegeName: data.registration.college.name,
        whatsappGroupUrl: data.whatsappGroupUrl,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Dynamic Attribution Banner if college param present */}
      {attributedCollegeName && (
        <div className="mb-6 p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-between shadow-lg shadow-cyan-950/30 animate-pulse">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300">
                Exclusive College Partnership Referral
              </div>
              <div className="text-sm font-bold text-white">
                You are registering via <span className="text-cyan-400">{attributedCollegeName}</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono">
            Auto-Attributed
          </span>
        </div>
      )}

      {/* Main Workshop Registration Card */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Live Hands-on Workshop</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Build Your First AI Project in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">60 Minutes</span>
          </h1>
          <p className="text-sm text-slate-300 mt-2 font-medium">
            Join 500+ final-year engineering students nationwide. Learn LLM integrations, prompt architecture, and deploy a live working AI application.
          </p>
        </div>

        {/* Success Modal View */}
        {successData ? (
          <div className="bg-slate-950 p-8 rounded-2xl border border-emerald-500/30 text-center max-w-xl mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Registration Confirmed!</h2>
            <p className="text-xs text-slate-300 mt-1 font-medium">{successData.message}</p>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 my-6 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-bold text-white">{successData.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Associated College:</span>
                <span className="font-bold text-cyan-400">{successData.collegeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-emerald-400">Registered • Pending Check-in</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={successData.whatsappGroupUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
              >
                <span>Join Student WhatsApp Community</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setSuccessData(null)}
                className="text-xs text-slate-400 hover:text-white underline block mx-auto pt-2"
              >
                Register Another Student
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Workshop Title (Read-only) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Selected Workshop Session
              </label>
              <input
                type="text"
                disabled
                value="Build Your First AI Project in 60 Minutes (NxtWave Live)"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-cyan-400 font-bold cursor-not-allowed"
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. aarav.sharma@student.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Protected by duplicate prevention algorithm.
              </span>
            </div>

            {/* College Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Select Engineering College *
              </label>
              <select
                value={selectedCollegeSlug}
                onChange={(e) => {
                  setSelectedCollegeSlug(e.target.value);
                  setAttributedCollegeName(null);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {colleges.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                    {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Grid 2 Columns: Branch & Grad Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Branch of Engineering *
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Computer Science & Engg (CSE)">Computer Science & Engg (CSE)</option>
                  <option value="Information Tech (IT)">Information Tech (IT)</option>
                  <option value="Electronics (ECE)">Electronics (ECE)</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Electrical (EEE)">Electrical (EEE)</option>
                  <option value="Mechanical Engg">Mechanical Engg</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Graduation Year *
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value={2025}>2025 (Final Year)</option>
                  <option value={2026}>2026 (Pre-Final Year)</option>
                  <option value={2024}>2024 (Passed Out)</option>
                  <option value={2027}>2027 (Junior)</option>
                </select>
              </div>
            </div>

            {/* WhatsApp Number & Project Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" /> WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 9876543210"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" /> AI Project Interest
                </label>
                <select
                  value={formData.projectInterest}
                  onChange={(e) => setFormData({ ...formData, projectInterest: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Generative AI App & LLM Wrapper">Generative AI App & LLM Wrapper</option>
                  <option value="Autonomous AI Agent System">Autonomous AI Agent System</option>
                  <option value="Computer Vision & OCR Pipeline">Computer Vision & OCR Pipeline</option>
                  <option value="AI Knowledge Base RAG Assistant">AI Knowledge Base RAG Assistant</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering Student...</span>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Reserve Free Spot in 60-Min AI Workshop</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function RegistrationForm() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading registration form...</div>}>
      <FormContent />
    </Suspense>
  );
}
