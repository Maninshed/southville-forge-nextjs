import fs from "fs";
import path from "path";
import React from "react";
import matter from "gray-matter";
import { marked } from "marked";

interface MarkdownLoaderProps {
  /** Relative path under /knowledge, e.g. "automation/intro.md" */
  filePath: string;
}

export default function MarkdownLoader({ filePath }: MarkdownLoaderProps) {
  try {
    const fullPath = path.join(process.cwd(), "knowledge", filePath);
    const raw = fs.readFileSync(fullPath, "utf8");
    // Remove UTF-8 BOM and leading whitespace/newlines so gray-matter detects front-matter at file start
    const normalized = raw.replace(/^\uFEFF/, "").replace(/^\s+/, "");
    const { content } = matter(normalized);
    // Extra guard: if any YAML fence still remains at the very start of content, strip it
    const bodyOnly = content.replace(/^---[\s\S]*?---\s*/, "");
    const html = marked.parse(bodyOnly);

    return (
      <article
        className="prose mx-auto max-w-3xl px-4 py-12"
        dangerouslySetInnerHTML={{ __html: String(html) }}
      />
    );
  } catch (err) {
    console.error(`Markdown file not found: ${filePath}`, err);
    return (
      <div className="text-center py-24 text-gray-400">
        <p>Coming soon...</p>
      </div>
    );
  }
}
