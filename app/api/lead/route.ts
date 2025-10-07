import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Debug logging locally
    console.log("[lead-proxy] incoming payload:", payload);

    const url = process.env.N8N_WEBHOOK_URL;
    if (!url) {
      console.error("[lead-proxy] Missing N8N_WEBHOOK_URL env var. Payload not forwarded.");
    } else {
      try {
        // fire-and-forget; do not await
        void fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((e) => console.error("[lead-proxy] fetch error:", e));
      } catch (e) {
        console.error("[lead-proxy] unexpected error queuing fetch:", e);
      }
    }

    // Always return 200 OK to avoid breaking UX
    return new Response(JSON.stringify({ status: "sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[lead-proxy] handler error:", err?.message ?? err);
    // Still respond 200 OK per requirement
    return new Response(JSON.stringify({ status: "sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
