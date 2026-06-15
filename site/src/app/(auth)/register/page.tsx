"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1500);
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
          <p className="text-sm text-text-secondary mt-2">Create your free account</p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">First Name</label>
                <input type="text" placeholder="Amara" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Last Name</label>
                <input type="text" placeholder="Obi" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
              <input type="email" placeholder="you@university.edu" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Password</label>
              <input type="password" placeholder="Min 8 characters" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Academic Level</label>
              <select className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand bg-white" required>
                <option value="">Select level</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</> : "Create Free Account"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] text-text-tertiary uppercase">or</span></div>
          </div>

          <button onClick={() => setModal("google")} className="w-full flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg text-xs font-medium text-text-secondary hover:bg-surface transition">
            <span className="text-base">G</span> Sign up with Google
          </button>
        </div>

        <p className="text-center text-xs text-text-secondary mt-4">
          Already have an account? <Link href="/login" className="text-brand font-semibold hover:underline">Sign in</Link>
        </p>
        <p className="text-center text-[10px] text-text-tertiary mt-2">
          By creating an account, you agree to our <button onClick={() => setModal("terms")} className="text-brand hover:underline">Terms</button> and <button onClick={() => setModal("privacy")} className="text-brand hover:underline">Privacy Policy</button>
        </p>
      </div>

      {modal === "google" && <ComingSoonModal title="Google Sign-Up" description="OAuth with Google is coming in V1." onClose={() => setModal(null)} />}
      {modal === "terms" && <ComingSoonModal title="Terms of Service" description="Terms of service document is coming soon." onClose={() => setModal(null)} />}
      {modal === "privacy" && <ComingSoonModal title="Privacy Policy" description="Privacy policy document is coming soon." onClose={() => setModal(null)} />}
    </div>
  );
}
