import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEAVIATE_URL = process.env.WEAVIATE_URL || "http://localhost:8082";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

type RetrievedDoc = { title: string; source: string };

async function queryWeaviateBM25(queryText: string): Promise<RetrievedDoc[]> {
  const classes = [
    "AutomationKnowledge",
    "DesignKnowledge",
    "HybridKnowledge",
    "GlobalKnowledge",
  ];
  const results: RetrievedDoc[] = [];
  for (const c of classes) {
    const gql = {
      query: `{
        Get {
          ${c}(
            limit: 3
            bm25: { query: ${JSON.stringify(queryText)} }
          ){
            title
            source
          }
        }
      }`,
    };
    try {
      const res = await fetch(`${WEAVIATE_URL}/v1/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gql),
      });
      if (!res.ok) continue;
      const json = await res.json();
      const docs = json?.data?.Get?.[c] || [];
      for (const d of docs) {
        if (d?.title) results.push({ title: d.title, source: d.source || c });
      }
    } catch {
      // ignore class failure; continue others
    }
  }
  // De-duplicate by title, keep first 3
  const seen = new Set<string>();
  const unique = results.filter((r) => (seen.has(r.title) ? false : (seen.add(r.title), true)));
  return unique.slice(0, 3);
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "Server missing OPENAI_API_KEY" }, { status: 500 });
    }

    const t0 = Date.now();
    const startISO = new Date(t0).toISOString();

    // Retrieve top context (non-streaming)
    const retrieved = await queryWeaviateBM25(message).catch(() => [] as RetrievedDoc[]);
    const sourcesList: RetrievedDoc[] = Array.isArray(retrieved) ? retrieved : [];

    // Create a streaming response that proxies OpenAI SSE as NDJSON
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          // Concise system prompt for natural, consultative tone
          const systemPrompt = `You are ForgeAgent, a calm, human consultant for Southville Forge (branding, web, automation).
Speak like a real studio lead: British spelling, short lines, one idea per message. Build rapport first, then discovery.
Adapt to design or automation naturally. Ask one clear question at a time. Offer optional, transparent next steps (GDPR-aware).`;

          // Build OpenAI chat messages
          const contextText = sourcesList.length
            ? sourcesList.map((d) => `- ${d.title} (${d.source || ""})`).join("\n")
            : "(no retrieved context)";

          const messages = [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Context (internal):\n${contextText}\n\nUser question:\n${message}\n\nReply conversationally with natural pacing.`,
            },
          ];

          const openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: OPENAI_MODEL,
              stream: true,
              messages,
            }),
          });

          if (!openaiResp.body) {
            // Emit a single error line and finish
            controller.enqueue(encoder.encode(JSON.stringify({ response: "", done: true }) + "\n"));
            controller.close();
            return;
          }

          const reader = openaiResp.body.getReader();
          const decoder = new TextDecoder();
          let sseBuffer = "";
          let fullReply = "";

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            sseBuffer += decoder.decode(value, { stream: true });
            const lines = sseBuffer.split("\n");
            sseBuffer = lines.pop() ?? "";

            for (const l of lines) {
              const line = l.trim();
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (data === "[DONE]") {
                // end of stream
                break;
              }
              try {
                const json = JSON.parse(data);
                const delta = json?.choices?.[0]?.delta?.content ?? "";
                if (delta) {
                  fullReply += delta;
                  controller.enqueue(encoder.encode(JSON.stringify({ response: delta, done: false }) + "\n"));
                }
              } catch {
                // ignore parse errors
              }
            }
          }

          const endISO = new Date().toISOString();
          const timing = { start: startISO, end: endISO, elapsed_ms: Date.now() - t0 };

          // Final payload line contains summary info
          const finalPayload = { reply: fullReply.trim(), sources: sourcesList, timing, done: true };
          controller.enqueue(encoder.encode(JSON.stringify(finalPayload) + "\n"));
          controller.close();
        } catch (e) {
          console.error("ForgeAgent stream error:", e);
          controller.enqueue(encoder.encode(JSON.stringify({ response: "", done: true }) + "\n"));
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("ForgeAgent API error:", err);
    return NextResponse.json({ error: "Agent error" }, { status: 500 });
  }
}
