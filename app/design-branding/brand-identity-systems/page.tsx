import { loadMarkdown } from "../../../lib/markdown";

export const dynamic = "force-static";

export async function generateMetadata() {
  const { data } = loadMarkdown("design/brand-identity-systems.md");
  return { title: data?.title ?? "Brand Identity Systems" };
}

export default function Page() {
  const md = loadMarkdown("design/brand-identity-systems.md");
  return (
    <main>
      <article className="prose mx-auto max-w-3xl px-4 py-12" dangerouslySetInnerHTML={{ __html: md.html }} />
    </main>
  );
}
