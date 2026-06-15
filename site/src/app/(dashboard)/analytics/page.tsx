"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

export default function AnalyticsPage() {
  const { projects, getAllSessions } = useProjects();
  const sessions = getAllSessions();
  const [modal, setModal] = useState<string | null>(null);

  const totalSessions = sessions.length;
  const avgScore = totalSessions > 0 ? Math.round(sessions.reduce((a, s) => a + s.overallScore, 0) / totalSessions) : 0;
  const totalTime = sessions.reduce((a, s) => a + s.duration, 0);
  const totalQuestions = sessions.reduce((a, s) => a + s.questionsAsked.length, 0);

  const fmtTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const categoryAverages: Record<string, number[]> = {};
  for (const s of sessions) {
    for (const [cat, score] of Object.entries(s.categoryScores)) {
      if (!categoryAverages[cat]) categoryAverages[cat] = [];
      categoryAverages[cat].push(score);
    }
  }
  const categoryScores = Object.entries(categoryAverages).map(([cat, scores]) => ({
    name: cat,
    current: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));

  const scoreTrend = sessions.slice().reverse().map((s) => s.overallScore);

  return (
    <>
      <TopBar title="Analytics" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Performance Analytics</h2>
            <p className="text-sm text-text-secondary">Track your progress over time</p>
          </div>
          <button onClick={() => setModal("export")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Export Report</button>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-sm font-bold text-foreground mb-1">No analytics yet</h3>
            <p className="text-xs text-text-secondary mb-4">Complete a practice session to see your analytics</p>
            <Link href="/sessions/new" className="inline-block bg-brand text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-hover transition">Start Practicing</Link>
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Sessions", value: String(totalSessions) },
                { label: "Avg Score", value: String(avgScore) },
                { label: "Practice Time", value: fmtTime(totalTime) },
                { label: "Questions Faced", value: String(totalQuestions) },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-border rounded-xl p-4">
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">{s.label}</p>
                  <p className="text-2xl font-black text-foreground mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Score Trend */}
            {scoreTrend.length > 1 && (
              <div className="bg-white border border-border rounded-xl p-5 mb-6">
                <p className="text-xs font-semibold text-foreground mb-4">Score Trend ({scoreTrend.length} sessions)</p>
                <div className="flex items-end gap-2 h-[160px]">
                  {scoreTrend.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] font-bold text-brand">{v}</span>
                      <div className="w-full rounded-t" style={{ height: `${(v / 100) * 160}px`, backgroundColor: i === scoreTrend.length - 1 ? "#6B1D2A" : "#D4A574" }} />
                      <span className="text-[9px] text-text-tertiary">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Progress */}
            {categoryScores.length > 0 && (
              <div className="bg-white border border-border rounded-xl p-5">
                <p className="text-xs font-semibold text-foreground mb-3">Category Averages</p>
                <div className="space-y-3">
                  {categoryScores.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-text-secondary">{c.name}</span>
                        <span className="text-xs font-bold text-foreground">{c.current}</span>
                      </div>
                      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                        <div className="h-full bg-brand rounded-full" style={{ width: `${c.current}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {modal && <ComingSoonModal title="Export Analytics" description="Download a comprehensive analytics report as PDF. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
