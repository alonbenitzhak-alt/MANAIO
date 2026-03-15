import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `אתה יועץ השקעות נדל"ן מקצועי של MANAIO — פלטפורמה להשקעות נדל"ן בינלאומיות.
אתה מסייע לסוכני נדל"ן ולמשקיעים בשאלות הנוגעות להשקעות נדל"ן בחו"ל (יוון, קפריסין, גאורגיה, פורטוגל).
ענה תמיד בעברית אלא אם כן הלקוח כותב באנגלית.
היה מקצועי, ידידותי וקצר. אל תיתן ייעוץ משפטי או פיננסי מחייב — המלץ תמיד להתייעץ עם מומחה.`,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json({ error: "שגיאה בשירות הצ'אט" }, { status: 500 });
  }
}
