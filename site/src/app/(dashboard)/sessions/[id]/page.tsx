"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useProjects } from "@/context/ProjectContext";
import { getVivaQuestions, GeneratedQuestion } from "@/lib/question-generator";

interface Message {
  role: "examiner" | "student" | "system";
  text: string;
}

function getExaminerName(style: string) {
  if (style === "hostile") return "Prof. Blackwell";
  if (style === "friendly") return "Dr. Mensah";
  return "Dr. Okonkwo";
}

function generateFollowUp(question: GeneratedQuestion, style: string): string {
  const followUps: Record<string, string[]> = {
    friendly: [
      "That's a good start. Could you elaborate a bit more on the specifics?",
      "Interesting. Can you connect that back to your theoretical framework?",
      "I see your reasoning. How does that compare to what you expected?",
      "Nice answer. What evidence from your data directly supports that claim?",
    ],
    balanced: [
      "Can you be more specific about the evidence supporting that claim?",
      "How would you respond to someone who disagrees with that interpretation?",
      "That's one perspective. What about alternative explanations?",
      "Let's dig deeper. What were the exact numbers behind that conclusion?",
    ],
    hostile: [
      "That's rather vague. I need you to be much more precise.",
      "I'm not convinced. What makes you so sure about that?",
      "A reviewer would challenge that. Defend your position more rigorously.",
      "That contradicts what you wrote on page... Can you explain this inconsistency?",
    ],
  };
  const pool = followUps[style] || followUps.balanced;
  return pool[Math.floor(Math.random() * pool.length)];
}

function scoreAnswer(answer: string, question: GeneratedQuestion): number {
  let score = 50;
  const words = answer.split(/\s+/).length;
  if (words > 20) score += 10;
  if (words > 50) score += 10;
  if (words > 100) score += 5;
  if (answer.match(/because|therefore|however|although|specifically|furthermore/i)) score += 8;
  if (answer.match(/\d+%|\d+\.\d+|statistic|significant|p-value/i)) score += 7;
  if (answer.match(/method|approach|framework|theory|hypothesis|model/i)) score += 5;
  if (answer.match(/limitation|challenge|future|recommend/i)) score += 5;
  const contextTerms = question.context.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
  const answerLower = answer.toLowerCase();
  const matchedTerms = contextTerms.filter((t) => answerLower.includes(t)).length;
  score += Math.min(matchedTerms * 3, 15);
  return Math.min(Math.max(score, 30), 95);
}

function ActiveSessionInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getProject, addSession } = useProjects();

  const projectId = searchParams.get("project") || "";
  const mode = searchParams.get("mode") || "standard";
  const style = searchParams.get("style") || "balanced";
  const count = parseInt(searchParams.get("count") || "8", 10);

  const project = getProject(projectId);
  const examinerName = getExaminerName(style);

  const [vivaQuestions, setVivaQuestions] = useState<GeneratedQuestion[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answersGiven, setAnswersGiven] = useState<{ question: string; answer: string; score: number }[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!project || initialized.current) return;
    initialized.current = true;
    const questions = getVivaQuestions(project.questions, count);
    setVivaQuestions(questions);

    const greeting = style === "hostile"
      ? `I'm ${examinerName}. I've thoroughly reviewed your ${project.type} titled "${project.title}". I have serious questions. Let's begin.`
      : style === "friendly"
        ? `Welcome! I'm ${examinerName}, and I'll be guiding you through your viva today. I've carefully read your ${project.type} on "${project.title}" and I'm impressed with the scope. Let's work through some questions together.`
        : `Welcome to your viva voce examination. I'm ${examinerName}, your primary examiner. I've read your ${project.type} titled "${project.title}". Let's begin.`;

    setMessages([
      { role: "examiner", text: greeting },
      { role: "examiner", text: questions[0]?.question || "Tell me about the central contribution of your research." },
    ]);
  }, [project, count, style, examinerName]);

  useEffect(() => {
    if (sessionEnded) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [sessionEnded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const endSession = useCallback(() => {
    if (sessionEnded || !project) return;
    setSessionEnded(true);

    const categoryScores: Record<string, number[]> = {};
    for (const a of answersGiven) {
      const q = vivaQuestions.find((vq) => vq.question === a.question);
      const cat = q?.category || "Knowledge";
      if (!categoryScores[cat]) categoryScores[cat] = [];
      categoryScores[cat].push(a.score);
    }

    const avgScores: Record<string, number> = {};
    for (const [cat, scores] of Object.entries(categoryScores)) {
      avgScores[cat] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }

    const overall = answersGiven.length > 0
      ? Math.round(answersGiven.reduce((a, b) => a + b.score, 0) / answersGiven.length)
      : 0;

    const sorted = [...answersGiven].sort((a, b) => a.score - b.score);
    const strengths = sorted.slice(-3).reverse().map((a) => `Strong answer on: "${a.question.slice(0, 80)}…"`);
    const improvements = sorted.slice(0, 3).map((a) => `Needs improvement: "${a.question.slice(0, 80)}…"`);

    const sessionRecord = {
      id: "s_" + Date.now().toString(36),
      projectId: project.id,
      mode,
      style,
      focus: "Full thesis",
      date: new Date().toISOString(),
      duration: elapsed,
      questionsAsked: answersGiven,
      overallScore: overall,
      categoryScores: avgScores,
      strengths,
      improvements,
    };

    addSession(sessionRecord);

    setTimeout(() => {
      router.push(`/sessions/${sessionRecord.id}/feedback?project=${project.id}`);
    }, 2000);
  }, [sessionEnded, project, answersGiven, vivaQuestions, elapsed, mode, style, addSession, router]);

  const send = () => {
    if (!input.trim() || typing || sessionEnded) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "student", text: userMsg }]);

    const currentQ = vivaQuestions[questionIdx];
    if (currentQ) {
      const score = scoreAnswer(userMsg, currentQ);
      setAnswersGiven((prev) => [...prev, { question: currentQ.question, answer: userMsg, score }]);
    }

    setTyping(true);

    const delay = 1200 + Math.random() * 1200;
    setTimeout(() => {
      setTyping(false);
      const nextIdx = questionIdx + 1;

      if (nextIdx >= vivaQuestions.length) {
        const closingMsg = style === "hostile"
          ? "We've covered the main areas. I have my assessment. This examination is concluded."
          : style === "friendly"
            ? "That was excellent work! We've covered all the key areas. Let me prepare your feedback."
            : "Thank you. That concludes our examination. I'll prepare your detailed feedback now.";
        setMessages((m) => [...m, { role: "examiner", text: closingMsg }]);
        setQuestionIdx(nextIdx);
        endSession();
      } else {
        const shouldFollowUp = Math.random() < 0.3 && userMsg.split(/\s+/).length < 30;
        if (shouldFollowUp && currentQ) {
          const followUp = generateFollowUp(currentQ, style);
          setMessages((m) => [...m, { role: "examiner", text: followUp }]);
        } else {
          const transition = [
            "Good. Let's move on.",
            "Noted. Next question.",
            "I see. Let me ask you about something else.",
            "Right. Moving forward.",
            "Thank you. Let's continue.",
          ];
          const t = transition[Math.floor(Math.random() * transition.length)];
          const nextQ = vivaQuestions[nextIdx].question;
          setMessages((m) => [...m, { role: "examiner", text: `${t}\n\n${nextQ}` }]);
          setQuestionIdx(nextIdx);
        }
      }
    }, delay);
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">No project selected</h2>
          <p className="text-sm text-text-secondary mb-4">Please start a session from a project page.</p>
          <Link href="/projects" className="text-sm text-brand font-semibold hover:underline">Go to Projects</Link>
        </div>
      </div>
    );
  }

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
            <p className="text-[10px] text-text-tertiary capitalize">{mode} &middot; {style} &middot; {project.title.slice(0, 40)}…</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-text-secondary bg-surface-2 px-2.5 py-1 rounded">{fmt(elapsed)}</span>
          <span className="text-[10px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded">Q{Math.min(questionIdx + 1, vivaQuestions.length)}/{vivaQuestions.length}</span>
          <button onClick={() => setModal("hint")} className="text-xs text-brand font-semibold hover:underline">Hint</button>
          <button onClick={endSession} className="text-xs font-semibold text-error hover:underline">End Session</button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "student" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.role === "student" ? "bg-brand text-white rounded-br-md" : "bg-white border border-border text-foreground rounded-bl-md"}`}>
              {m.role === "examiner" && <p className="text-[10px] font-semibold text-brand mb-1">{examinerName}</p>}
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
        {sessionEnded && (
          <div className="text-center py-4">
            <p className="text-xs text-text-secondary">Session ended. Redirecting to feedback...</p>
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
            placeholder={sessionEnded ? "Session ended" : "Type your answer..."}
            disabled={sessionEnded}
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand disabled:opacity-50"
          />
          <button onClick={send} disabled={!input.trim() || typing || sessionEnded} className="px-5 py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-40 shrink-0">Send</button>
        </div>
      </div>

      {modal === "hint" && <ComingSoonModal title="AI Hint" description="Get a contextual hint from your AI coach without it counting as your answer. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "voice" && <ComingSoonModal title="Voice Input" description="Voice input with speech-to-text is coming soon. Please type your answer for now." onClose={() => setModal(null)} />}
    </div>
  );
}

export default function ActiveSessionPage() {
  return <Suspense fallback={<div className="flex items-center justify-center h-screen text-sm text-text-secondary">Loading session...</div>}><ActiveSessionInner /></Suspense>;
}
