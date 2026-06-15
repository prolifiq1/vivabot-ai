"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <TopBar title="Profile Settings" />
      <div className="p-6 max-w-2xl animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Profile</h2>
        <p className="text-sm text-text-secondary mb-6">Update your personal and academic information</p>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white text-xl font-bold">AO</div>
            <div>
              <button type="button" onClick={() => setModal("avatar")} className="text-xs text-brand font-semibold hover:underline">Change photo</button>
              <p className="text-[10px] text-text-tertiary mt-0.5">JPG, PNG. Max 5MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">First Name</label>
              <input type="text" defaultValue="Amara" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Last Name</label>
              <input type="text" defaultValue="Obi" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
            <input type="email" defaultValue="amara.obi@university.edu" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Institution</label>
              <input type="text" defaultValue="University of Lagos" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Department</label>
              <input type="text" defaultValue="Computer Science" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Academic Level</label>
              <select defaultValue="phd" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand bg-white">
                <option value="undergraduate">Undergraduate</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Defense Date</label>
              <input type="date" defaultValue="2026-07-10" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Supervisor Email</label>
            <input type="email" defaultValue="prof.nwosu@university.edu" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-brand" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-hover transition">
              {saved ? "Saved!" : "Save Changes"}
            </button>
            <button type="button" onClick={() => setModal("password")} className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition">Change Password</button>
          </div>
        </form>
      </div>

      {modal === "avatar" && <ComingSoonModal title="Upload Photo" description="Profile photo upload is coming in V1." onClose={() => setModal(null)} />}
      {modal === "password" && <ComingSoonModal title="Change Password" description="Password management will be available when authentication is fully integrated. Coming in V1." onClose={() => setModal(null)} />}
    </>
  );
}
