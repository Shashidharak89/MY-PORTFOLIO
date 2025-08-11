import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const chatId = data.message?.chat?.id;
    const messageTextRaw = data.message?.text || "";
    const messageText = messageTextRaw.toLowerCase();

    if (!chatId) {
      return NextResponse.json({ status: "no chat id" });
    }

    // /start command: show intro and commands
    if (messageText === "/start") {
      const welcomeMsg =
        "👋 Welcome! I am your AI-powered Telegram bot.\n\n" +
        "You can try these commands:\n" +
        "/start - Show this introduction\n" +
        "Ask me who is my creator!\n" +
        "Say 'contact' to get creator's contact info.\n" +
        "Or just type anything else and I'll reply using AI.";

      await sendTelegramMessage(chatId, welcomeMsg);
      return NextResponse.json({ ok: true });
    }

    // Creator info keywords
    if (
      messageText.includes("creator") ||
      messageText.includes("father") ||
      messageText.includes("who made you") ||
      messageText.includes("made you") ||
      messageText.includes("developer") ||
      messageText.includes("author")
    ) {
      await sendTelegramMessage(
        chatId,
        "👤 My creator is *Shashidhara K*, a student of NMAMIT Nitte MCA 1st year.",
        { parse_mode: "Markdown" }
      );
      return NextResponse.json({ ok: true });
    }

    // Contact info keywords
    if (
      messageText.includes("contact") ||
      messageText.includes("reach you") ||
      messageText.includes("email") ||
      messageText.includes("telegram") ||
      messageText.includes("get in touch")
    ) {
      await sendTelegramMessage(
        chatId,
        "📬 You can contact my creator:\n\n" +
          "📧 Email: shashidharak334@gmail.com\n" +
          "💬 Telegram: @shashi_kulal"
      );
      return NextResponse.json({ ok: true });
    }

    // Gemini AI fallback
    const aiReply = await getGeminiResponse(messageTextRaw);

    await sendTelegramMessage(chatId, aiReply);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bot error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// Helper: Send message to Telegram
async function sendTelegramMessage(chatId, text, extra = {}) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...extra,
    }),
  });
}

// Gemini AI call helper
async function getGeminiResponse(userMessage) {
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiRes.json();

    return geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I had an error processing your request.";
  }
}

// For health check if needed
export async function GET() {
  return NextResponse.json({ status: "Telegram bot webhook is running!" });
}
