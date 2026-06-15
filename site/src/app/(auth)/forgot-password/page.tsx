"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">V</span>
            </div>
            <span className="text-xl font-black text-foreground">VivaBot</span>
          </Link>
          <p className="text-sm text-text-secondary mt-2">Reset your password</p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">Check your email</h3>
              <p className="text-xs text-text-secondary mb-4">We sent a password reset link to <strong>{email}</strong></p>
              <Link href="/login" className="text-xs text-brand font-semibold hover:underline">Back to sign in</Link>
            </div>
          ) : (
            <>
              <p className="text-xs text-text-secondary mb-4">Enter your email and we&apos;ll send you a link to reset your password.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" required />
                </div>
                <button type="submit" className="w-full py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition">Send Reset Link</button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-text-secondary mt-4">
          Remember your password? <Link href="/login" className="text-brand font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
