import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openai: process.env.OPENAI_API_KEY ? "✅ Loaded" : "❌ Missing",
    model: process.env.OPENAI_MODEL || null,
    weaviate: process.env.WEAVIATE_URL || null,
  });
}
