"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";

const modes = [
  { id: "quick", name: "Quick Practice", time: "5 min", desc: "3-4 questions, single examiner", icon: "⚡", count: 4 },
  { id: "standard", name: "Standard Practice", time: "15 min", desc: "8-12 questions, multi-agent", icon: "📋", count: 10 },
  { id: "full", name: "Full Defense", time: "45 min", desc: "20-30 questions, full panel", icon: "🎓", count: 25 },
  { id: "panel", name: "Panel Defense", time: "45 min", desc: "3 AI examiners, interruptions", icon: "👥", count: 20 },
];

const styles = [
  { id: "friendly", name: "Friendly", desc: "Coaching, supportive", color: "border-success text-success bg-success-light" },
  { id: "balanced", name: "Balanced", desc: "Fair, thorough", color: "border-brand text-brand bg-brand-light" },
  { id: "hostile", name: "Hostile", desc: "Adversarial, tough", color: "border-error text-error bg-error-light" },
];

const interfaces = [
  { id: "text", name: "Text", desc: "Chat-based Q&A", available: true },
  { id: "voice", name: "Voice", desc: "Spoken conversation", available: false },
  { id: "video", name: "Video", desc: "Webcam + AI avatar", available: false },
];

function NewSessionInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projects } = useProjects();

  const preselectedProject = searchParams.get("project") || "";
  const [selectedProject, setSelectedProject] = useState(preselectedProject || (projects.length > 0 ? projects[0].id : ""));
  const [mode, setMode] = useState("standard");
  const [style, setStyle] = useState("balanced");
  const [iface, setIface] = useState("text");
  const [starting, setStarting] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const currentMode = modes.find((m) => m.id === mode)!;

  const handleStart = () => {
    if (!selectedProject) {
      setModal("noproject");
      return;
    }
    if (!interfaces.find((i) => i.id === iface)?.available) {
      setModal("voice");
      return;
    }
    setStarting(true);
    const sessionId = "s_" + Date.now().toString(36);
    setTimeout(() => {
      router.push(`/sessions/${sessionId}?project=${selectedProject}&mode=${mode}&style=${style}&count=${currentMode.count}`);
    }, 1000);
  };

  return (
    <>
      <TopBar title="New Session" />
      <div className="p-6 max-w-3xl animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Configure Your Viva Session</h2>
        <p className="text-sm text-text-secondary mb-6">Choose how you want to practice</p>

        {/* Project Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-foreground mb-2">Select Project</label>
          {projects.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
              <p className="text-sm text-text-secondary mb-2">No projects yet. Upload a document first.</p>
              <button onClick={() => router.push("/projects/new")} className="text-sm text-brand font-semibold hover:underline">Create Project →</button>
            </div>
          ) : (
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand bg-white">
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title} ({p.questionCount} questions)</option>
              ))}
            </select>
          )}
        </div>

        {/* Mode */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-foreground mb-2">Session Mode</label>
          <div className="grid grid-cols-4 gap-3">
            {modes.map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`p-4 rounded-xl border-2 text-left transition ${mode === m.id ? "border-brand bg-brand-light" : "border-border bg-white hover:border-brand/30"}`}>
                <div className="text-xl mb-2">{m.icon}</div>
                <p className="text-xs font-bold text-foreground">{m.name}</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">{m.time} &middot; {m.count} Q</p>
                <p className="text-[10px] text-text-secondary mt-1">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-foreground mb-2">Examiner Style</label>
          <div className="grid grid-cols-3 gap-3">
            {styles.map((s) => (
              <button key={s.id} onClick={() => setStyle(s.id)} className={`p-4 rounded-xl border-2 text-center transition ${style === s.id ? s.color + " border-current" : "border-border bg-white hover:border-brand/30"}`}>
                <p className="text-sm font-bold">{s.name}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Interface */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-foreground mb-2">Interface</label>
          <div className="grid grid-cols-3 gap-3">
            {interfaces.map((i) => (
              <button key={i.id} onClick={() => setIface(i.id)} className={`p-4 rounded-xl border-2 text-center transition relative ${iface === i.id ? "border-brand bg-brand-light" : "border-border bg-white hover:border-brand/30"} ${!i.available ? "opacity-60" : ""}`}>
                <p className="text-sm font-bold text-foreground">{i.name}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{i.desc}</p>
                {!i.available && <span className="absolute top-2 right-2 text-[8px] font-bold bg-warning-light text-warning px-1.5 py-0.5 rounded">SOON</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="px-6 py-3 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition">Cancel</button>
          <button onClick={handleStart} disabled={starting || projects.length === 0} className="flex-1 py-3 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-50 flex items-center justify-center gap-2">
            {starting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Preparing examiner...</> : "Start Viva Session"}
          </button>
        </div>
      </div>
      {modal === "voice" && <ComingSoonModal title="Voice & Video" description="Voice and video modes with AI-powered speech recognition and avatar are coming soon. Please select Text for now." onClose={() => setModal(null)} />}
      {modal === "noproject" && <ComingSoonModal title="No Project Selected" description="Please create a project by uploading your thesis first." onClose={() => setModal(null)} />}
    </>
  );
}

export default function NewSessionPage() {
  return <Suspense fallback={<div className="p-6 text-center text-sm text-text-secondary">Loading...</div>}><NewSessionInner /></Suspense>;
}
