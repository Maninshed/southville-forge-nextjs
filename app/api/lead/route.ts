import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const res = await fetch("https://n8n.southvilleforge.com/webhook/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    return new Response(text, { status: res.status });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: true, message: err?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
