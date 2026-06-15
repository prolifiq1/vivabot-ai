"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

export default function DashboardPage() {
  const { projects, getAllSessions } = useProjects();
  const sessions = getAllSessions();
  const [modal, setModal] = useState<string | null>(null);

  const totalSessions = sessions.length;
  const avgScore = totalSessions > 0
    ? Math.round(sessions.reduce((a, s) => a + s.overallScore, 0) / totalSessions)
    : 0;
  const totalQuestions = projects.reduce((a, p) => a + p.questionCount, 0);

  const recentSessions = sessions.slice(0, 4);

  const categoryAverages: Record<string, number[]> = {};
  for (const s of sessions) {
    for (const [cat, score] of Object.entries(s.categoryScores)) {
      if (!categoryAverages[cat]) categoryAverages[cat] = [];
      categoryAverages[cat].push(score);
    }
  }
  const categoryScores = Object.entries(categoryAverages).map(([cat, scores]) => ({
    label: cat,
    score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));

  const weakAreas = [...categoryScores].sort((a, b) => a.score - b.score).slice(0, 3);

  const hasData = projects.length > 0;

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="p-6 animate-fade-in">
        {!hasData ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎓</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Welcome to VivaBot</h2>
            <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">Upload your thesis or research document to get started. We&apos;ll extract your content, generate questions, and prepare your AI examiner.</p>
            <Link href="/projects/new" className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-hover transition">
              Upload Your First Document
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {/* Readiness Gauge */}
            <div className="bg-white border border-border rounded-xl p-5 row-span-2">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Defense Readiness</h3>
              <div className="flex justify-center mb-4">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#6B1D2A" strokeWidth="8" strokeDasharray={`${avgScore * 2.64} 264`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-brand">{avgScore || "—"}</span>
                    <span className="text-[10px] text-text-tertiary">of 100</span>
                  </div>
                </div>
              </div>

              {categoryScores.length > 0 && (
                <div className="space-y-2">
                  {categoryScores.map((c) => (
                    <div key={c.label}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-text-secondary">{c.label}</span>
                        <span className="font-bold text-foreground">{c.score}</span>
                      </div>
                      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                        <div className="h-full bg-brand rounded-full" style={{ width: `${c.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-border-light grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-black text-foreground">{totalSessions}</p>
                  <p className="text-[9px] text-text-tertiary">Sessions</p>
                </div>
                <div>
                  <p className="text-lg font-black text-foreground">{projects.length}</p>
                  <p className="text-[9px] text-text-tertiary">Projects</p>
                </div>
                <div>
                  <p className="text-lg font-black text-foreground">{totalQuestions}</p>
                  <p className="text-[9px] text-text-tertiary">Questions</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-span-2 grid grid-cols-3 gap-3">
              <Link href="/sessions/new" className="bg-brand text-white rounded-xl p-5 hover:bg-brand-hover transition">
                <p className="text-sm font-bold">Start Practice</p>
                <p className="text-[10px] text-white/70 mt-1">Begin a new viva session</p>
              </Link>
              <Link href="/projects/new" className="bg-white border border-border rounded-xl p-5 hover:border-brand/30 transition">
                <p className="text-sm font-bold text-foreground">Upload Document</p>
                <p className="text-[10px] text-text-secondary mt-1">Add a new thesis or paper</p>
              </Link>
              <button onClick={() => setModal("invite")} className="bg-white border border-border rounded-xl p-5 hover:border-brand/30 transition text-left">
                <p className="text-sm font-bold text-foreground">Invite Supervisor</p>
                <p className="text-[10px] text-text-secondary mt-1">Share progress</p>
              </button>
            </div>

            {/* Recent Sessions */}
            <div className="col-span-2 bg-white border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-foreground">Recent Sessions</h3>
                <Link href="/sessions" className="text-[10px] text-brand font-semibold hover:underline">View all</Link>
              </div>
              {recentSessions.length === 0 ? (
                <p className="text-xs text-text-tertiary text-center py-6">No sessions yet. Start practicing!</p>
              ) : (
                <div className="space-y-2">
                  {recentSessions.map((s) => {
                    const proj = projects.find((p) => p.id === s.projectId);
                    return (
                      <Link key={s.id} href={`/sessions/${s.id}/feedback?project=${s.projectId}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition">
                        <div>
                          <p className="text-xs font-medium text-foreground capitalize">{s.mode} &middot; {s.style}</p>
                          <p className="text-[10px] text-text-tertiary">{proj?.title.slice(0, 40)} &middot; {new Date(s.date).toLocaleDateString()}</p>
                        </div>
                        <div className={`text-sm font-bold ${s.overallScore >= 75 ? "text-success" : s.overallScore >= 60 ? "text-warning" : "text-error"}`}>
                          {s.overallScore}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Weak Areas */}
            {weakAreas.length > 0 && (
              <div className="col-span-3 bg-white border border-border rounded-xl p-5">
                <h3 className="text-xs font-semibold text-foreground mb-3">Areas to Focus On</h3>
                <div className="grid grid-cols-3 gap-3">
                  {weakAreas.map((w) => (
                    <div key={w.label} className="bg-warning-light/50 border border-warning/20 rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground">{w.label}</p>
                      <p className="text-lg font-black text-warning mt-1">{w.score}</p>
                      <Link href="/sessions/new" className="text-[10px] text-brand font-semibold hover:underline mt-1 inline-block">Practice this →</Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {modal === "invite" && <ComingSoonModal title="Invite Supervisor" description="Share your progress with your supervisor via email. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
