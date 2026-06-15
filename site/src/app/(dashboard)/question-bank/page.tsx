"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

export default function QuestionBankPage() {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0].id : "");
  const [cat, setCat] = useState("All");
  const [diff, setDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<string | null>(null);

  const project = projects.find((p) => p.id === selectedProject);
  const allQuestions = project?.questions || [];

  const categories = ["All", ...Array.from(new Set(allQuestions.map((q) => q.category)))];
  const diffs = ["All", "Foundational", "Intermediate", "Advanced"];

  const filtered = allQuestions.filter((q) => {
    if (cat !== "All" && q.category !== cat) return false;
    if (diff !== "All" && q.difficulty !== diff) return false;
    if (search && !q.question.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <TopBar title="Question Bank" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Question Bank</h2>
            <p className="text-sm text-text-secondary">
              {allQuestions.length > 0
                ? `${allQuestions.length} questions generated from your document`
                : "Upload a document to generate questions"}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal("generate")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Generate More</button>
            <button onClick={() => setModal("export")} className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">Export PDF</button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-sm font-bold text-foreground mb-1">No questions yet</h3>
            <p className="text-xs text-text-secondary mb-4">Upload a thesis or research document to generate questions</p>
            <Link href="/projects/new" className="inline-block bg-brand text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-hover transition">Upload Document</Link>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex gap-3 mb-4">
              {projects.length > 1 && (
                <select value={selectedProject} onChange={(e) => { setSelectedProject(e.target.value); setCat("All"); }} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-brand">
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.title.slice(0, 40)}</option>)}
                </select>
              )}
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-brand">
                {categories.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
              </select>
              <select value={diff} onChange={(e) => setDiff(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-brand">
                {diffs.map((d) => <option key={d} value={d}>{d === "All" ? "All Difficulty" : d}</option>)}
              </select>
            </div>

            <p className="text-xs text-text-tertiary mb-3">{filtered.length} questions</p>

            <div className="space-y-2">
              {filtered.slice(0, 50).map((q, i) => (
                <div key={i} className="bg-white border border-border rounded-lg p-4 hover:border-brand/20 transition flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">{q.question}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">{q.category}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${q.difficulty === "Advanced" ? "bg-error-light text-error" : q.difficulty === "Intermediate" ? "bg-warning-light text-warning" : "bg-success-light text-success"}`}>{q.difficulty}</span>
                      <span className="text-[10px] font-semibold bg-surface-2 text-text-tertiary px-2 py-0.5 rounded">{q.section}</span>
                    </div>
                  </div>
                  <Link href={`/sessions/new?project=${selectedProject}`} className="text-[10px] text-brand font-semibold hover:underline shrink-0">Practice</Link>
                </div>
              ))}
              {filtered.length > 50 && (
                <p className="text-xs text-text-tertiary text-center py-3">Showing 50 of {filtered.length} questions</p>
              )}
            </div>
          </>
        )}
      </div>

      {modal === "generate" && <ComingSoonModal title="Generate Questions" description="Use AI to generate more questions focused on specific chapters or difficulty levels. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "export" && <ComingSoonModal title="Export Question Bank" description="Download all questions as a printable PDF for offline review. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
