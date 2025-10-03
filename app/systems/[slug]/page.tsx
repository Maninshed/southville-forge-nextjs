import Image from "next/image";
import Link from "next/link";

const SYSTEMS: Record<string, { title: string; intro: string; sections: { h: string; p: string }[]; related: { title: string; href: string; desc: string }[] }> = {
  "customer-growth": {
    title: "Customer Growth",
    intro: "Fuel demand generation and conversion with automated capture, nurture, and lifecycle programs.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, sapien at luctus rhoncus, magna risus tempor dolor, vitae efficitur erat lorem sed arcu." },
      { h: "Why It Matters", p: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ut feugiat velit. Donec faucibus ultrices tortor non aliquam." },
      { h: "Key Benefits", p: "Curabitur eget ultrices libero. Nam viverra, neque vel commodo aliquam, augue risus ornare ipsum, a iaculis lorem lorem nec urna." },
    ],
    related: [
      { title: "Customer Care", href: "/systems/customer-care", desc: "24/7 assistance and SLAs." },
      { title: "Sales & Marketing", href: "/industries/sales-and-marketing", desc: "Sector-focused growth use-cases." },
      { title: "Team Productivity", href: "/systems/team-productivity", desc: "Assistants and knowledge search." },
    ],
  },
  "customer-care": {
    title: "Customer Care",
    intro: "Delight customers with chatbots, routing, SLAs and proactive feedback loops.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut ligula nec metus interdum tempus." },
      { h: "Why It Matters", p: "Praesent mollis, lacus id feugiat porttitor, risus urna fermentum felis, id aliquam mi dui sed turpis." },
      { h: "Key Benefits", p: "Integer id arcu luctus, varius arcu ac, euismod libero. Phasellus auctor ut nulla non iaculis." },
    ],
    related: [
      { title: "Customer Growth", href: "/systems/customer-growth", desc: "Capture and nurture demand." },
      { title: "Finance & Accounting", href: "/industries/finance-and-accounting", desc: "Control and accountability." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Standardise and automate flows." },
    ],
  },
  "finance-automation": {
    title: "Finance Automation",
    intro: "Automate invoicing, reconciliation, cash flow signals, forecasting, and reporting.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae mi at arcu tincidunt sollicitudin." },
      { h: "Why It Matters", p: "Aliquam erat volutpat. Nullam a eros magna. Sed dictum, leo non viverra pulvinar, eros ex bibendum quam, at semper risus lorem id arcu." },
      { h: "Key Benefits", p: "Nunc tempor, nibh in rhoncus bibendum, lacus leo tristique erat, vitae luctus quam est vitae libero." },
    ],
    related: [
      { title: "Legal & Compliance", href: "/industries/legal-and-compliance", desc: "Auditable workflows." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Approvals and SOPs." },
      { title: "Team Productivity", href: "/systems/team-productivity", desc: "Automate busywork." },
    ],
  },
  "operations-and-process": {
    title: "Operations & Process",
    intro: "Standardise SOPs, reduce handoffs, and automate approvals for throughput and quality.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquam, dui sed mattis pulvinar, justo neque tincidunt nulla, ut luctus tortor eros nec risus." },
      { h: "Why It Matters", p: "Duis at tortor a sem pretium suscipit. In hac habitasse platea dictumst." },
      { h: "Key Benefits", p: "Maecenas rutrum, velit nec sodales volutpat, est nulla ultricies lorem, id interdum sem libero a nisi." },
    ],
    related: [
      { title: "Supply Chain & Manufacturing", href: "/industries/supply-chain-and-manufacturing", desc: "Production and inventory." },
      { title: "Customer Care", href: "/systems/customer-care", desc: "Support SLAs routed." },
      { title: "Finance Automation", href: "/systems/finance-automation", desc: "Controls and reporting." },
    ],
  },
  "team-productivity": {
    title: "Team Productivity",
    intro: "Assistants, summaries, scheduling and knowledge search to eliminate busywork.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu iaculis velit, a efficitur justo." },
      { h: "Why It Matters", p: "Sed luctus id urna at tristique. Nunc semper, risus a condimentum lacinia, purus enim placerat nunc, in placerat risus ipsum nec augue." },
      { h: "Key Benefits", p: "Nam facilisis nisl id sapien euismod, eget efficitur massa egestas." },
    ],
    related: [
      { title: "IT & Data Management", href: "/industries/it-and-data-management", desc: "Tickets and access." },
      { title: "Customer Growth", href: "/systems/customer-growth", desc: "Lifecycle automation." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Approvals and SOPs." },
    ],
  },
};

export default function SystemDetailPage({ params }: { params: { slug: string } }) {
  const data = SYSTEMS[params.slug];
  if (!data) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-6xl font-extrabold uppercase tracking-wide" style={{ color: "#122738" }}>System Not Found</h1>
        <p className="mt-4 text-lg" style={{ color: "#122738" }}>The requested system was not found.</p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-[#863e11] px-6 py-3 font-bold uppercase tracking-wide text-[#eadbc0] transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]">Go Home</Link>
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Hero */}
      <div className="-mx-6 bg-[#863e11]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-6xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>{data.title}</h1>
          <p className="mt-4 text-lg" style={{ color: "#eadbc0" }}>{data.intro}</p>
        </div>
      </div>

      {/* Content sections */}
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        {data.sections.map((s, i) => (
          <div key={i} className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-wide" style={{ color: "#122738" }}>{s.h}</h2>
              <p className="mt-4 text-base" style={{ color: "#122738" }}>{s.p}</p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-md bg-[#eadbc0]">
              <Image src="/next.svg" alt="placeholder" fill className="object-contain p-8" />
            </div>
          </div>
        ))}
      </div>

      {/* Related services */}
      <div className="-mx-6 bg-[#eadbc0]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-extrabold uppercase tracking-wide" style={{ color: "#122738" }}>Related Services</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.related.map((r, idx) => (
              <div key={idx} className="rounded-md p-6 bg-[#b84d0b] border border-[#122738] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4d2005]">
                <h3 className="mb-2 text-lg font-extrabold uppercase" style={{ color: "#eadbc0" }}>{r.title}</h3>
                <p className="mb-4 text-sm" style={{ color: "#eadbc0" }}>{r.desc}</p>
                <Link href={r.href} className="inline-block rounded-md bg-[#863e11] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#f4f1e6] transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:text-[#122738] hover:-translate-y-0.5 hover:scale-[1.02]">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
