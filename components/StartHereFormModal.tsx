"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type BizSize = "Sole Trader" | "Small Team (2–10)" | "Growing Business (10–50)" | "Established Company (50+)";

type Area = "Design & Branding" | "Website" | "AI & Automation" | "Customer Experience" | "Other";

type IntakeData = {
  name: string;
  email: string;
  consent: boolean;
  businessSize?: BizSize;
  areas: Area[];
  // Website
  hasWebsite?: "yes" | "no";
  websiteSupport?: "works" | "improve";
  websiteType?: "simple" | "feature-rich";
  // AI & Automation
  timeSink?: "Enquiries" | "Admin" | "Quotes & Invoicing" | "Customer Support" | "Other";
  automateValue?: "yes" | "no";
  // Design & Branding
  hasBrand?: "yes" | "no";
  brandStatus?: "reflects" | "update";
  wantIdentity?: "yes" | "no";
  // Customer Experience
  reachChannel?: "Word of mouth" | "Social media" | "Google" | "Website" | "Other";
  improveFollowups?: "yes" | "no";
  // Wrap-up
  phone?: string;
};

export default function StartHereFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<IntakeData>({ name: "", email: "", consent: false, areas: [] });

  // Mount + ESC handling
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    setMounted(true);
    // trigger fade/zoom in
    const t = setTimeout(() => setVisible(true), 0);
    return () => {
      clearTimeout(t);
      setMounted(false);
      setVisible(false);
    };
  }, []);

  const progress = useMemo(() => {
    if (step === 1) return 33;
    if (step === 2) return 66;
    return 100;
  }, [step]);

  const toggleArea = (area: Area) => {
    setData((d) => {
      const has = d.areas.includes(area);
      return { ...d, areas: has ? d.areas.filter((a) => a !== area) : [...d.areas, area] };
    });
  };

  const canNextFromBasics = useMemo(() => {
    return data.name.trim().length > 0 && /.+@.+\..+/.test(data.email) && data.consent;
  }, [data.name, data.email, data.consent]);

  const submit = async () => {
    setSubmitting(true);
    try {
      const endpoint = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
        });
      } else {
        // Fallback: no endpoint configured yet
        // eslint-disable-next-line no-console
        console.warn("No NEXT_PUBLIC_N8N_WEBHOOK_URL configured; form data: ", data);
      }
      onClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to submit intake form", e);
    } finally {
      setSubmitting(false);
    }
  };

  const overlay = (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    />
  );

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4" onClick={onClose}>
      <div
        className={`mx-auto w-full max-w-3xl mt-20 md:mt-24 transform transition-opacity transition-transform duration-300 ease-in-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card */}
        <div className="bg-[#863e11] text-[#eadbc0] rounded-xl border border-[#122738] shadow-2xl overflow-hidden">
          {/* Progress */}
          <div className="h-2 bg-[#122738]/30">
            <div className="h-full bg-[#122738] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          {/* Header */}
          <div className="px-6 py-4 border-b border-[#122738]/40 flex items-center justify-between">
            <h3 className="text-xl font-extrabold tracking-wide" style={{ color: "#122738" }}>
              Start Here — Quick Intake
            </h3>
            <button
              onClick={onClose}
              className="text-[#122738] hover:text-[#eadbc0] font-bold text-lg"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-6">
            {step === 1 && (
              <section className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "#122738" }}>Name *</label>
                    <input
                      className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "#122738" }}>Email *</label>
                    <input
                      type="email"
                      className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-[#122738] text-[#122738] focus:ring-[#122738]"
                    checked={data.consent}
                    onChange={(e) => setData({ ...data, consent: e.target.checked })}
                    required
                  />
                  <label htmlFor="consent" className="text-sm opacity-90">
                    By continuing, you agree we can use your details to prepare and send you a personalised proposal.
                  </label>
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: "#122738" }}>What best describes your business size?</label>
                  <select
                    className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                    value={data.businessSize ?? ""}
                    onChange={(e) => setData({ ...data, businessSize: e.target.value as BizSize })}
                  >
                    <option value="" disabled>Select an option</option>
                    <option>Sole Trader</option>
                    <option>Small Team (2–10)</option>
                    <option>Growing Business (10–50)</option>
                    <option>Established Company (50+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: "#122738" }}>Which areas are you most interested in today?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {(["Design & Branding","Website","AI & Automation","Customer Experience","Other"] as Area[]).map((a) => (
                      <label key={a} className="flex items-center gap-2 bg-[#b84d0b] rounded-md px-3 py-2 cursor-pointer hover:opacity-90">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-[#122738] text-[#122738] focus:ring-[#122738]"
                          checked={data.areas.includes(a)}
                          onChange={() => toggleArea(a)}
                        />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    disabled={!canNextFromBasics}
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-md bg-[#863e11] text-[#eadbc0] hover:bg-[#122738] disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="space-y-6">
                {/* Website branch */}
                {data.areas.includes("Website") && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold" style={{ color: "#122738" }}>Website</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm mb-1" style={{ color: "#122738" }}>Do you already have a website?</label>
                        <div className="flex gap-3">
                          {(["yes","no"] as const).map((v) => (
                            <label key={v} className="flex items-center gap-2">
                              <input type="radio" name="hasWebsite" value={v}
                                checked={data.hasWebsite === v}
                                onChange={() => setData({ ...data, hasWebsite: v })}
                                className="text-[#122738] focus:ring-[#122738]" />
                              <span className="opacity-90 capitalize">{v}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {data.hasWebsite === "yes" && (
                        <div>
                          <label className="block text-sm mb-1" style={{ color: "#122738" }}>Does it support your goals effectively, or would improvements help?</label>
                          <select
                            className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                            value={data.websiteSupport ?? ""}
                            onChange={(e) => setData({ ...data, websiteSupport: e.target.value as any })}
                          >
                            <option value="" disabled>Select</option>
                            <option value="works">It supports our goals well</option>
                            <option value="improve">Improvements would help</option>
                          </select>
                        </div>
                      )}
                      {data.hasWebsite === "no" && (
                        <div>
                          <label className="block text-sm mb-1" style={{ color: "#122738" }}>Would you like a simple professional site to start with, or a more feature-rich platform?</label>
                          <select
                            className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                            value={data.websiteType ?? ""}
                            onChange={(e) => setData({ ...data, websiteType: e.target.value as any })}
                          >
                            <option value="" disabled>Select</option>
                            <option value="simple">Simple professional site</option>
                            <option value="feature-rich">Feature-rich platform</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* AI & Automation branch */}
                {data.areas.includes("AI & Automation") && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold" style={{ color: "#122738" }}>AI & Automation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm mb-1" style={{ color: "#122738" }}>Which part of your work takes the most time each week?</label>
                        <select
                          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                          value={data.timeSink ?? ""}
                          onChange={(e) => setData({ ...data, timeSink: e.target.value as any })}
                        >
                          <option value="" disabled>Select</option>
                          <option>Enquiries</option>
                          <option>Admin</option>
                          <option>Quotes & Invoicing</option>
                          <option>Customer Support</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1" style={{ color: "#122738" }}>Would it be valuable if these processes were automated, so you could focus on the work itself?</label>
                        <div className="flex gap-3">
                          {(["yes","no"] as const).map((v) => (
                            <label key={v} className="flex items-center gap-2">
                              <input type="radio" name="automateValue" value={v}
                                checked={data.automateValue === v}
                                onChange={() => setData({ ...data, automateValue: v })}
                                className="text-[#122738] focus:ring-[#122738]" />
                              <span className="opacity-90 uppercase">{v}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Design & Branding branch */}
                {data.areas.includes("Design & Branding") && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold" style={{ color: "#122738" }}>Design & Branding</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm mb-1" style={{ color: "#122738" }}>Do you currently have a logo, colours, or brand materials?</label>
                        <div className="flex gap-3">
                          {(["yes","no"] as const).map((v) => (
                            <label key={v} className="flex items-center gap-2">
                              <input type="radio" name="hasBrand" value={v}
                                checked={data.hasBrand === v}
                                onChange={() => setData({ ...data, hasBrand: v })}
                                className="text-[#122738] focus:ring-[#122738]" />
                              <span className="opacity-90 capitalize">{v}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {data.hasBrand === "yes" && (
                        <div>
                          <label className="block text-sm mb-1" style={{ color: "#122738" }}>Do they still reflect your business, or is an update needed?</label>
                          <select
                            className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                            value={data.brandStatus ?? ""}
                            onChange={(e) => setData({ ...data, brandStatus: e.target.value as any })}
                          >
                            <option value="" disabled>Select</option>
                            <option value="reflects">They reflect the business</option>
                            <option value="update">An update is needed</option>
                          </select>
                        </div>
                      )}
                      {data.hasBrand === "no" && (
                        <div>
                          <label className="block text-sm mb-1" style={{ color: "#122738" }}>Would you like us to create a clear, professional identity for you?</label>
                          <div className="flex gap-3">
                            {(["yes","no"] as const).map((v) => (
                              <label key={v} className="flex items-center gap-2">
                                <input type="radio" name="wantIdentity" value={v}
                                  checked={data.wantIdentity === v}
                                  onChange={() => setData({ ...data, wantIdentity: v })}
                                  className="text-[#122738] focus:ring-[#122738]" />
                                <span className="opacity-90 uppercase">{v}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Customer Experience branch */}
                {data.areas.includes("Customer Experience") && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold" style={{ color: "#122738" }}>Customer Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm mb-1" style={{ color: "#122738" }}>How do most of your customers reach you today?</label>
                        <select
                          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                          value={data.reachChannel ?? ""}
                          onChange={(e) => setData({ ...data, reachChannel: e.target.value as any })}
                        >
                          <option value="" disabled>Select</option>
                          <option>Word of mouth</option>
                          <option>Social media</option>
                          <option>Google</option>
                          <option>Website</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1" style={{ color: "#122738" }}>Would you like us to suggest ways to improve follow-ups or enquiries automatically?</label>
                        <div className="flex gap-3">
                          {(["yes","no"] as const).map((v) => (
                            <label key={v} className="flex items-center gap-2">
                              <input type="radio" name="improveFollowups" value={v}
                                checked={data.improveFollowups === v}
                                onChange={() => setData({ ...data, improveFollowups: v })}
                                className="text-[#122738] focus:ring-[#122738]" />
                              <span className="opacity-90 uppercase">{v}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-md bg-[#863e11] text-[#eadbc0] hover:bg-[#122738]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-md bg-[#863e11] text-[#eadbc0] hover:bg-[#122738]"
                  >
                    Continue
                  </button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "#122738" }}>Confirm email</label>
                    <input
                      type="email"
                      className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "#122738" }}>Phone / WhatsApp (optional)</label>
                    <input
                      className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
                      value={data.phone ?? ""}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </div>
                </div>
                <p className="opacity-90">
                  Thank you — this gives us a clear picture of your needs.
                  We’ll prepare a tailored proposal and send it to your email as a downloadable PDF or via secure client login.
                </p>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-md bg-[#863e11] text-[#eadbc0] hover:bg-[#122738]"
                  >
                    Back
                  </button>
                  <button
                    disabled={submitting}
                    onClick={submit}
                    className="px-4 py-2 rounded-md bg-[#863e11] text-[#eadbc0] hover:bg-[#122738] disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen || !mounted) return null;
  return (
    <>
      {createPortal(overlay, document.body)}
      {createPortal(modal, document.body)}
    </>
  );
}
