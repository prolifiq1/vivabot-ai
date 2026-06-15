"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ComingSoonModal from "@/components/ComingSoonModal";

const initialMessages = [
  { role: "examiner", text: "Welcome to your viva voce examination. I'm Dr. Okonkwo, your primary examiner. I've read your thesis on Federated Learning for Privacy-Preserving Healthcare Analytics. Let's begin with a broad question." },
  { role: "examiner", text: "Can you summarize the central contribution of your thesis in two or three sentences?" },
];

const mockResponses = [
  "That's an interesting point. Now, why did you choose federated learning over a centralized machine learning approach for healthcare data?",
  "Your thesis mentions differential privacy with epsilon=1.0. How did you determine that this was the appropriate privacy budget?",
  "Let's discuss your sample size. N=47 hospitals seems relatively small for a federated system. How did you determine this was sufficient for generalizability?",
  "How does your work extend beyond the FedAvg algorithm proposed by McMahan et al. in 2017?",
  "What are the main limitations of your approach, and how would you address them in future work?",
  "Thank you. That concludes this session. You can review your feedback now.",
];

export default function ActiveSessionPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [responseIdx, setResponseIdx] = useState(0);
  const [modal, setModal] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "student", text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      if (responseIdx < mockResponses.length) {
        setMessages((m) => [...m, { role: "examiner", text: mockResponses[responseIdx] }]);
        setResponseIdx((i) => i + 1);
      }
      if (responseIdx >= mockResponses.length - 1) {
        setTimeout(() => router.push("/sessions/s1/feedback"), 1500);
      }
    }, 1800);
  };

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* Header */}
      <div className="h-14 border-b border-border bg-white flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/sessions" className="text-text-secondary hover:text-foreground transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <p className="text-sm font-bold text-foreground">Viva Session</p>
            <p className="text-[10px] text-text-tertiary">Standard &middot; Balanced &middot; Full thesis</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-text-secondary bg-surface-2 px-2.5 py-1 rounded">{fmt(elapsed)}</span>
          <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">Q{Math.min(responseIdx + 1, mockResponses.length)}/{mockResponses.length}</span>
          <button onClick={() => setModal("hint")} className="text-xs text-brand font-semibold hover:underline">Hint</button>
          <button onClick={() => router.push("/sessions/s1/feedback")} className="text-xs font-semibold text-error hover:underline">End Session</button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "student" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "student" ? "bg-brand text-white rounded-br-md" : "bg-white border border-border text-foreground rounded-bl-md"}`}>
              {m.role === "examiner" && <p className="text-[10px] font-semibold text-brand mb-1">Dr. Okonkwo</p>}
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-white p-4 shrink-0">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <button onClick={() => setModal("voice")} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text-tertiary hover:border-brand/30 hover:text-brand transition shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type your answer..."
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand"
          />
          <button onClick={send} disabled={!input.trim() || typing} className="px-5 py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-40 shrink-0">Send</button>
        </div>
      </div>

      {modal === "hint" && <ComingSoonModal title="AI Hint" description="Get a contextual hint from your AI coach without it counting as your answer. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "voice" && <ComingSoonModal title="Voice Input" description="Speak your answer using your microphone. Coming in V1." onClose={() => setModal(null)} />}
    </div>
  );
}
