import { loadMarkdown } from "../../lib/markdown";

export const dynamic = "force-static";

export async function generateMetadata() {
  const { data } = loadMarkdown("automation/intro.md");
  return { title: data?.title ?? "AI & Automation" };
}

export default function Page() {
  const intro = loadMarkdown("automation/intro.md");
  const core = loadMarkdown("automation/core-services.md");
  return (
    <main>
      <article className="prose mx-auto max-w-3xl px-4 py-12" dangerouslySetInnerHTML={{ __html: intro.html }} />
      <article className="prose mx-auto max-w-3xl px-4 py-12" dangerouslySetInnerHTML={{ __html: core.html }} />
    </main>
  );
}
