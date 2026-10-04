'use client';

import React, { useState } from 'react';
import { CheckCircle2, Search, UserCheck, AlertCircle, Sparkles, Building2, Calendar, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AttendancePage() {
  const [emailInput, setEmailInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [studentRecord, setStudentRecord] = useState<{
    id: string;
    studentName: string;
    email: string;
    branch: string;
    graduationYear: number;
    college: {
      name: string;
      city: string;
    };
    attendance?: {
      attendedAt: string;
    } | null;
  } | null>(null);

  const [isAlreadyAttended, setIsAlreadyAttended] = useState(false);
  const [attendanceSuccess, setAttendanceSuccess] = useState<string | null>(null);

  // Search registration by email
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setAttendanceSuccess(null);
    setStudentRecord(null);

    if (!emailInput.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setIsSearching(true);

    try {
      const res = await fetch(`/api/attendance?email=${encodeURIComponent(emailInput)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'No student registration found with this email address.');
        setIsSearching(false);
        return;
      }

      setStudentRecord(data.registration);
      setIsAlreadyAttended(data.isAlreadyAttended);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lookup failed';
      setErrorMessage(msg);
    } finally {
      setIsSearching(false);
    }
  };

  // Mark attendance
  const handleMarkAttendance = async () => {
    if (!studentRecord) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: studentRecord.email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to mark attendance.');
        setIsSubmitting(false);
        return;
      }

      setAttendanceSuccess(data.message);
      setIsAlreadyAttended(true);
      if (data.attendance) {
        setStudentRecord({
          ...studentRecord,
          attendance: data.attendance,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Check-in failed';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-3">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Live Workshop Verification</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Student Attendance Check-In</h1>
        <p className="text-xs text-slate-300 mt-1 font-medium max-w-lg mx-auto">
          Verify your registered email to mark attendance for &quot;Build Your First AI Project in 60 Minutes&quot; and update your college ranking in real-time.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8">
        {/* Email Lookup Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Enter Registered Email Address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. aarav.sharma@student.edu.in"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSearching ? (
                <span>Searching...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Verify Email</span>
                </>
              )}
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Verified Student Details Card */}
        {studentRecord && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-900 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                  {studentRecord.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{studentRecord.studentName}</h3>
                  <p className="text-xs text-slate-400">{studentRecord.email}</p>
                </div>
              </div>

              {isAlreadyAttended ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Attendee
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                  Registration Verified
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">College Institution</span>
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {studentRecord.college.name}
                </span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">Branch & Graduation</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {studentRecord.branch} ({studentRecord.graduationYear})
                </span>
              </div>
            </div>

            {attendanceSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{attendanceSuccess}</span>
              </div>
            )}

            {!isAlreadyAttended ? (
              <button
                onClick={handleMarkAttendance}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Marking Attendance...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Live Attendance</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-center py-2 text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Attendance timestamp recorded: {new Date(studentRecord.attendance?.attendedAt || Date.now()).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
