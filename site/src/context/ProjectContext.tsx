"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ProcessedDocument } from "@/lib/document-processor";
import { GeneratedQuestion } from "@/lib/question-generator";

export interface Project {
  id: string;
  title: string;
  type: string;
  level: string;
  field: string;
  fileName: string;
  pageCount: number;
  wordCount: number;
  sectionCount: number;
  questionCount: number;
  sections: { title: string; pageStart: number; pageEnd: number; questionCount: number }[];
  questions: GeneratedQuestion[];
  fullText: string;
  createdAt: string;
  status: "Ready" | "Processing";
  sessions: SessionRecord[];
}

export interface SessionRecord {
  id: string;
  projectId: string;
  mode: string;
  style: string;
  focus: string;
  date: string;
  duration: number;
  questionsAsked: { question: string; answer: string; score: number }[];
  overallScore: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  improvements: string[];
}

interface ProjectContextType {
  projects: Project[];
  addProject: (doc: ProcessedDocument, questions: GeneratedQuestion[], meta: { type: string; level: string; field: string }) => string;
  getProject: (id: string) => Project | undefined;
  addSession: (session: SessionRecord) => void;
  getSession: (id: string) => SessionRecord | undefined;
  getAllSessions: () => SessionRecord[];
}

const ProjectContext = createContext<ProjectContextType | null>(null);

const STORAGE_KEY = "vivabot_projects";

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProjects(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      } catch {}
    }
  }, [projects, loaded]);

  const addProject = useCallback((doc: ProcessedDocument, questions: GeneratedQuestion[], meta: { type: string; level: string; field: string }) => {
    const id = "p_" + Date.now().toString(36);
    const project: Project = {
      id,
      title: doc.title,
      type: meta.type,
      level: meta.level,
      field: meta.field,
      fileName: doc.fileName,
      pageCount: doc.pageCount,
      wordCount: doc.wordCount,
      sectionCount: doc.sections.length,
      questionCount: questions.length,
      sections: doc.sections.map((s) => ({
        title: s.title,
        pageStart: s.pageStart,
        pageEnd: s.pageEnd,
        questionCount: questions.filter((q) => q.section === s.title).length,
      })),
      questions,
      fullText: doc.fullText.slice(0, 500000),
      createdAt: new Date().toISOString(),
      status: "Ready",
      sessions: [],
    };
    setProjects((prev) => [project, ...prev]);
    return id;
  }, []);

  const getProject = useCallback((id: string) => {
    return projects.find((p) => p.id === id);
  }, [projects]);

  const addSession = useCallback((session: SessionRecord) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === session.projectId ? { ...p, sessions: [session, ...p.sessions] } : p
      )
    );
  }, []);

  const getSession = useCallback((id: string) => {
    for (const p of projects) {
      const s = p.sessions.find((s) => s.id === id);
      if (s) return s;
    }
    return undefined;
  }, [projects]);

  const getAllSessions = useCallback(() => {
    return projects.flatMap((p) => p.sessions).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects]);

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProject, addSession, getSession, getAllSessions }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}
