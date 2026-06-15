"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const allQuestions = [
  { q: "What is the central contribution of your thesis?", cat: "Knowledge", diff: "Foundational", ch: "Full", starred: true },
  { q: "Why did you choose federated learning over centralized approaches?", cat: "Methodology", diff: "Intermediate", ch: "Ch.1", starred: true },
  { q: "How did you determine epsilon=1.0 for differential privacy?", cat: "Analysis", diff: "Advanced", ch: "Ch.4", starred: false },
  { q: "Your sample size was N=47. How did you determine this was sufficient?", cat: "Methodology", diff: "Advanced", ch: "Ch.4", starred: false },
  { q: "How does your work advance beyond McMahan et al. (2017)?", cat: "Literature", diff: "Intermediate", ch: "Ch.2", starred: true },
  { q: "Explain the threat model you considered for data poisoning attacks.", cat: "Analysis", diff: "Advanced", ch: "Ch.3", starred: false },
  { q: "What ethical considerations arise from using patient health records?", cat: "Ethics", diff: "Foundational", ch: "Ch.1", starred: false },
  { q: "How would you generalize your findings beyond the healthcare domain?", cat: "Knowledge", diff: "Advanced", ch: "Ch.6", starred: false },
  { q: "Describe your model aggregation strategy and why it outperforms FedAvg.", cat: "Methodology", diff: "Advanced", ch: "Ch.4", starred: true },
  { q: "What was the most surprising finding in your results?", cat: "Analysis", diff: "Intermediate", ch: "Ch.5", starred: false },
  { q: "How does communication efficiency scale with the number of clients?", cat: "Analysis", diff: "Advanced", ch: "Ch.5", starred: false },
  { q: "Discuss the limitations of your evaluation metrics.", cat: "Methodology", diff: "Intermediate", ch: "Ch.4", starred: false },
  { q: "How did you handle non-IID data distributions across hospitals?", cat: "Methodology", diff: "Advanced", ch: "Ch.4", starred: true },
  { q: "What is the practical impact of your work on healthcare systems?", cat: "Knowledge", diff: "Foundational", ch: "Full", starred: false },
  { q: "Compare your privacy guarantees with those in related work.", cat: "Literature", diff: "Advanced", ch: "Ch.2", starred: false },
];

const cats = ["All", "Knowledge", "Methodology", "Analysis", "Literature", "Ethics"];
const diffs = ["All", "Foundational", "Intermediate", "Advanced"];

export default function QuestionBankPage() {
  const [cat, setCat] = useState("All");
  const [diff, setDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<string | null>(null);

  const filtered = allQuestions.filter((q) => {
    if (cat !== "All" && q.cat !== cat) return false;
    if (diff !== "All" && q.diff !== diff) return false;
    if (search && !q.q.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <TopBar title="Question Bank" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Question Bank</h2>
            <p className="text-sm text-text-secondary">{allQuestions.length} questions generated from your thesis</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal("generate")} className="border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-text-secondary hover:border-brand/30 transition">Generate More</button>
            <button onClick={() => setModal("export")} className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-hover transition">Export PDF</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-brand">
            {cats.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
          </select>
          <select value={diff} onChange={(e) => setDiff(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-brand">
            {diffs.map((d) => <option key={d} value={d}>{d === "All" ? "All Difficulty" : d}</option>)}
          </select>
        </div>

        <p className="text-xs text-text-tertiary mb-3">{filtered.length} questions</p>

        <div className="space-y-2">
          {filtered.map((q, i) => (
            <div key={i} className="bg-white border border-border rounded-lg p-4 hover:border-brand/20 transition flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-foreground font-medium">{q.q}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">{q.cat}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${q.diff === "Advanced" ? "bg-error-light text-error" : q.diff === "Intermediate" ? "bg-warning-light text-warning" : "bg-success-light text-success"}`}>{q.diff}</span>
                  <span className="text-[10px] font-semibold bg-surface-2 text-text-tertiary px-2 py-0.5 rounded">{q.ch}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href="/sessions/new" className="text-[10px] text-brand font-semibold hover:underline">Practice</Link>
                <span className={`text-sm cursor-pointer ${q.starred ? "text-warning" : "text-border"}`}>{q.starred ? "★" : "☆"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal === "generate" && <ComingSoonModal title="Generate Questions" description="Use AI to generate more questions focused on specific chapters or difficulty levels. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "export" && <ComingSoonModal title="Export Question Bank" description="Download all questions as a printable PDF for offline review. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
