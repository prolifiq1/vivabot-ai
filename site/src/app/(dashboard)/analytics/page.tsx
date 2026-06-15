"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const trendData = [64, 58, 62, 67, 66, 71, 69, 74, 72, 78, 74, 72];
const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const categories = [
  { name: "Knowledge", current: 78, prev: 72 },
  { name: "Analysis", current: 65, prev: 58 },
  { name: "Methodology", current: 72, prev: 67 },
  { name: "Communication", current: 82, prev: 78 },
  { name: "Literature", current: 68, prev: 60 },
  { name: "Pressure", current: 58, prev: 50 },
];

const weekActivity = [
  { day: "Mon", sessions: 2 },
  { day: "Tue", sessions: 0 },
  { day: "Wed", sessions: 1 },
  { day: "Thu", sessions: 3 },
  { day: "Fri", sessions: 1 },
  { day: "Sat", sessions: 0 },
  { day: "Sun", sessions: 1 },
];

export default function AnalyticsPage() {
  const [modal, setModal] = useState<string | null>(null);

  const maxScore = 100;
  const chartH = 160;
  const barW = 40;

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

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Sessions", value: "24", change: "+3 this week" },
            { label: "Avg Score", value: "72", change: "+8 vs last month" },
            { label: "Practice Time", value: "6h 14m", change: "1h 22m this week" },
            { label: "Questions Faced", value: "187", change: "32 this week" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border rounded-xl p-4">
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">{s.label}</p>
              <p className="text-2xl font-black text-foreground mt-1">{s.value}</p>
              <p className="text-[10px] text-success mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        {/* Score Trend */}
        <div className="bg-white border border-border rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-foreground mb-4">Score Trend (12 months)</p>
          <div className="flex items-end gap-2 h-[160px]">
            {trendData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-brand">{v}</span>
                <div className="w-full rounded-t" style={{ height: `${(v / maxScore) * chartH}px`, backgroundColor: i === trendData.length - 1 ? "#6B1D2A" : "#D4A574" }} />
                <span className="text-[9px] text-text-tertiary">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category Progress */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-foreground mb-3">Category Progress</p>
            <div className="space-y-3">
              {categories.map((c) => {
                const delta = c.current - c.prev;
                return (
                  <div key={c.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-text-secondary">{c.name}</span>
                      <span className="text-xs font-bold text-foreground">{c.current} <span className={`text-[10px] ${delta >= 0 ? "text-success" : "text-error"}`}>{delta >= 0 ? "+" : ""}{delta}</span></span>
                    </div>
                    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: `${c.current}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-foreground mb-3">This Week</p>
            <div className="flex items-end gap-3 h-[140px]">
              {weekActivity.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold text-text-secondary">{d.sessions}</span>
                  <div className="w-full rounded-t" style={{ height: `${Math.max(d.sessions * 40, 4)}px`, backgroundColor: d.sessions > 0 ? "#6B1D2A" : "#E5E7EB" }} />
                  <span className="text-[9px] text-text-tertiary">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border-light">
              <p className="text-[10px] text-text-tertiary">8 sessions this week &middot; Goal: 10/week</p>
              <div className="h-1.5 bg-surface-2 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-brand rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && <ComingSoonModal title="Export Analytics" description="Download a comprehensive analytics report as PDF. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
