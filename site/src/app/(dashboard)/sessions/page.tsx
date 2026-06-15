"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const sessions = [
  { id: "s1", mode: "Standard", style: "Balanced", focus: "Full thesis", iface: "Text", score: 74, readiness: "Ready", date: "Jun 15, 2026", duration: "14:32" },
  { id: "s2", mode: "Quick", style: "Friendly", focus: "Ch.4 Methodology", iface: "Text", score: 62, readiness: "Approaching", date: "Jun 14, 2026", duration: "4:58" },
  { id: "s3", mode: "Full Defense", style: "Hostile", focus: "Full thesis", iface: "Voice", score: 78, readiness: "Ready", date: "Jun 12, 2026", duration: "43:21" },
  { id: "s4", mode: "Standard", style: "Balanced", focus: "Literature Review", iface: "Text", score: 66, readiness: "Approaching", date: "Jun 11, 2026", duration: "15:07" },
  { id: "s5", mode: "Quick", style: "Friendly", focus: "Ch.5 Results", iface: "Text", score: 71, readiness: "Ready", date: "Jun 10, 2026", duration: "5:12" },
  { id: "s6", mode: "Standard", style: "Hostile", focus: "Methodology", iface: "Voice", score: 55, readiness: "Needs Work", date: "Jun 8, 2026", duration: "14:45" },
];

function badge(readiness: string) {
  if (readiness === "Ready") return "bg-success-light text-success";
  if (readiness === "Approaching") return "bg-warning-light text-warning";
  return "bg-error-light text-error";
}

export default function SessionsPage() {
  const [modal, setModal] = useState<string | null>(null);

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

        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                {["Date", "Mode", "Style", "Focus", "Interface", "Duration", "Score", "Readiness", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="border-b border-border-light last:border-none hover:bg-surface transition">
                  <td className="px-4 py-3 text-xs text-text-secondary">{s.date}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">{s.mode}</span></td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{s.style}</td>
                  <td className="px-4 py-3 text-xs text-foreground font-medium">{s.focus}</td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{s.iface}</td>
                  <td className="px-4 py-3 text-xs text-text-secondary font-mono">{s.duration}</td>
                  <td className="px-4 py-3 text-sm font-bold text-brand">{s.score}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge(s.readiness)}`}>{s.readiness}</span></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/sessions/${s.id}/feedback`} className="text-[11px] text-brand font-semibold hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && <ComingSoonModal title="Filter Sessions" description="Filter sessions by mode, style, date range, and score. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
