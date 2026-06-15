"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjects();
  const project = getProject(id);
  const [tab, setTab] = useState<"structure" | "questions" | "documents">("structure");
  const [modal, setModal] = useState<string | null>(null);
  const [qFilter, setQFilter] = useState("All");

  if (!project) {
    return (
      <>
        <TopBar title="Project" />
        <div className="p-6 text-center py-20">
          <h2 className="text-lg font-bold text-foreground mb-2">Project not found</h2>
          <p className="text-sm text-text-secondary mb-4">This project may have been deleted or the link is incorrect.</p>
          <Link href="/projects" className="text-sm text-brand font-semibold hover:underline">Back to Projects</Link>
        </div>
      </>
    );
  }

  const filteredQuestions = qFilter === "All"
    ? project.questions
    : project.questions.filter((q) => q.category === qFilter);

  const categories = ["All", ...Array.from(new Set(project.questions.map((q) => q.category)))];

  return (
    <>
      <TopBar title="Project Detail" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">{project.title}</h2>
            <p className="text-sm text-text-secondary capitalize">
              {project.type} &middot; {project.pageCount} pages &middot; {project.sectionCount} sections &middot; {project.questionCount} questions generated
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-semibold bg-success-light text-success px-2 py-0.5 rounded-full">{project.status}</span>
              <span className="text-[10px] text-text-tertiary">{project.wordCount.toLocaleString()} words &middot; Processed {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/sessions/new?project=${project.id}`} className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">
              Start Session
            </Link>
            <button onClick={() => setModal("export")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">
              Export Questions
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-2 p-1 rounded-lg w-fit mb-6">
          {(["structure", "questions", "documents"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-xs font-semibold transition capitalize ${tab === t ? "bg-white text-brand shadow-sm" : "text-text-secondary hover:text-foreground"}`}>
              {t} {t === "questions" && `(${project.questionCount})`}
            </button>
          ))}
        </div>

        {tab === "structure" && (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Section</th>
                  <th className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Pages</th>
                  <th className="text-left text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Questions</th>
                  <th className="text-right text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {project.sections.map((sec, i) => (
                  <tr key={i} className="border-b border-border-light last:border-none hover:bg-surface transition">
                    <td className="px-5 py-3 text-sm font-medium text-foreground">{i + 1}. {sec.title}</td>
                    <td className="px-5 py-3 text-xs text-text-secondary">{sec.pageStart}–{sec.pageEnd}</td>
                    <td className="px-5 py-3 text-xs text-text-secondary">{sec.questionCount}</td>
                    <td className="px-5 py-3 text-right">
                      {sec.questionCount > 0 && (
                        <Link href={`/sessions/new?project=${project.id}`} className="text-[11px] text-brand font-semibold hover:underline">Practice</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "questions" && (
          <div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {categories.map((c) => (
                <button key={c} onClick={() => setQFilter(c)} className={`text-[10px] font-semibold px-3 py-1.5 rounded-full transition ${qFilter === c ? "bg-brand text-white" : "bg-surface-2 text-text-secondary hover:bg-surface"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredQuestions.slice(0, 30).map((q, i) => (
                <div key={i} className="bg-white border border-border rounded-lg p-4 hover:border-brand/20 transition">
                  <p className="text-sm text-foreground font-medium">{q.question}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">{q.category}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${q.difficulty === "Advanced" ? "bg-error-light text-error" : q.difficulty === "Intermediate" ? "bg-warning-light text-warning" : "bg-success-light text-success"}`}>{q.difficulty}</span>
                    <span className="text-[10px] font-semibold bg-surface-2 text-text-tertiary px-2 py-0.5 rounded">{q.section}</span>
                  </div>
                </div>
              ))}
              {filteredQuestions.length > 30 && (
                <p className="text-xs text-text-tertiary text-center py-3">Showing 30 of {filteredQuestions.length}. <Link href="/question-bank" className="text-brand hover:underline">View all in Question Bank</Link></p>
              )}
            </div>
          </div>
        )}

        {tab === "documents" && (
          <div className="space-y-2">
            <div className="bg-white border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-error-light rounded-lg flex items-center justify-center text-error text-xs font-bold">
                  {project.fileName.split(".").pop()?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{project.fileName}</p>
                  <p className="text-[10px] text-text-tertiary">{project.pageCount} pages &middot; Uploaded {new Date(project.createdAt).toLocaleDateString()}</p>
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
      {modal === "download" && <ComingSoonModal title="Download Document" description="Secure document download. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "addDoc" && <ComingSoonModal title="Add Document" description="Upload supplementary documents like rubrics, slides, or supervisor feedback. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
