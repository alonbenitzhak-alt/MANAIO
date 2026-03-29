import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { validateOrigin } from "@/lib/csrf";
import { checkRateLimit } from "@/lib/rateLimit";

const SYSTEM_PROMPT = `You are a helpful real estate investment advisor for MANAIO (mymanaio.com) — a platform connecting Israeli investors with international real estate opportunities.

You help users:
- Discover investment properties in Greece and Cyprus
- Understand ROI, rental yields, and investment strategies
- Learn about residency/golden visa programs (Greece Golden Visa, Cyprus residency)
- Navigate tax benefits for Israeli investors investing abroad
- Find the right property type: apartments, villas, commercial, land
- Understand the buying process in each country

Key facts about MANAIO:
- Platform for Israeli investors looking for international real estate
- 2 countries: Greece, Cyprus
- Properties range from €50,000 to €2,000,000+
- Golden Visa: Greece (€400k+ in most regions, €800k in Athens/Thessaloniki/Mykonos/Santorini)
- Cyprus offers low corporate tax (12.5%), no inheritance tax, no capital gains tax

Rental yields (source: Global Property Guide, 2024-2025 data):
- Greece: avg 4.4% nationally; Athens avg 5.4%; small apartments in tourist areas 6-8%; regional markets up to 11%
- Cyprus: avg 5.4% for apartments; Limassol 6-7%; Larnaca ~7.6%; Nicosia ~5%

Property price growth (2024-2025):
- Greece: +8.72% annual average in 2024; Thessaloniki +12.1%
- Cyprus: +6.5-8.8% annual

Important disclaimers to mention when discussing yields:
- Yields vary significantly by location, property type, and rental strategy (short-term vs long-term)
- These are gross yields before taxes, management fees, and maintenance
- Past performance does not guarantee future results
- Always recommend consulting with a local tax advisor and real estate professional

Tone: Professional yet friendly. Always respond in the SAME language the user writes in. Supported languages: Hebrew (עברית), English, Greek (Ελληνικά), Russian (Русский), Arabic (العربية). If the user writes in Hebrew — respond in Hebrew. If in English — respond in English. If in Greek — respond in Greek. If in Russian — respond in Russian. If in Arabic — respond in Arabic.

Keep responses concise and helpful. If asked for specific properties, direct them to the /properties page. For inquiries, suggest they contact an agent through the platform.`;

export async function POST(req: NextRequest) {
  const originError = validateOrigin(req);
  if (originError) return originError;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(`ai-chat:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "יותר מדי בקשות. נסה שוב בעוד דקה." }, { status: 429 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "שירות הצ'אט אינו זמין כרגע" }, { status: 503 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    // Limit conversation length and message size to prevent abuse
    const userMessageCount = messages.filter((m: { role: string }) => m.role === "user").length;
    if (userMessageCount > 10) {
      return NextResponse.json({ error: "Question limit reached" }, { status: 400 });
    }
    if (messages.length > 21) {
      return NextResponse.json({ error: "Too many messages" }, { status: 400 });
    }
    const sanitized = messages
      .filter((m) => m && typeof m.role === "string" && typeof m.content === "string")
      .slice(-21) // only last 21 messages (10 user + 10 assistant + 1 in flight)
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, 2000),
      }));
    if (sanitized.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: sanitized,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json({ error: "שגיאה בשירות הצ'אט" }, { status: 500 });
  }
}
