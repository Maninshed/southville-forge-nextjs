import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="w-full border-b" style={{ borderColor: "#863e11" }}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 text-sm md:text-base text-cream">
        <Link href="/ai-automation" className="hover:underline">AI & Automation</Link>
        <Link href="/design-branding" className="hover:underline">Design & Branding</Link>
        <Link href="/creative-tech" className="hover:underline">Creative Tech</Link>
        <span className="mx-2 opacity-30">|</span>
        <Link href="/start" className="hover:underline">Start</Link>
        <Link href="/ask" className="hover:underline">Ask</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/case-studies" className="hover:underline">Case Studies</Link>
      </div>
    </nav>
  );
}
