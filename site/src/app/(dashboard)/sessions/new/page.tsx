"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const modes = [
  { id: "quick", name: "Quick Practice", time: "5 min", desc: "3-4 questions, single examiner", icon: "⚡" },
  { id: "standard", name: "Standard Practice", time: "15 min", desc: "8-12 questions, multi-agent", icon: "📋" },
  { id: "full", name: "Full Defense", time: "45 min", desc: "20-30 questions, full panel", icon: "🎓" },
  { id: "panel", name: "Panel Defense", time: "45 min", desc: "3 AI examiners, interruptions", icon: "👥" },
];

const styles = [
  { id: "friendly", name: "Friendly", desc: "Coaching, supportive", color: "border-success text-success bg-success-light" },
  { id: "balanced", name: "Balanced", desc: "Fair, thorough", color: "border-brand text-brand bg-brand-light" },
  { id: "hostile", name: "Hostile", desc: "Adversarial, tough", color: "border-error text-error bg-error-light" },
];

const interfaces = [
  { id: "text", name: "Text", desc: "Chat-based Q&A", available: true },
  { id: "voice", name: "Voice", desc: "Spoken conversation", available: true },
  { id: "video", name: "Video", desc: "Webcam + AI avatar", available: false },
];

export default function NewSessionPage() {
  const router = useRouter();
  const [mode, setMode] = useState("standard");
  const [style, setStyle] = useState("balanced");
  const [iface, setIface] = useState("text");
  const [focus, setFocus] = useState("full");
  const [starting, setStarting] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const handleStart = () => {
    if (!interfaces.find((i) => i.id === iface)?.available) {
      setModal("video");
      return;
    }
    setStarting(true);
    setTimeout(() => router.push("/sessions/s1"), 1500);
  };

  return (
    <>
      <TopBar title="New Session" />
      <div className="p-6 max-w-3xl animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Configure Your Viva Session</h2>
        <p className="text-sm text-text-secondary mb-6">Choose how you want to practice</p>

        {/* Mode */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-foreground mb-2">Session Mode</label>
          <div className="grid grid-cols-4 gap-3">
            {modes.map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`p-4 rounded-xl border-2 text-left transition ${mode === m.id ? "border-brand bg-brand-light" : "border-border bg-white hover:border-brand/30"}`}>
                <div className="text-xl mb-2">{m.icon}</div>
                <p className="text-xs font-bold text-foreground">{m.name}</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">{m.time}</p>
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
        <div className="mb-6">
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

        {/* Focus */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-foreground mb-2">Focus Area</label>
          <select value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand bg-white">
            <option value="full">Full Thesis</option>
            <option value="ch1">Chapter 1: Introduction</option>
            <option value="ch2">Chapter 2: Literature Review</option>
            <option value="ch3">Chapter 3: Theoretical Framework</option>
            <option value="ch4">Chapter 4: Methodology</option>
            <option value="ch5">Chapter 5: Results</option>
            <option value="ch6">Chapter 6: Discussion</option>
            <option value="ch7">Chapter 7: Conclusion</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="px-6 py-3 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition">Cancel</button>
          <button onClick={handleStart} disabled={starting} className="flex-1 py-3 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-50 flex items-center justify-center gap-2">
            {starting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Preparing examiner...</> : "Start Viva Session"}
          </button>
        </div>
      </div>
      {modal === "video" && <ComingSoonModal title="Video Viva" description="Video mode with AI avatar is coming in V2. Please select Text or Voice for now." onClose={() => setModal(null)} />}
    </>
  );
}
