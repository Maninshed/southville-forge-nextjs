import Image from "next/image";
import Link from "next/link";

const INDUSTRIES: Record<string, { title: string; intro: string; sections: { h: string; p: string }[]; related: { title: string; href: string; desc: string }[] }> = {
  "finance-and-accounting": {
    title: "Finance & Accounting",
    intro: "Modernise finance operations with automation across AP/AR, reconciliation, and reporting.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere sapien at luctus rhoncus." },
      { h: "Why It Matters", p: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae." },
      { h: "Key Benefits", p: "Curabitur eget ultrices libero. Nam viverra neque vel commodo aliquam." },
    ],
    related: [
      { title: "Finance Automation", href: "/systems/finance-automation", desc: "Invoicing, reconciliation, reporting." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Approvals and SOPs." },
      { title: "Legal & Compliance", href: "/industries/legal-and-compliance", desc: "Auditable workflows." },
    ],
  },
  "human-resources": {
    title: "Human Resources",
    intro: "Automate onboarding, recruiting funnels, and training workflows for a better employee experience.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut ligula nec metus interdum tempus." },
      { h: "Why It Matters", p: "Praesent mollis lacus id feugiat porttitor. Id aliquam mi dui sed turpis." },
      { h: "Key Benefits", p: "Integer id arcu luctus varius arcu ac euismod libero." },
    ],
    related: [
      { title: "Team Productivity", href: "/systems/team-productivity", desc: "Assistants and knowledge search." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Standard operating procedures." },
      { title: "Customer Growth", href: "/systems/customer-growth", desc: "Lifecycle programs." },
    ],
  },
  "sales-and-marketing": {
    title: "Sales & Marketing",
    intro: "Automate full-funnel growth: prospecting, qualification, nurture, and retention.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae mi at arcu tincidunt sollicitudin." },
      { h: "Why It Matters", p: "Aliquam erat volutpat. Sed dictum leo non viverra pulvinar." },
      { h: "Key Benefits", p: "Nunc tempor nibh in rhoncus bibendum, lacus leo tristique erat." },
    ],
    related: [
      { title: "Customer Growth", href: "/systems/customer-growth", desc: "Capture, nurture, convert." },
      { title: "Customer Care", href: "/systems/customer-care", desc: "Support SLAs and routing." },
      { title: "Team Productivity", href: "/systems/team-productivity", desc: "Automate busywork." },
    ],
  },
  "supply-chain-and-manufacturing": {
    title: "Supply Chain & Manufacturing",
    intro: "Forecast demand, manage inventory, and streamline production handoffs with automation.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquam dui sed mattis pulvinar." },
      { h: "Why It Matters", p: "Duis at tortor a sem pretium suscipit. In hac habitasse platea dictumst." },
      { h: "Key Benefits", p: "Maecenas rutrum velit nec sodales volutpat est nulla ultricies lorem." },
    ],
    related: [
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "SOPs and approvals." },
      { title: "Finance Automation", href: "/systems/finance-automation", desc: "Controls and reporting." },
      { title: "IT & Data Management", href: "/industries/it-and-data-management", desc: "Tickets and access." },
    ],
  },
  "legal-and-compliance": {
    title: "Legal & Compliance",
    intro: "Automate document generation, review cycles, and compliance records with audit trails.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt, nulla nec aliquam aliquet." },
      { h: "Why It Matters", p: "Morbi eleifend, odio sed fringilla placerat, nunc sapien tempus sem." },
      { h: "Key Benefits", p: "Sed vehicula odio ac pretium mollis. Curabitur vel nisi a mi placerat hendrerit." },
    ],
    related: [
      { title: "Finance Automation", href: "/systems/finance-automation", desc: "Controls and auditability." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Approvals and SOPs." },
      { title: "Public Sector / Education", href: "/industries/public-sector-and-education", desc: "Citizen/student services." },
    ],
  },
  "public-sector-and-education": {
    title: "Public Sector / Education",
    intro: "Modernise citizen and student services with automated intake, routing, and follow-up.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae nisl non eros finibus convallis." },
      { h: "Why It Matters", p: "Fusce sit amet rhoncus urna. Praesent vel mauris at elit iaculis pretium." },
      { h: "Key Benefits", p: "Nullam scelerisque dolor id sagittis congue. Aenean non tempor magna." },
    ],
    related: [
      { title: "Customer Care", href: "/systems/customer-care", desc: "24/7 assistance." },
      { title: "Team Productivity", href: "/systems/team-productivity", desc: "Summaries and scheduling." },
      { title: "IT & Data Management", href: "/industries/it-and-data-management", desc: "IT workflows." },
    ],
  },
  "it-and-data-management": {
    title: "IT & Data Management",
    intro: "Automate tickets, access requests, backups, and knowledge search for faster resolution.",
    sections: [
      { h: "How It Works", p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lacus scelerisque, gravida dolor non, faucibus ante." },
      { h: "Why It Matters", p: "Mauris ut nisl et mi faucibus convallis. Integer sed dui magna." },
      { h: "Key Benefits", p: "Sed pharetra, dolor sed gravida efficitur, quam urna elementum mi." },
    ],
    related: [
      { title: "Team Productivity", href: "/systems/team-productivity", desc: "Assistants and search." },
      { title: "Operations & Process", href: "/systems/operations-and-process", desc: "Standard workflows." },
      { title: "Customer Care", href: "/systems/customer-care", desc: "Support SLAs." },
    ],
  },
};

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const data = INDUSTRIES[params.slug];
  if (!data) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-6xl font-extrabold uppercase tracking-wide" style={{ color: "#122738" }}>Industry Not Found</h1>
        <p className="mt-4 text-lg" style={{ color: "#122738" }}>The requested industry was not found.</p>
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
