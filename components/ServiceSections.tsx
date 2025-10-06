"use client";
import { motion } from "framer-motion";
import MiniCTAToggle from "./MiniCTAToggle";

export default function ServiceSections() {
  return (
    <section className="relative mb-24 md:mb-32">
      {/* Background tint */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: "rgba(234, 219, 192, 0.5)" }} />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide" style={{ color: "#122738" }}>Services</h2>
          <p className="mt-2 text-base md:text-lg" style={{ color: "#122738" }}>
            Practical design and automation for real businesses.
          </p>
        </header>

        {/* Three service cards: row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              key: "automation",
              title: "AI & Automation",
              blurb:
                "Automate lead capture, follow‑ups, and operations. Reliable systems that save time and scale outcomes.",
            },
            {
              key: "web",
              title: "Web Design",
              blurb:
                "Fast, accessible sites built for clarity and conversion. Modern stack, sharp visuals, instant loads.",
            },
            {
              key: "branding",
              title: "Branding",
              blurb:
                "Cohesive identity, voice, and assets that scale across print and digital. Clear positioning that sticks.",
            },
          ].map((card, idx) => {
            const id =
              card.key === "automation" ? "ai-and-automation" : card.key === "web" ? "website-design" : "branding";
            return (
              <div key={card.key} id={id} className="scroll-mt-24">
                <motion.div
                  className="group rounded-md border p-6 md:p-8"
                  style={{ background: "#eadbc0", color: "#122738", borderColor: "#863e11" }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + idx * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Icon */}
                  <div className="mb-3 flex justify-center">
                    <span className="text-[#eadbc0] transition-colors duration-300 group-hover:text-[#122738]">
                      {card.key === "automation" && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M19.14 12.94a7.952 7.952 0 0 0 .06-.94 7.952 7.952 0 0 0-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.987 7.987 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.23-1.12.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 7.08a.5.5 0 0 0 .12.64L4.85 9.3c-.04.31-.06.62-.06.94s.02.63.06.94L2.82 12.76a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.51.41 1.05.71 1.63.94l.36 2.54c.04.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.23 1.12-.53 1.63-.94l2.39.96c.22.09.48 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/>
                        </svg>
                      )}
                      {card.key === "web" && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <rect x="3" y="4" width="18" height="14" rx="2" ry="2"/>
                          <rect x="8" y="20" width="8" height="2" rx="1"/>
                        </svg>
                      )}
                      {card.key === "branding" && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 2a10 10 0 1 0 0 20c1.7 0 2.5-1 2.5-2s-.8-2-2-2h-1a3 3 0 0 1 0-6h1a3 3 0 0 0 0-6zM7 8a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 7 8zm10 1a1.5 1.5 0 1 1-3 .001A1.5 1.5 0 0 1 17 9zM9 14a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 9 14z"/>
                        </svg>
                      )}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2" style={{ color: "#122738" }}>{card.title}</h3>
                  <p className="text-sm md:text-base mb-4" style={{ color: "#122738" }}>{card.blurb}</p>

                  <MiniCTAToggle
                    onForm={() => {
                      const el = document.getElementById("quick-form");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    onChat={() => {
                      window.dispatchEvent(new CustomEvent("open-chat"));
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
