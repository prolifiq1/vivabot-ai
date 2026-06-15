"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const scores = [
  { label: "Knowledge & Understanding", score: 78, color: "#6B1D2A" },
  { label: "Critical Analysis", score: 65, color: "#8B4513" },
  { label: "Methodology Justification", score: 72, color: "#D4A574" },
  { label: "Communication Clarity", score: 82, color: "#6B1D2A" },
  { label: "Literature Engagement", score: 68, color: "#8B4513" },
  { label: "Defense Under Pressure", score: 58, color: "#D4A574" },
];

const strengths = [
  "Strong opening summary of central thesis contribution",
  "Good connection between federated learning and healthcare privacy requirements",
  "Confident articulation of the FedAvg extension approach",
];

const improvements = [
  "Strengthen justification for epsilon=1.0 privacy budget — consider referencing comparable studies",
  "Prepare a more detailed defense of N=47 sample size with power analysis references",
  "Practice handling adversarial follow-ups about limitations without becoming defensive",
];

const timeline = [
  { time: "0:00", event: "Session started", type: "info" },
  { time: "0:32", event: "Q1: Central contribution — Strong answer", type: "success" },
  { time: "2:15", event: "Q2: Why federated learning — Good response", type: "success" },
  { time: "4:48", event: "Q3: Epsilon parameter — Needs improvement", type: "warning" },
  { time: "7:22", event: "Q4: Sample size — Weak defense", type: "error" },
  { time: "10:05", event: "Q5: McMahan extension — Adequate", type: "info" },
  { time: "12:30", event: "Q6: Limitations — Good self-awareness", type: "success" },
  { time: "14:32", event: "Session ended", type: "info" },
];

export default function FeedbackPage() {
  const [modal, setModal] = useState<string | null>(null);
  const overall = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);

  return (
    <>
      <TopBar title="Session Feedback" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Session Feedback</h2>
            <p className="text-sm text-text-secondary">Standard &middot; Balanced &middot; Full thesis &middot; Jun 15, 2026 &middot; 14:32</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal("export")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Export PDF</button>
            <button onClick={() => setModal("share")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Share</button>
            <Link href="/sessions/new" className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">Practice Again</Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Overall Score */}
          <div className="bg-white border border-border rounded-xl p-5 text-center">
            <div className="relative w-28 h-28 mx-auto mb-3">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#6B1D2A" strokeWidth="8" strokeDasharray={`${overall * 2.64} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-brand">{overall}</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-foreground">Overall Score</p>
            <p className="text-[10px] text-text-tertiary mt-0.5">
              {overall >= 75 ? "Defense Ready" : overall >= 60 ? "Approaching Ready" : "Needs More Practice"}
            </p>
          </div>

          {/* Category Scores */}
          <div className="bg-white border border-border rounded-xl p-5 col-span-2">
            <p className="text-xs font-semibold text-foreground mb-3">Category Breakdown</p>
            <div className="space-y-2.5">
              {scores.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-[10px] text-text-secondary w-40 shrink-0">{s.label}</span>
                  <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.score}%`, backgroundColor: s.color }} />
                  </div>
                  <span className="text-xs font-bold text-foreground w-8 text-right">{s.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Strengths */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-success mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-success rounded-full" /> Strengths
            </p>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="text-xs text-text-secondary leading-relaxed pl-3 border-l-2 border-success/30">{s}</li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-warning mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-warning rounded-full" /> Areas for Improvement
            </p>
            <ul className="space-y-2">
              {improvements.map((s, i) => (
                <li key={i} className="text-xs text-text-secondary leading-relaxed pl-3 border-l-2 border-warning/30">{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-border rounded-xl p-5">
          <p className="text-xs font-semibold text-foreground mb-3">Session Timeline</p>
          <div className="space-y-2">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-text-tertiary w-10 shrink-0">{t.time}</span>
                <span className={`w-2 h-2 rounded-full shrink-0 ${t.type === "success" ? "bg-success" : t.type === "warning" ? "bg-warning" : t.type === "error" ? "bg-error" : "bg-text-tertiary"}`} />
                <span className="text-xs text-text-secondary">{t.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal === "export" && <ComingSoonModal title="Export Feedback PDF" description="Download a detailed PDF report of your session performance. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "share" && <ComingSoonModal title="Share with Supervisor" description="Send this feedback to your supervisor for review. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
