import { loadMarkdown } from "../../lib/markdown";

export const dynamic = "force-static";

export async function generateMetadata() {
  const { data } = loadMarkdown("global/forge-manifesto.md");
  return { title: data?.title ?? "About" };
}

export default function Page() {
  const md = loadMarkdown("global/forge-manifesto.md");
  return (
    <main>
      <article className="prose mx-auto max-w-3xl px-4 py-12" dangerouslySetInnerHTML={{ __html: md.html }} />
    </main>
  );
}
