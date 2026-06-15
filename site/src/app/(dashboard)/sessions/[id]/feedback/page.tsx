"use client";

import { useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

function FeedbackInner() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") || "";
  const { getSession, getProject, projects } = useProjects();

  const session = getSession(id);
  const project = getProject(projectId) || (projects.length > 0 ? projects[0] : undefined);
  const [modal, setModal] = useState<string | null>(null);

  if (!session) {
    return (
      <>
        <TopBar title="Session Feedback" />
        <div className="p-6 text-center py-20">
          <h2 className="text-lg font-bold text-foreground mb-2">Session not found</h2>
          <p className="text-sm text-text-secondary mb-4">This session may not exist yet or the data has been cleared.</p>
          <Link href="/sessions" className="text-sm text-brand font-semibold hover:underline">Back to Sessions</Link>
        </div>
      </>
    );
  }

  const overall = session.overallScore;
  const categoryEntries = Object.entries(session.categoryScores);
  const colors = ["#6B1D2A", "#8B4513", "#D4A574", "#6B1D2A", "#8B4513", "#D4A574"];
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <TopBar title="Session Feedback" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Session Feedback</h2>
            <p className="text-sm text-text-secondary capitalize">
              {session.mode} &middot; {session.style} &middot; {new Date(session.date).toLocaleDateString()} &middot; {fmt(session.duration)}
            </p>
            {project && <p className="text-xs text-text-tertiary mt-1">{project.title}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal("export")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Export PDF</button>
            <button onClick={() => setModal("share")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Share</button>
            <Link href={`/sessions/new?project=${projectId}`} className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">Practice Again</Link>
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
            <p className="text-[10px] text-text-tertiary mt-1">{session.questionsAsked.length} questions answered</p>
          </div>

          {/* Category Scores */}
          <div className="bg-white border border-border rounded-xl p-5 col-span-2">
            <p className="text-xs font-semibold text-foreground mb-3">Category Breakdown</p>
            {categoryEntries.length > 0 ? (
              <div className="space-y-2.5">
                {categoryEntries.map(([cat, score], i) => (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-[10px] text-text-secondary w-32 shrink-0">{cat}</span>
                    <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: colors[i % colors.length] }} />
                    </div>
                    <span className="text-xs font-bold text-foreground w-8 text-right">{score}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-tertiary">No category data available.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Strengths */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-success mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-success rounded-full" /> Strengths
            </p>
            <ul className="space-y-2">
              {session.strengths.map((s, i) => (
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
              {session.improvements.map((s, i) => (
                <li key={i} className="text-xs text-text-secondary leading-relaxed pl-3 border-l-2 border-warning/30">{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question-by-Question */}
        <div className="bg-white border border-border rounded-xl p-5">
          <p className="text-xs font-semibold text-foreground mb-3">Question-by-Question Review</p>
          <div className="space-y-3">
            {session.questionsAsked.map((qa, i) => (
              <div key={i} className="border border-border-light rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground mb-1">Q{i + 1}: {qa.question}</p>
                    <p className="text-xs text-text-secondary">{qa.answer.slice(0, 200)}{qa.answer.length > 200 ? "…" : ""}</p>
                  </div>
                  <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${qa.score >= 75 ? "bg-success-light text-success" : qa.score >= 60 ? "bg-warning-light text-warning" : "bg-error-light text-error"}`}>
                    {qa.score}
                  </div>
                </div>
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

export default function FeedbackPage() {
  return <Suspense fallback={<div className="p-6 text-center text-sm text-text-secondary">Loading feedback...</div>}><FeedbackInner /></Suspense>;
}
