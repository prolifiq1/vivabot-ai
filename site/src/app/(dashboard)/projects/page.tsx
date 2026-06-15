"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

export default function ProjectsPage() {
  const { projects } = useProjects();
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

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">No projects yet</h3>
            <p className="text-xs text-text-secondary mb-4">Upload your thesis or research document to get started</p>
            <Link href="/projects/new" className="inline-block bg-brand text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-hover transition">
              Upload Your First Document
            </Link>
          </div>
        ) : (
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
                    <p className="text-xs text-text-secondary capitalize">{p.type} &middot; {p.level} &middot; {new Date(p.createdAt).toLocaleDateString()}</p>
                    <div className="flex gap-4 mt-3 text-xs text-text-tertiary">
                      <span>{p.sectionCount} sections</span>
                      <span>{p.pageCount} pages</span>
                      <span>{p.wordCount.toLocaleString()} words</span>
                      <span className="text-brand font-semibold">{p.questionCount} questions</span>
                      <span>{p.sessions.length} sessions</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

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
