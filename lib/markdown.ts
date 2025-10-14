import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type LoadedMarkdown = {
  html: string;
  data: Record<string, any>;
};

export function loadMarkdown(relativePathUnderKnowledge: string): LoadedMarkdown {
  const fullPath = path.join(process.cwd(), "knowledge", relativePathUnderKnowledge);
  const raw = fs.readFileSync(fullPath, "utf8");
  const normalized = raw.replace(/^\uFEFF/, "").replace(/^\s+/, "");
  const { content, data } = matter(normalized);
  const bodyOnly = content.replace(/^---[\s\S]*?---\s*/, "");
  const html = String(marked.parse(bodyOnly));
  return { html, data };
}
