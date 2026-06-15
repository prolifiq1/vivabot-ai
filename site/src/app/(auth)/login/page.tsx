"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1200);
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
          <p className="text-sm text-text-secondary mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-foreground">Password</label>
                <Link href="/forgot-password" className="text-[10px] text-brand hover:underline">Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] text-text-tertiary uppercase">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setModal("google")} className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg text-xs font-medium text-text-secondary hover:bg-surface transition">
              <span className="text-base">G</span> Google
            </button>
            <button onClick={() => setModal("institution")} className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg text-xs font-medium text-text-secondary hover:bg-surface transition">
              <span className="text-base">🏫</span> Institution SSO
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-text-secondary mt-4">
          Don&apos;t have an account? <Link href="/register" className="text-brand font-semibold hover:underline">Sign up free</Link>
        </p>
      </div>

      {modal === "google" && <ComingSoonModal title="Google Sign-In" description="OAuth with Google is coming in V1." onClose={() => setModal(null)} />}
      {modal === "institution" && <ComingSoonModal title="Institution SSO" description="SAML-based single sign-on for universities is coming in V2." onClose={() => setModal(null)} />}
    </div>
  );
}
