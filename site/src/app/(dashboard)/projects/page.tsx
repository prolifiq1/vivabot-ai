"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const projects = [
  { id: "p1", title: "Federated Learning for Privacy-Preserving Healthcare Analytics", type: "PhD Thesis", status: "Ready", chapters: 8, pages: 247, sessions: 12, score: 72, date: "May 28, 2026" },
  { id: "p2", title: "Differential Privacy in Distributed Systems — Literature Review", type: "Paper", status: "Processing", chapters: 0, pages: 32, sessions: 0, score: 0, date: "Jun 10, 2026" },
];

export default function ProjectsPage() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <>
      <TopBar title="Projects" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Your Projects</h2>
            <p className="text-sm text-text-secondary">Upload and manage your thesis, papers, and presentations</p>
          </div>
          <Link href="/projects/new" className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">
            New Project
          </Link>
        </div>

        <div className="space-y-3">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="block bg-white border border-border rounded-xl p-5 hover:border-brand/30 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status === "Ready" ? "bg-success-light text-success" : "bg-warning-light text-warning"}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{p.type} &middot; Uploaded {p.date}</p>
                  <div className="flex gap-4 mt-3 text-xs text-text-tertiary">
                    {p.chapters > 0 && <span>{p.chapters} chapters</span>}
                    <span>{p.pages} pages</span>
                    <span>{p.sessions} sessions</span>
                    {p.score > 0 && <span className="text-brand font-semibold">Score: {p.score}</span>}
                  </div>
                </div>
                <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => setModal("import")}
          className="mt-4 w-full py-4 border-2 border-dashed border-border rounded-xl text-sm text-text-tertiary hover:border-brand/30 hover:text-brand transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Import from Google Drive or Dropbox
        </button>
      </div>

      {modal && <ComingSoonModal title="Cloud Import" description="Import documents directly from Google Drive, Dropbox, or OneDrive. Coming in V2." onClose={() => setModal(null)} />}
    </>
  );
}
