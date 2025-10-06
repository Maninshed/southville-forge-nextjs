"use client";

import { useEffect, useMemo, useState } from "react";

export default function QuickForm() {
  const [lead, setLead] = useState<{
    name: string;
    business: string;
    website: string;
    interest: "web" | "branding" | "automation" | "";
    painPoints: string[];
    email: string;
    consent: boolean;
  }>({ name: "", business: "", website: "", interest: "", painPoints: [], email: "", consent: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const storageKey = "sf_lead_draft";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setLead((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(lead));
    } catch {}
  }, [lead]);

  const updateLead = (patch: Partial<typeof lead>) => setLead((l) => ({ ...l, ...patch }));

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      alert("Please enter a valid email so we can send your proposal.");
      return;
    }
    if (!lead.consent) {
      alert("Please confirm you're happy for us to email your proposal (GDPR consent).");
      return;
    }
    setSending(true);
    try {
      const payload = { ...lead, consent: true, source: "form", ts: Date.now() };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setSent(true);
      (window as any).analytics?.track?.("lead_submitted", { source: "form", interest: lead.interest });
    } catch (e) {
      alert("Sorry, something went wrong sending your details. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const timeGreeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <section id="quick-form" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl rounded-md border p-6 md:p-8" style={{ background: "#eadbc0", color: "#122738", borderColor: "#863e11" }}>
        <h3 className="text-2xl font-extrabold mb-2" style={{ color: "#122738" }}>Quick Form</h3>
        <p className="mb-4 text-sm">
          {timeGreeting} — Prefer to leave details? Fill this quick form and we’ll get back to you.
        </p>
        <form className="space-y-4" onSubmit={submitLead}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">Name</label>
              <input id="name" name="name" value={lead.name} onChange={(e) => updateLead({ name: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" style={{ borderColor: "#863e11", color: "#122738", background: "#f7f1e4" }} />
            </div>
            <div>
              <label htmlFor="business" className="block text-sm font-semibold">Business name</label>
              <input id="business" name="business" value={lead.business} onChange={(e) => updateLead({ business: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" style={{ borderColor: "#863e11", color: "#122738", background: "#f7f1e4" }} />
            </div>
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-semibold">Website (optional)</label>
            <input id="website" name="website" value={lead.website} onChange={(e) => updateLead({ website: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" placeholder="https://..." style={{ borderColor: "#863e11", color: "#122738", background: "#f7f1e4" }} />
          </div>

          {/* Interest and pain points */}
          <div className="grid gap-2">
            <div className="text-sm font-semibold">Area of interest</div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "web", label: "Web Design" },
                { key: "branding", label: "Branding" },
                { key: "automation", label: "Automation" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => updateLead({ interest: opt.key as any })}
                  className={`rounded-md px-3 py-1 text-xs font-semibold border ${lead.interest === opt.key ? "opacity-100" : "opacity-90"}`}
                  style={{ borderColor: "#122738", background: lead.interest === opt.key ? "#122738" : "#b84d0b", color: "#eadbc0" }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-semibold">What’s getting in the way?</div>
            <div className="flex flex-wrap gap-2">
              {[
                "I chase leads manually",
                "Repetitive admin slows us down",
                "Website is hard to update",
                "Brand feels inconsistent",
              ].map((p) => {
                const active = lead.painPoints.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => updateLead({ painPoints: active ? lead.painPoints.filter((x) => x !== p) : [...lead.painPoints, p] })}
                    className={`rounded-md px-3 py-1 text-xs font-semibold border ${active ? "opacity-100" : "opacity-90"}`}
                    style={{ borderColor: "#122738", background: active ? "#122738" : "#b84d0b", color: "#eadbc0" }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
            <input id="email" name="email" type="email" value={lead.email} onChange={(e) => updateLead({ email: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" style={{ borderColor: "#863e11", color: "#122738", background: "#f7f1e4" }} />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input id="consent" type="checkbox" checked={lead.consent} onChange={(e) => updateLead({ consent: e.target.checked })} />
            <label htmlFor="consent">
              If you’re happy for us to email a short proposal or an intro offer (e.g., a free mini design concept), tick here.
              We’ll only use your email for this — never spam or sharing data.
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={sending || sent} className="rounded-md px-4 py-2 font-bold uppercase tracking-wide disabled:opacity-50" style={{ background: "#863e11", color: "#eadbc0", border: "1px solid #122738" }}>
              {sent ? "Sent" : sending ? "Sending..." : "Send details"}
            </button>
            {sent && <span className="text-xs">✅ Details secured</span>}
          </div>

          {sent && (
            <div className="text-sm mt-2">
              We’ll send your proposal shortly. While you’re here, would you like to preview some of our recent work?
              <div className="mt-2 flex gap-3">
                <a href="#ai-and-automation" className="underline" style={{ color: "#122738" }}>Services</a>
                {/* If you add a portfolio section/anchor later, link it here */}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
