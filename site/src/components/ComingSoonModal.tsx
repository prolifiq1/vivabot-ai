"use client";

import { useEffect } from "react";

export default function ComingSoonModal({
  title,
  description,
  onClose,
}: {
  title: string;
  description?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-center text-foreground">{title}</h3>
        <p className="text-sm text-text-secondary text-center mt-2">
          {description || "This feature is currently under development and will be available soon. Stay tuned!"}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition"
          >
            Got it
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition"
          >
            Notify me when ready
          </button>
        </div>
      </div>
    </div>
  );
}
