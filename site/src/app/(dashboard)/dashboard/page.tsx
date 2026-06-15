"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const categories = [
  { name: "Knowledge", score: 81, color: "#10B981" },
  { name: "Methodology", score: 65, color: "#F59E0B" },
  { name: "Analysis", score: 74, color: "#3B82F6" },
  { name: "Communication", score: 78, color: "#3B82F6" },
  { name: "Self-Assessment", score: 58, color: "#F59E0B" },
  { name: "Positioning", score: 70, color: "#3B82F6" },
];

const recentSessions = [
  { id: "s1", mode: "Standard", focus: "Full thesis — Balanced", score: 74, color: "text-info", date: "Today" },
  { id: "s2", mode: "Quick", focus: "Ch.4 Methodology", score: 62, color: "text-warning", date: "Yesterday" },
  { id: "s3", mode: "Full", focus: "Full thesis — Hostile", score: 78, color: "text-success", date: "Jun 12" },
  { id: "s4", mode: "Standard", focus: "Literature Review", score: 66, color: "text-warning", date: "Jun 11" },
];

const weakAreas = [
  { area: "Statistical justification", section: "Ch.4 Methodology, Section 4.3", pages: "pp. 42-44" },
  { area: "Limitations awareness", section: "Ch.6 Discussion, Section 6.4", pages: "pp. 78-80" },
  { area: "Differential privacy tradeoffs", section: "Ch.3 Framework, Section 3.2", pages: "pp. 28-31" },
];

export default function DashboardPage() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Welcome back, Amara</h2>
            <p className="text-sm text-text-secondary">PhD Computer Science — Federated Learning for Healthcare</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/sessions/new"
              className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition"
            >
              Start Practice
            </Link>
            <button
              onClick={() => setModal("invite")}
              className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 hover:text-brand transition"
            >
              Invite Supervisor
            </button>
          </div>
        </div>

        {/* Top cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Readiness Gauge */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-4">Readiness Score</p>
            <div className="flex items-center justify-center mb-3">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E0DB" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#6B1D2A" strokeWidth="10"
                    strokeDasharray={`${72 * 3.267} ${326.7 - 72 * 3.267}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-brand">72</span>
                  <span className="text-[10px] font-semibold text-success">Ready</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-success font-medium">+8 from last week</p>
          </div>

          {/* Category Scores */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Category Scores</p>
            <div className="space-y-2.5">
              {categories.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-[11px] text-foreground w-24 truncate">{c.name}</span>
                  <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.score}%`, backgroundColor: c.color }} />
                  </div>
                  <span className="text-[11px] font-bold w-7 text-right" style={{ color: c.color }}>{c.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Defense Countdown</p>
            <div className="text-center mb-4">
              <span className="text-5xl font-extrabold text-accent">24</span>
              <p className="text-xs text-text-secondary mt-1">days remaining</p>
            </div>
            <div className="space-y-2 text-xs text-text-secondary">
              <div className="flex justify-between"><span>Practice streak</span><span className="font-bold text-foreground">5 days</span></div>
              <div className="flex justify-between"><span>Sessions completed</span><span className="font-bold text-foreground">12</span></div>
              <div className="flex justify-between"><span>Total practice</span><span className="font-bold text-foreground">4h 5m</span></div>
            </div>
            <button
              onClick={() => setModal("streak")}
              className="w-full mt-3 py-2 bg-accent-light text-brand-secondary text-[11px] font-semibold rounded-lg hover:bg-brand-secondary-light transition"
            >
              View Milestones
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Recent Sessions */}
          <div className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">Recent Sessions</p>
              <Link href="/sessions" className="text-[11px] text-brand font-medium hover:underline">View all</Link>
            </div>
            <div className="space-y-1">
              {recentSessions.map((s) => (
                <Link key={s.id} href={`/sessions/${s.id}/feedback`} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-surface transition">
                  <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">{s.mode}</span>
                  <span className="text-[11px] text-text-secondary flex-1 truncate">{s.focus}</span>
                  <span className={`text-sm font-bold ${s.color}`}>{s.score}</span>
                  <span className="text-[10px] text-text-tertiary w-16 text-right">{s.date}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Weak Areas */}
          <div className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">Areas to Improve</p>
              <Link href="/analytics" className="text-[11px] text-brand font-medium hover:underline">Full analysis</Link>
            </div>
            <div className="space-y-3">
              {weakAreas.map((w) => (
                <div key={w.area} className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-semibold text-foreground">{w.area}</p>
                    <p className="text-[10px] text-text-tertiary">{w.section} — {w.pages}</p>
                  </div>
                  <Link
                    href="/sessions/new"
                    className="text-[10px] font-semibold text-brand hover:underline whitespace-nowrap"
                  >
                    Practice this
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal === "invite" && (
        <ComingSoonModal title="Invite Supervisor" description="Share your readiness dashboard with your supervisor so they can track your preparation progress. Coming in V1." onClose={() => setModal(null)} />
      )}
      {modal === "streak" && (
        <ComingSoonModal title="Milestones & Achievements" description="Track your preparation milestones — first session, 5-day streak, score improvements, and more. Coming in V1." onClose={() => setModal(null)} />
      )}
    </>
  );
}
