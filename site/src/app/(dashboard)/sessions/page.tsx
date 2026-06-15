"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

function badge(score: number) {
  if (score >= 75) return "bg-success-light text-success";
  if (score >= 60) return "bg-warning-light text-warning";
  return "bg-error-light text-error";
}

function readiness(score: number) {
  if (score >= 75) return "Ready";
  if (score >= 60) return "Approaching";
  return "Needs Work";
}

function fmtDuration(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function SessionsPage() {
  const { getAllSessions, projects } = useProjects();
  const sessions = getAllSessions();
  const [modal, setModal] = useState<string | null>(null);

  const getProjectForSession = (projectId: string) => projects.find((p) => p.id === projectId);

  return (
    <>
      <TopBar title="Sessions" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Practice Sessions</h2>
            <p className="text-sm text-text-secondary">Review past sessions or start a new one</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal("filter")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Filter</button>
            <Link href="/sessions/new" className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">New Session</Link>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">No sessions yet</h3>
            <p className="text-xs text-text-secondary mb-4">Start a practice session to see your results here</p>
            <Link href="/sessions/new" className="inline-block bg-brand text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-hover transition">
              Start Your First Session
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  {["Date", "Project", "Mode", "Style", "Duration", "Questions", "Score", "Readiness", ""].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => {
                  const proj = getProjectForSession(s.projectId);
                  return (
                    <tr key={s.id} className="border-b border-border-light last:border-none hover:bg-surface transition">
                      <td className="px-4 py-3 text-xs text-text-secondary">{new Date(s.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-xs text-foreground font-medium">{proj?.title.slice(0, 30) || "Unknown"}…</td>
                      <td className="px-4 py-3"><span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded capitalize">{s.mode}</span></td>
                      <td className="px-4 py-3 text-xs text-text-secondary capitalize">{s.style}</td>
                      <td className="px-4 py-3 text-xs text-text-secondary font-mono">{fmtDuration(s.duration)}</td>
                      <td className="px-4 py-3 text-xs text-text-secondary">{s.questionsAsked.length}</td>
                      <td className="px-4 py-3 text-sm font-bold text-brand">{s.overallScore}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge(s.overallScore)}`}>{readiness(s.overallScore)}</span></td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/sessions/${s.id}/feedback?project=${s.projectId}`} className="text-[11px] text-brand font-semibold hover:underline">View</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <ComingSoonModal title="Filter Sessions" description="Filter sessions by mode, style, date range, and score. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
