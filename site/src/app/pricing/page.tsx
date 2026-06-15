"use client";

import { useState } from "react";
import Link from "next/link";
import ComingSoonModal from "@/components/ComingSoonModal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try VivaBot risk-free",
    features: ["3 sessions/month", "1 project", "Basic feedback", "Text mode only", "Community support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Student",
    price: "$19",
    period: "/month",
    desc: "For serious thesis candidates",
    features: ["Unlimited sessions", "5 projects", "Detailed AI feedback", "Voice + Text mode", "Question bank", "Score analytics", "Email support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Researcher",
    price: "$39",
    period: "/month",
    desc: "For PhD candidates and post-docs",
    features: ["Everything in Student", "Unlimited projects", "Panel defense simulation", "Priority AI models", "Export PDF reports", "Supervisor sharing", "Priority support"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "University",
    price: "$8",
    period: "/seat/month",
    desc: "For departments and cohorts",
    features: ["Everything in Researcher", "Admin dashboard", "Cohort analytics", "SAML SSO", "LMS integration", "Custom rubrics", "Dedicated support", "SLA guarantee"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">V</span>
          </div>
          <span className="text-lg font-black text-foreground">VivaBot</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-text-secondary hover:text-foreground transition">Log in</Link>
          <Link href="/register" className="bg-brand text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-hover transition">Sign Up Free</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-foreground">Simple, transparent pricing</h1>
          <p className="text-text-secondary mt-2">Start free. Upgrade when you&apos;re ready.</p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm ${!annual ? "text-foreground font-semibold" : "text-text-secondary"}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`relative w-11 h-6 rounded-full transition ${annual ? "bg-brand" : "bg-border"}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${annual ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className={`text-sm ${annual ? "text-foreground font-semibold" : "text-text-secondary"}`}>Annual <span className="text-success text-xs font-semibold">Save 20%</span></span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl p-6 ${p.highlight ? "bg-brand text-white border-2 border-brand shadow-lg scale-[1.03]" : "bg-white border border-border"}`}>
              {p.highlight && <span className="text-[9px] font-bold bg-white text-brand px-2 py-0.5 rounded-full uppercase">Most Popular</span>}
              <p className={`text-sm font-bold mt-2 ${p.highlight ? "text-white" : "text-foreground"}`}>{p.name}</p>
              <p className={`text-3xl font-black mt-1 ${p.highlight ? "text-white" : "text-foreground"}`}>
                {annual && p.price !== "$0" ? `$${Math.round(parseInt(p.price.slice(1)) * 0.8)}` : p.price}
                <span className={`text-xs font-normal ${p.highlight ? "text-white/70" : "text-text-tertiary"}`}>{p.period}</span>
              </p>
              <p className={`text-xs mt-1 ${p.highlight ? "text-white/70" : "text-text-secondary"}`}>{p.desc}</p>

              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className={`text-xs flex items-center gap-1.5 ${p.highlight ? "text-white/90" : "text-text-secondary"}`}>
                    <span className={p.highlight ? "text-white" : "text-success"}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => p.cta === "Contact Sales" ? setModal("sales") : setModal("signup")}
                className={`mt-6 w-full py-2.5 rounded-lg text-sm font-semibold transition ${p.highlight ? "bg-white text-brand hover:bg-white/90" : "border border-brand text-brand hover:bg-brand hover:text-white"}`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-text-tertiary">All plans include a 14-day free trial. No credit card required. <button onClick={() => setModal("faq")} className="text-brand hover:underline">FAQs</button></p>
        </div>
      </div>

      {modal === "signup" && <ComingSoonModal title="Start Trial" description="Sign up for a 14-day free trial. Payment integration coming in V1." onClose={() => setModal(null)} />}
      {modal === "sales" && <ComingSoonModal title="Contact Sales" description="Enterprise and university sales inquiries. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "faq" && <ComingSoonModal title="FAQs" description="Frequently asked questions page is coming soon." onClose={() => setModal(null)} />}
    </div>
  );
}
