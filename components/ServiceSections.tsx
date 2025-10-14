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
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide" style={{ color: "#122738" }}>
            Services
          </h2>
          <p className="mt-2 text-base md:text-lg" style={{ color: "#122738" }}>
            Practical design and automation for real businesses.
          </p>
        </header>

        {/* Rows with titled groups and small cards */}
        <div className="space-y-12">
          {/* Row: Lead Generation (AI & Automation) */}
          <div id="ai-and-automation" className="scroll-mt-24">
            <div className="mb-3">
              <h3 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#122738" }}>
                Lead Generation
              </h3>
              <p className="text-sm md:text-base" style={{ color: "#122738" }}>
                Capture, qualify, and follow‑up automatically with reliable workflows.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Landing pages",
                "Forms & calendars",
                "CRM routing",
                "Auto follow‑ups",
                "Lead scoring",
                "Inbox triage",
                "Integrations",
                "Dashboards",
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  className="rounded-md border px-4 py-3 text-sm font-medium shadow-sm"
                  style={{ background: "#eadbc0", color: "#122738", borderColor: "#863e11" }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 + idx * 0.03, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="mt-4">
              <MiniCTAToggle />
            </div>
          </div>

          {/* Row: Website & UX */}
          <div id="website-design" className="scroll-mt-24">
            <div className="mb-3">
              <h3 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#122738" }}>
                Website & UX
              </h3>
              <p className="text-sm md:text-base" style={{ color: "#122738" }}>
                Fast, accessible experiences designed for clarity and conversion.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "IA & content",
                "Component library",
                "Accessibility",
                "Performance",
                "SEO basics",
                "Analytics",
                "CMS setup",
                "Deploy & CI",
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  className="rounded-md border px-4 py-3 text-sm font-medium shadow-sm"
                  style={{ background: "#eadbc0", color: "#122738", borderColor: "#863e11" }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 + idx * 0.03, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="mt-4">
              <MiniCTAToggle />
            </div>
          </div>

          {/* Row: Branding System */}
          <div id="branding" className="scroll-mt-24">
            <div className="mb-3">
              <h3 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#122738" }}>
                Branding System
              </h3>
              <p className="text-sm md:text-base" style={{ color: "#122738" }}>
                A cohesive identity that scales across print and digital.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Identity & logo",
                "Messaging & tone",
                "Color & type",
                "Imagery system",
                "Templates",
                "Guidelines",
                "Rollout plan",
                "Brand assets",
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  className="rounded-md border px-4 py-3 text-sm font-medium shadow-sm"
                  style={{ background: "#eadbc0", color: "#122738", borderColor: "#863e11" }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 + idx * 0.03, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="mt-4">
              <MiniCTAToggle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
