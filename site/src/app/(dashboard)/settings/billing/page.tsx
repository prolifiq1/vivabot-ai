"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

const plans = [
  { name: "Free", price: "$0", period: "/forever", features: ["3 sessions/month", "1 project", "Basic feedback"], current: false },
  { name: "Student", price: "$19", period: "/month", features: ["Unlimited sessions", "5 projects", "Detailed feedback", "Voice mode", "Question bank"], current: true },
  { name: "Researcher", price: "$39", period: "/month", features: ["Everything in Student", "Unlimited projects", "Panel defense", "Priority AI", "Export reports"], current: false },
];

export default function BillingPage() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <>
      <TopBar title="Billing" />
      <div className="p-6 max-w-3xl animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Billing & Subscription</h2>
        <p className="text-sm text-text-secondary mb-6">Manage your plan and payment method</p>

        {/* Current Plan */}
        <div className="bg-brand-light border border-brand/20 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-brand font-semibold uppercase tracking-wider">Current Plan</p>
              <p className="text-xl font-black text-foreground mt-1">Student — $19/month</p>
              <p className="text-xs text-text-secondary mt-1">Next billing date: Jul 15, 2026</p>
            </div>
            <button onClick={() => setModal("manage")} className="border border-brand text-brand text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand hover:text-white transition">Manage Plan</button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {plans.map((p) => (
            <div key={p.name} className={`border rounded-xl p-5 ${p.current ? "border-brand bg-white shadow-sm" : "border-border bg-white"}`}>
              {p.current && <span className="text-[9px] font-bold bg-brand text-white px-2 py-0.5 rounded-full uppercase">Current</span>}
              <p className="text-sm font-bold text-foreground mt-2">{p.name}</p>
              <p className="text-2xl font-black text-foreground">{p.price}<span className="text-xs font-normal text-text-tertiary">{p.period}</span></p>
              <ul className="mt-3 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="text-xs text-text-secondary flex items-center gap-1.5">
                    <span className="text-success text-sm">✓</span> {f}
                  </li>
                ))}
              </ul>
              {!p.current && (
                <button onClick={() => setModal("upgrade")} className="mt-4 w-full py-2 border border-brand text-brand text-xs font-semibold rounded-lg hover:bg-brand hover:text-white transition">
                  {p.price === "$0" ? "Downgrade" : "Upgrade"}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="bg-white border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-foreground">Payment Method</p>
            <button onClick={() => setModal("payment")} className="text-xs text-brand font-semibold hover:underline">Update</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-brand rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
            <div>
              <p className="text-sm text-foreground">•••• •••• •••• 4242</p>
              <p className="text-[10px] text-text-tertiary">Expires 09/2028</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/pricing" className="text-xs text-brand hover:underline">Compare all plans in detail →</Link>
        </div>
      </div>

      {modal === "manage" && <ComingSoonModal title="Manage Subscription" description="Cancel, pause, or change your subscription. Coming in V1." onClose={() => setModal(null)} />}
      {modal === "upgrade" && <ComingSoonModal title="Upgrade Plan" description="Plan upgrades with Stripe integration are coming in V1." onClose={() => setModal(null)} />}
      {modal === "payment" && <ComingSoonModal title="Update Payment" description="Update your card or add a new payment method via Stripe. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
