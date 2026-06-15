"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("thesis");
  const [level, setLevel] = useState("phd");
  const [field, setField] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rubricFile, setRubricFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      router.push("/projects/p1");
    }, 2000);
  };

  return (
    <>
      <TopBar title="New Project" />
      <div className="p-6 max-w-2xl animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Create New Project</h2>
        <p className="text-sm text-text-secondary mb-6">Upload your thesis or research document to start practicing</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Project Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Federated Learning for Healthcare Analytics" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" required />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Project Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand bg-white">
                <option value="thesis">Thesis</option>
                <option value="dissertation">Dissertation</option>
                <option value="capstone">Capstone</option>
                <option value="paper">Research Paper</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Academic Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand bg-white">
                <option value="undergraduate">Undergraduate</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Field of Study</label>
              <input type="text" value={field} onChange={(e) => setField(e.target.value)} placeholder="e.g. Computer Science" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
            </div>
          </div>

          {/* Primary Document Upload */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Primary Document *</label>
            <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl hover:border-brand/40 transition cursor-pointer bg-surface">
              <input type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {file ? (
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{file.name}</p>
                  <p className="text-xs text-text-secondary mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                  <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-xs text-error mt-2 hover:underline">Remove</button>
                </div>
              ) : (
                <>
                  <svg className="w-8 h-8 text-text-tertiary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-text-secondary">Drop your PDF or DOCX here, or <span className="text-brand font-medium">browse</span></p>
                  <p className="text-[10px] text-text-tertiary mt-1">Max 200MB. Supported: PDF, DOCX</p>
                </>
              )}
            </label>
          </div>

          {/* Rubric Upload */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Marking Rubric <span className="text-text-tertiary font-normal">(Optional)</span></label>
            <label className="flex items-center justify-center py-4 border border-dashed border-border rounded-xl hover:border-brand/40 transition cursor-pointer bg-surface">
              <input type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => setRubricFile(e.target.files?.[0] || null)} />
              {rubricFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">{rubricFile.name}</span>
                  <button type="button" onClick={(e) => { e.preventDefault(); setRubricFile(null); }} className="text-xs text-error hover:underline">Remove</button>
                </div>
              ) : (
                <p className="text-xs text-text-secondary">Upload your rubric for rubric-aligned scoring</p>
              )}
            </label>
          </div>

          {/* Additional uploads */}
          <div className="flex gap-3">
            <button type="button" onClick={() => setModal("slides")} className="flex-1 py-3 border border-dashed border-border rounded-xl text-xs text-text-tertiary hover:border-brand/30 hover:text-brand transition">
              + Add Presentation Slides
            </button>
            <button type="button" onClick={() => setModal("notes")} className="flex-1 py-3 border border-dashed border-border rounded-xl text-xs text-text-tertiary hover:border-brand/30 hover:text-brand transition">
              + Add Supervisor Notes
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="flex-1 py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-50 flex items-center justify-center gap-2">
              {uploading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Processing document...</>
              ) : (
                "Create Project & Process"
              )}
            </button>
          </div>
        </form>
      </div>

      {modal === "slides" && <ComingSoonModal title="Presentation Slides" description="Upload your PPTX or PDF slides. The AI will use them to ask presentation-style questions. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "notes" && <ComingSoonModal title="Supervisor Notes" description="Upload supervisor feedback documents so the AI can focus on areas your supervisor flagged. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
