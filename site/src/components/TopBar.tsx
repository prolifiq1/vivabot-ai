"use client";

import { useState } from "react";
import Link from "next/link";
import ComingSoonModal from "./ComingSoonModal";

export default function TopBar({ title }: { title: string }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-border-light bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
        <h1 className="text-[15px] font-bold text-foreground">{title}</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-lg text-xs text-text-tertiary hover:border-brand/30 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search...
            <kbd className="ml-4 text-[10px] bg-white border border-border rounded px-1">&#8984;K</kbd>
          </button>
          <button
            onClick={() => setShowNotif(true)}
            className="relative p-2 rounded-lg hover:bg-surface transition"
          >
            <svg className="w-[18px] h-[18px] text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-warning-light text-warning text-[11px] font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            24 days to defense
          </div>
          <Link href="/settings/profile" className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold hover:bg-brand-hover transition">
            AO
          </Link>
        </div>
      </header>

      {showSearch && (
        <ComingSoonModal
          title="Global Search"
          description="Search across your projects, sessions, questions, and feedback — all in one place. Coming in V1."
          onClose={() => setShowSearch(false)}
        />
      )}
      {showNotif && (
        <ComingSoonModal
          title="Notifications Center"
          description="Get alerts for defense countdown milestones, session reminders, and supervisor feedback. Coming in V1."
          onClose={() => setShowNotif(false)}
        />
      )}
    </>
  );
}
