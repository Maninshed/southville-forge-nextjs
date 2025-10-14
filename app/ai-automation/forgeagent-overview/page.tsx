import { loadMarkdown } from "../../../lib/markdown";

export const dynamic = "force-static";

export async function generateMetadata() {
  const { data } = loadMarkdown("automation/forgeagent-overview.md");
  return { title: data?.title ?? "ForgeAgent Overview" };
}

export default function Page() {
  const md = loadMarkdown("automation/forgeagent-overview.md");
  return (
    <main>
      <article className="prose mx-auto max-w-3xl px-4 py-12" dangerouslySetInnerHTML={{ __html: md.html }} />
    </main>
  );
}
