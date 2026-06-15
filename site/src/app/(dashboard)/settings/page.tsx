"use client";

import Link from "next/link";
import TopBar from "@/components/TopBar";

const settingsItems = [
  { title: "Profile", desc: "Name, email, institution, academic details", href: "/settings/profile", icon: "👤" },
  { title: "Billing & Subscription", desc: "Manage your plan and payment methods", href: "/settings/billing", icon: "💳" },
  { title: "Notifications", desc: "Email and in-app notification preferences", href: "/settings/profile", icon: "🔔" },
  { title: "Privacy & Data", desc: "Data retention, export, and deletion", href: "/settings/profile", icon: "🔒" },
];

export default function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" />
      <div className="p-6 max-w-2xl animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Settings</h2>
        <p className="text-sm text-text-secondary mb-6">Manage your account and preferences</p>

        <div className="space-y-2">
          {settingsItems.map((item) => (
            <Link key={item.title} href={item.href} className="flex items-center gap-4 bg-white border border-border rounded-xl p-4 hover:border-brand/30 transition">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
              <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-text-tertiary">VivaBot v0.1.0 &middot; <Link href="/pricing" className="text-brand hover:underline">View Plans</Link></p>
        </div>
      </div>
    </>
  );
}
