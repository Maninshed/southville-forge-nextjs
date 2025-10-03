"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
        {/* AI & Automation */}
        <div id="ai-and-automation" className="scroll-mt-24">
          <div className="rounded-md bg-[#863e11] p-8 text-[#eadbc0] shadow-lg md:p-12">
            <h1 className="mb-2 text-6xl font-extrabold" style={{ color: "#eadbc0" }}>AI and Automation</h1>
            <h2 className="mb-4 text-2xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>MADE REFRESHINGLY SIMPLE</h2>
            <p className="text-lg text-[#eadbc0]">
              Smart, reliable workflows that work behind the scenes. From lead capture to customer follow‑ups,
              we automate repetitive steps so your team can focus on the work that matters.
            </p>
            
          </div>

          {/* Book Your Call CTA (matching Hero styles, after AI & Automation intro) */}
          <a
            href="#contact"
            aria-label="Book your call"
            className="mt-10 block w-full rounded-md shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            style={{ backgroundColor: "#863e11", color: "#eadbc0" }}
          >
            <div className="mx-auto max-w-[800px] px-6 py-10 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
                Book Your Call
              </h2>
            </div>
          </a>

          {/* 3-column sub-section: What/How/Why */}
          <div className="mt-12 rounded-md" style={{ backgroundColor: "#863e11" }}>
            <div className="px-6 py-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* WHAT WE DO */}
                <div>
                  <div className="group relative mb-4 aspect-[4/3] overflow-hidden rounded-md shadow-md transition-shadow hover:shadow-lg">
                    <Image
                      src="/FActoryred.webp"
                      alt="Factory machinery graphic"
                      fill
                      className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] transform-gpu"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      priority
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                    WHAT WE DO
                  </h3>
                  <p className="text-base" style={{ color: "#eadbc0" }}>
                    We help businesses streamline operations and cut costs by designing and deploying intelligent
                    automation systems. Our bespoke solutions take over repetitive tasks and free your team to focus on
                    higher-value work.
                  </p>
                </div>

                {/* HOW WE DO IT */}
                <div>
                  <div className="group relative mb-4 aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src="/SF8.webp"
                      alt="Automation workflow graphic"
                      fill
                      className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] transform-gpu"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                    HOW WE DO IT
                  </h3>
                  <p className="text-base" style={{ color: "#eadbc0" }}>
                    We build with the latest tools – from virtual assistants and chatbots to predictive analytics and
                    machine learning models. Every workflow is tailored to fit your processes, whether it’s lead
                    nurturing, customer support, or internal reporting.
                  </p>
                </div>

                {/* WHY IT MATTERS */}
                <div>
                  <div className="group relative mb-4 aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src="/SF6.png"
                      alt="Results and outcomes graphic"
                      fill
                      className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] transform-gpu"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                    WHY IT MATTERS
                  </h3>
                  <p className="text-base" style={{ color: "#eadbc0" }}>
                    Smart automation saves time, reduces human error, and drives better decisions across your
                    organisation. Our goal is to create scalable, future-proof systems that boost performance and give
                    you back valuable time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Systems We Forge - full-width band within this section (updated specs) */}
        <div id="systems-we-forge" className="-mx-6 mt-16 w-auto" style={{ backgroundColor: "#863e11", color: "#f4f1e6" }}>
          <div className="mx-auto max-w-6xl px-6 py-16">
            {/* Heading block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h1 className="text-6xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
                SYSTEMS WE FORGE
              </h1>
              <h2 className="mt-4 text-2xl font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                FROM LEAD GENERATION TO CUSTOMER RETENTION, WE AUTOMATE THE SYSTEMS THAT DRIVE YOUR BUSINESS FORWARD.
              </h2>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "CUSTOMER GROWTH",
                  slug: "customer-growth",
                  desc: "Attract, capture, and convert demand with automated lead gen, nurturing, and lifecycle campaigns.",
                },
                {
                  title: "CUSTOMER CARE",
                  slug: "customer-care",
                  desc: "24/7 assistance with chatbots, ticket routing, SLAs, and feedback loops to improve satisfaction.",
                },
                {
                  title: "FINANCE AUTOMATION",
                  slug: "finance-automation",
                  desc: "Invoice processing, reconciliation, cash flow alerts, forecasting, and financial reporting at speed.",
                },
                {
                  title: "OPERATIONS & PROCESS",
                  slug: "operations-and-process",
                  desc: "Standardize SOPs, reduce handoffs, and automate approvals to increase throughput and quality.",
                },
                {
                  title: "TEAM PRODUCTIVITY",
                  slug: "team-productivity",
                  desc: "Assistants, summaries, scheduling, and knowledge search to eliminate busywork across teams.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-md p-6 text-cream bg-[#b84d0b] border border-[#122738] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:bg-[#4d2005]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Placeholder ThemeIsle-style icon (simple SVG circle with star) */}
                  <div className="mb-4 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="19" stroke="#122738" strokeWidth="2" fill="transparent"/>
                      <path d="M20 10 L22.6 17 H30 L24 21.2 L26.6 28 L20 23.8 L13.4 28 L16 21.2 L10 17 H17.4 L20 10 Z" fill="#122738"/>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm">
                    {item.desc}
                  </p>
                  <a
                    href={`/systems/${item.slug}`}
                    className="inline-block rounded-md bg-[#863e11] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#f4f1e6] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:text-[#122738] hover:-translate-y-0.5 hover:scale-[1.02]"
                  >
                    LEARN MORE
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Industries We Serve - duplicate of systems band with new content */}
        <div id="industries-we-serve" className="-mx-6 mt-16 w-auto" style={{ backgroundColor: "#863e11", color: "#f4f1e6" }}>
          <div className="mx-auto max-w-6xl px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h1 className="text-6xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
                INDUSTRIES WE SERVE
              </h1>
              <h2 className="mt-4 text-2xl font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                EXPERTISE ACROSS FUNCTIONS, APPLIED TO YOUR SECTOR
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "FINANCE & ACCOUNTING", slug: "finance-and-accounting", desc: "Close faster with automated AP/AR, reconciliation, and reporting." },
                { title: "HUMAN RESOURCES", slug: "human-resources", desc: "Onboarding, hiring pipelines, and training workflows on autopilot." },
                { title: "SALES & MARKETING", slug: "sales-and-marketing", desc: "Full-funnel automation from prospecting to retention and upsell." },
                { title: "SUPPLY CHAIN & MANUFACTURING", slug: "supply-chain-and-manufacturing", desc: "Forecasting, inventory alerts, and production handoffs streamlined." },
                { title: "LEGAL & COMPLIANCE", slug: "legal-and-compliance", desc: "Document automation, reviews, and auditable workflows built-in." },
                { title: "PUBLIC SECTOR / EDUCATION", slug: "public-sector-and-education", desc: "Citizen services and student processes modernized with automations." },
                { title: "IT & DATA MANAGEMENT", slug: "it-and-data-management", desc: "Tickets, access requests, backups, and knowledge search—automated." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-md p-6 text-cream bg-[#b84d0b] border border-[#122738] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:bg-[#4d2005]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="mb-4 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="19" stroke="#122738" strokeWidth="2" fill="transparent"/>
                      <path d="M20 10 L22.6 17 H30 L24 21.2 L26.6 28 L20 23.8 L13.4 28 L16 21.2 L10 17 H17.4 L20 10 Z" fill="#122738"/>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-extrabold uppercase" style={{ color: "#eadbc0" }}>
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm">
                    {item.desc}
                  </p>
                  <a
                    href={`/industries/${item.slug}`}
                    className="inline-block rounded-md bg-[#863e11] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#f4f1e6] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:text-[#122738] hover:-translate-y-0.5 hover:scale-[1.02]"
                  >
                    LEARN MORE
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Book Your Call CTA (matching Hero styles) */}
        <a
          href="#contact"
          aria-label="Book your call"
          className="mt-10 block w-full rounded-md shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
          style={{ backgroundColor: "#863e11", color: "#eadbc0" }}
        >
          <div className="mx-auto max-w-[800px] px-6 py-10 text-center">
            <h2 className="text-2xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
              Book Your Call
            </h2>
          </div>
        </a>
      </div>
    </section>
  );
}
