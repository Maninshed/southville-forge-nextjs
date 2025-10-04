import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="bg-offwhite">
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        {/* Page Heading */}
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide" style={{ color: "#122738" }}>
            Services
          </h1>
          <p className="mt-4 text-lg md:text-xl" style={{ color: "#122738" }}>
            Practical design and automation for real businesses.
          </p>
        </header>

        {/* 1. AI & Automation Systems */}
        <section id="automation" className="scroll-mt-24">
          <div className="rounded-md p-8 md:p-10 shadow-lg" style={{ backgroundColor: "#863e11", color: "#eadbc0" }}>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#122738" }}>AI & Automation Systems</h2>
            <p className="mt-2 opacity-90">
              Automate key workflows across marketing, sales, service, and operations to save time and scale outcomes.
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
              {
                title: "Quote Creation",
                desc:
                  "Automatically generate professional quotes and proposals from customer input or CRM data.",
              },
              {
                title: "Invoice Generation",
                desc:
                  "Create and send branded invoices instantly, integrate with accounting systems, and automate follow-ups.",
              },
              {
                title: "Stock Monitoring",
                desc:
                  "Track inventory levels, trigger restock alerts, and sync product data across platforms in real time.",
              },
            ].map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="service-card rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4d2005]"
                style={{ color: "#eadbc0" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold uppercase text-[#122738]">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm opacity-95">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Design & Branding */}
        <section id="design" className="scroll-mt-24">
          <div className="rounded-md p-8 md:p-10 shadow-lg" style={{ backgroundColor: "#863e11", color: "#eadbc0" }}>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#122738" }}>Design & Branding</h2>
            <p className="mt-2 opacity-90">
              Cohesive brand systems and performant websites that communicate clearly and convert.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Web Design & Development" },
              { title: "Branding & Identity Design (logos, style guides, assets)" },
              { title: "Graphic & Print Design (posters, bags, textiles, etc.)" },
              { title: "Moodboard-driven Design Process (predefined or tailored styles)" },
            ].map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="service-card rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4d2005]"
                style={{ color: "#eadbc0" }}
              >
                <h3 className="text-lg font-extrabold uppercase text-[#122738]">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Creative Tech & Hybrid Solutions */}
        <section id="hybrid" className="scroll-mt-24">
          <div className="rounded-md p-8 md:p-10 shadow-lg" style={{ backgroundColor: "#863e11", color: "#eadbc0" }}>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#122738" }}>Creative Tech & Hybrid Solutions</h2>
            <p className="mt-2 opacity-90">
              Combining AI, automation, and solid infrastructure for unique, production-grade outcomes.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI-assisted Design (image generation, enhancement, concept work)" },
              { title: "Custom Automation Dashboards (n8n + WordPress/React frontends)" },
              { title: "Infrastructure: Hybrid Local-Cloud AI Hosting (Hetzner + T7910 workstation)" },
            ].map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="service-card rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4d2005]"
                style={{ color: "#eadbc0" }}
              >
                <h3 className="text-lg font-extrabold uppercase text-[#122738]">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="pt-4">
          <a
            href="#contact"
            className="block w-full rounded-md shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            style={{ backgroundColor: "#863e11", color: "#eadbc0" }}
          >
            <div className="mx-auto max-w-[900px] px-6 py-8 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
                Practical Design and Automation For Real Businesses. Start Here
              </h2>
            </div>
          </a>
        </div>

        {/* Quick links to sections */}
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="#automation" className="underline text-sm font-semibold" style={{ color: "#122738" }}>AI & Automation</Link>
          <Link href="#design" className="underline text-sm font-semibold" style={{ color: "#122738" }}>Design & Branding</Link>
          <Link href="#hybrid" className="underline text-sm font-semibold" style={{ color: "#122738" }}>Creative Tech & Hybrid</Link>
        </nav>
      </section>
    </main>
  );
}
