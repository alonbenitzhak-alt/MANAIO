import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Translation service not configured" }, { status: 503 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json({ error: "Missing title or description" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Translate the following real estate property title and description from English to Hebrew. Return ONLY a JSON object with keys "title_he" and "description_he". No explanation, no markdown, just the JSON.

Title: ${title}
Description: ${description}`,
        },
      ],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    // Strip markdown code fences if Claude wraps the JSON
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let parsed: { title_he?: string; description_he?: string };
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Translation JSON parse failed. Raw response:", raw);
      return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }

    if (!parsed.title_he || !parsed.description_he) {
      return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }

    return NextResponse.json({ title_he: parsed.title_he, description_he: parsed.description_he });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
