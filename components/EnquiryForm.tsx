"use client";

import { useState } from "react";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        name,
        email,
        business,
        website,
        message,
        source: "site-form",
        ts: Date.now(),
      };
      const res = await fetch("https://n8n.southvilleforge.com/webhook/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      // Clear form and show confirmation
      setName("");
      setEmail("");
      setBusiness("");
      setWebsite("");
      setMessage("");
      setSuccess("Thanks — your message has been sent. We'll get back to you shortly.");
    } catch (err: any) {
      setError("Sorry, we couldn't send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-3 text-left">
      <div>
        <label className="block text-sm mb-1" style={{ color: "#eadbc0" }}>Name</label>
        <input
          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: "#eadbc0" }}>Email</label>
        <input
          type="email"
          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: "#eadbc0" }}>Business</label>
        <input
          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: "#eadbc0" }}>Website</label>
        <input
          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738]"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: "#eadbc0" }}>Message</label>
        <textarea
          className="w-full rounded-md px-3 py-2 bg-[#eadbc0] text-[#122738] outline-none focus:ring-2 focus:ring-[#122738] min-h-[100px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-md bg-[#122738] text-[#eadbc0] hover:bg-[#73340f] disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send"}
        </button>
        {success && <span className="text-sm" style={{ color: "#eadbc0" }}>{success}</span>}
        {error && <span className="text-sm text-red-100">{error}</span>}
      </div>
    </form>
  );
}
