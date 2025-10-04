"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAToggle from "./CTAToggle";

export default function ServiceSections() {
  return (
    <section className="relative mb-24 md:mb-32">
      {/* Background layer with 50% opacity #eadbc0 */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "rgba(234, 219, 192, 0.5)" }}
      />

      {/* Foreground content */}
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-20">
        {/* 1. AI & Automation Systems */}
        <div id="ai-and-automation" className="scroll-mt-24">
          <div className="rounded-md p-8 md:p-12 shadow-lg" style={{ backgroundColor: "#863e11", color: "#eadbc0" }}>
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#122738" }}>AI & Automation Systems</h2>
            <p className="mt-3 text-lg">
              Smart, reliable workflows—from lead capture to customer follow-ups—so your team can focus on what matters.
              We use the sharpest AI tools available, but we anchor them in open, flexible systems so clients aren’t locked in.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Lead Generation",
                desc:
                  "Capture and qualify high-value leads automatically to keep your pipeline full and sales team productive.",
              },
              {
                title: "Database Reactivation",
                desc:
                  "Revive old contacts with targeted campaigns, converting dormant lists into fresh opportunities and new revenue.",
              },
              {
                title: "Social Media Management",
                desc:
                  "Plan, schedule, and publish posts across platforms while tracking engagement and optimizing audience growth.",
              },
              {
                title: "Email Marketing",
                desc:
                  "Automate personalized campaigns that nurture leads, boost retention, and drive consistent conversions.",
              },
              {
                title: "Customer Support",
                desc:
                  "Deliver instant, consistent support through chatbots and workflows, reducing wait times and improving satisfaction.",
              },
              {
                title: "Appointment Booking",
                desc:
                  "Simplify scheduling with automated reminders and calendar sync to reduce no-shows and save time.",
              },
              { title: "Quote Creation", desc: "Automatically generate professional quotes and proposals from customer input or CRM data." },
              { title: "Invoice Generation", desc: "Create and send branded invoices instantly, integrate with accounting systems, and automate follow-ups." },
              { title: "Stock Monitoring", desc: "Track inventory levels, trigger restock alerts, and sync product data across platforms in real time." },
            ].map((item, idx) => (
              <motion.div
                key={`${item.title}-${idx}`}
                className="service-card rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg text-center group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 + idx * 0.03, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.25 }}
                style={{ color: "#eadbc0" }}
              >
                {/* Gear icon */}
                <div className="mb-2 flex justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M19.14 12.94a7.952 7.952 0 0 0 .06-.94 7.952 7.952 0 0 0-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.987 7.987 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.23-1.12.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 7.08a.5.5 0 0 0 .12.64L4.85 9.3c-.04.31-.06.62-.06.94s.02.63.06.94L2.82 12.76a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.51.41 1.05.71 1.63.94l.36 2.54c.04.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.23 1.12-.53 1.63-.94l2.39.96c.22.09.48 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/>
                  </svg>
                </div>
                <h3 className="text-[1.35rem] font-extrabold uppercase text-[#122738]">{item.title}</h3>
                <p className="text-[#eadbc0] text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-1 transition-all duration-300 ease-in-out mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Parallax banner between Automation and Design */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-64 md:h-80 lg:h-96 overflow-hidden" aria-hidden>
          <div
            className="absolute inset-0 bg-center bg-cover bg-fixed opacity-50"
            style={{ backgroundImage: "url('/Banner1.webp')" }}
          />
        </div>

        {/* 2. Design & Branding */}
        <div id="design-and-branding" className="scroll-mt-24">
          <div className="rounded-md p-8 md:p-12 shadow-lg" style={{ backgroundColor: "#863e11", color: "#eadbc0" }}>
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#122738" }}>Design & Branding</h2>
            <p className="mt-3 text-lg">Cohesive brand systems and performant websites that communicate clearly and convert.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Web Design & Development", desc: "Fast, responsive sites designed for clarity and performance on every device.", icon: "web" },
              { title: "Branding & Identity Design (logos, style guides, assets)", desc: "Create cohesive visual systems and brand assets that express who you are.", icon: "palette" },
              { title: "Graphic & Print Design (posters, bags, textiles, etc.)", desc: "Bring your ideas to life across print, packaging, and digital platforms.", icon: "print" },
              { title: "Moodboard-driven Design Process (predefined or tailored styles)", desc: "Collaborative visual direction for quick alignment on style, tone, and feel.", icon: "grid" },
              { title: "Rebrand", desc: "Refresh your visuals and messaging without starting from scratch.", icon: "refresh" },
              { title: "Design Systems & Templates", desc: "Reusable kits and components that keep your brand output consistent.", icon: "cube" },
            ].map((item, idx) => (
              <motion.div
                key={`${item.title}-${idx}`}
                className="service-card rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg text-center group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 + idx * 0.03, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.25 }}
                style={{ color: "#eadbc0" }}
              >
                <div className="mb-2 flex justify-center">
                  {item.icon === "web" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="14" rx="2" ry="2"/><rect x="8" y="20" width="8" height="2" rx="1"/></svg>
                  )}
                  {item.icon === "palette" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 0 20c1.7 0 2.5-1 2.5-2s-.8-2-2-2h-1a3 3 0 0 1 0-6h1a3 3 0 0 0 0-6zM7 8a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 7 8zm10 1a1.5 1.5 0 1 1-3 .001A1.5 1.5 0 0 1 17 9zM9 14a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 9 14z"/></svg>
                  )}
                  {item.icon === "print" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v4H6V2zm12 6H6a4 4 0 0 0-4 4v4h4v6h12v-6h4v-4a4 4 0 0 0-4-4zm-2 12H8v-4h8v4z"/></svg>
                  )}
                  {item.icon === "grid" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>
                  )}
                  {item.icon === "refresh" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 12.65-5.65z"/></svg>
                  )}
                  {item.icon === "cube" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l8 4v12l-8 4-8-4V6l8-4zm0 2.2L6 6v.1l6 3 6-3V6l-6-1.8zM6 8.8V18l6 3V11.8L6 8.8zm12 0l-6 3V21l6-3V8.8z"/></svg>
                  )}
                </div>
                <h3 className="text-[1.35rem] font-extrabold uppercase text-[#122738]">{item.title}</h3>
                <p className="text-[#eadbc0] text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-1 transition-all duration-300 ease-in-out mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Parallax banner between Design and Hybrid */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-64 md:h-80 lg:h-96 overflow-hidden" aria-hidden>
          <div
            className="absolute inset-0 bg-center bg-cover bg-fixed opacity-50"
            style={{ backgroundImage: "url('/banner3.webp')" }}
          />
        </div>

        {/* 3. Creative Tech & Hybrid Solutions */}
        <div id="creative-tech-and-hybrid" className="scroll-mt-24">
          <div className="rounded-md p-8 md:p-12 shadow-lg" style={{ backgroundColor: "#863e11", color: "#eadbc0" }}>
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#122738" }}>Creative Tech & Hybrid Solutions</h2>
            <p className="mt-3 text-lg">Combining AI, automation, and infrastructure for unique, production-grade outcomes.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI-assisted Design", desc: "Leverage AI to explore, enhance, and iterate on creative concepts." },
              { title: "Custom Automation Dashboards", desc: "Unify workflows and data into a single, actionable control panel." },
              { title: "Infrastructure: Hybrid Local-Cloud AI Hosting", desc: "Balanced performance and cost with local and cloud resources." },
            ].map((item, idx) => (
              <motion.div
                key={`${item.title}-${idx}`}
                className="service-card rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg text-center group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 + idx * 0.03, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.25 }}
                style={{ color: "#eadbc0" }}
              >
                <div className="mb-2 flex justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#122738" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l8 4v12l-8 4-8-4V6l8-4zm0 2.2L6 6v.1l6 3 6-3V6l-6-1.8zM6 8.8V18l6 3V11.8L6 8.8zm12 0l-6 3V21l6-3V8.8z"/></svg>
                </div>
                <h3 className="text-[1.35rem] font-extrabold uppercase text-[#122738]">{item.title}</h3>
                <p className="text-[#eadbc0] text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-1 transition-all duration-300 ease-in-out mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA - Brown banner with CTAToggle */}
        <div
          className="mt-6 block w-full rounded-md shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu relative z-[95]"
          style={{ backgroundColor: "#863e11", color: "#eadbc0" }}
        >
          <div className="relative overflow-hidden mx-auto max-w-[900px] px-6 py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
              Practical Design and Automation For Real Businesses
            </h2>
            <div className="mt-4">
              <CTAToggle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
