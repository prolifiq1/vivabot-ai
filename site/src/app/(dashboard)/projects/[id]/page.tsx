"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const chapters = [
  { name: "Introduction", pages: "1-18", questions: 6 },
  { name: "Literature Review", pages: "19-52", questions: 12 },
  { name: "Theoretical Framework", pages: "53-71", questions: 8 },
  { name: "Methodology", pages: "72-105", questions: 15 },
  { name: "Results", pages: "106-148", questions: 10 },
  { name: "Discussion", pages: "149-192", questions: 11 },
  { name: "Conclusion", pages: "193-210", questions: 5 },
  { name: "References & Appendices", pages: "211-247", questions: 0 },
];

const questions = [
  { q: "What is the central contribution of your thesis?", cat: "Knowledge", diff: "Foundational" },
  { q: "Why did you choose federated learning over centralized approaches?", cat: "Methodology", diff: "Intermediate" },
  { q: "How did you determine epsilon=1.0 for differential privacy?", cat: "Analysis", diff: "Advanced" },
  { q: "Your sample size was N=47. How did you determine this was sufficient?", cat: "Methodology", diff: "Advanced" },
  { q: "How does your work advance beyond McMahan et al. (2017)?", cat: "Literature", diff: "Intermediate" },
];

export default function ProjectDetailPage() {
  const [tab, setTab] = useState<"structure" | "questions" | "documents">("structure");
  const [modal, setModal] = useState<string | null>(null);

  return (
    <>
      <TopBar title="Project Detail" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Federated Learning for Privacy-Preserving Healthcare Analytics</h2>
            <p className="text-sm text-text-secondary">PhD Thesis &middot; 247 pages &middot; 8 chapters &middot; 67 questions generated</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-semibold bg-success-light text-success px-2 py-0.5 rounded-full">Ready</span>
              <span className="text-[10px] text-text-tertiary">Processed on May 28, 2026</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/sessions/new" className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">
              Start Session
            </Link>
            <button onClick={() => setModal("export")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">
              Export Questions
            </button>
            <button onClick={() => setModal("reprocess")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">
              Re-upload
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-2 p-1 rounded-lg w-fit mb-6">
          {(["structure", "questions", "documents"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-xs font-semibold transition capitalize ${tab === t ? "bg-white text-brand shadow-sm" : "text-text-secondary hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "structure" && (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Chapter</th>
                  <th className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Pages</th>
                  <th className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Questions</th>
                  <th className="text-right text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((ch, i) => (
                  <tr key={ch.name} className="border-b border-border-light last:border-none hover:bg-surface transition">
                    <td className="px-5 py-3 text-sm font-medium text-foreground">{i + 1}. {ch.name}</td>
                    <td className="px-5 py-3 text-xs text-text-secondary">{ch.pages}</td>
                    <td className="px-5 py-3 text-xs text-text-secondary">{ch.questions}</td>
                    <td className="px-5 py-3 text-right">
                      {ch.questions > 0 && (
                        <Link href="/sessions/new" className="text-[11px] text-brand font-semibold hover:underline">Practice</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "questions" && (
          <div className="space-y-2">
            {questions.map((q, i) => (
              <div key={i} className="bg-white border border-border rounded-lg p-4 hover:border-brand/20 transition">
                <p className="text-sm text-foreground font-medium">{q.q}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">{q.cat}</span>
                  <span className="text-[10px] font-semibold bg-surface-2 text-text-secondary px-2 py-0.5 rounded">{q.diff}</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-text-tertiary text-center py-4">Showing 5 of 67 questions. <Link href="/question-bank" className="text-brand hover:underline">View all in Question Bank</Link></p>
          </div>
        )}

        {tab === "documents" && (
          <div className="space-y-2">
            <div className="bg-white border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-error-light rounded-lg flex items-center justify-center text-error text-xs font-bold">PDF</div>
                <div>
                  <p className="text-sm font-medium text-foreground">thesis_final_v3.pdf</p>
                  <p className="text-[10px] text-text-tertiary">2.4 MB &middot; Uploaded May 28</p>
                </div>
              </div>
              <button onClick={() => setModal("download")} className="text-xs text-brand font-semibold hover:underline">Download</button>
            </div>
            <button onClick={() => setModal("addDoc")} className="w-full py-4 border-2 border-dashed border-border rounded-xl text-xs text-text-tertiary hover:border-brand/30 hover:text-brand transition">
              + Upload additional document
            </button>
          </div>
        )}
      </div>

      {modal === "export" && <ComingSoonModal title="Export Question Bank" description="Export all generated questions as a PDF document for offline review. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "reprocess" && <ComingSoonModal title="Re-upload Document" description="Upload a new version of your thesis. We'll re-process and regenerate questions. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "download" && <ComingSoonModal title="Download Document" description="Secure document download with pre-signed URLs. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "addDoc" && <ComingSoonModal title="Add Document" description="Upload supplementary documents like rubrics, slides, or supervisor feedback. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
