import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const chatId = data.message?.chat?.id;
    const messageText = data.message?.text?.toLowerCase() || "";

    if (!chatId) {
      return NextResponse.json({ status: "no chat id" });
    }

    // 1️⃣ Keyword: Creator Info
    if (
      messageText.includes("creator") ||
      messageText.includes("father") ||
      messageText.includes("who made you")
    ) {
      await sendTelegramMessage(
        chatId,
        "I was created by *Shashidhara K*, a student of NMAMIT Nitte MCA 1st year."
      );
      return NextResponse.json({ ok: true });
    }

    // 2️⃣ Keyword: Contact Info
    if (messageText.includes("contact")) {
      await sendTelegramMessage(
        chatId,
        "📩 Contact me:\nEmail: shashidharak334@gmail.com\nTelegram: @shashi_kulal"
      );
      return NextResponse.json({ ok: true });
    }

    // 3️⃣ Gemini AI for all other messages
    const aiReply = await getGeminiResponse(messageText);

    await sendTelegramMessage(chatId, aiReply);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bot error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// 📌 Helper to send a Telegram message
async function sendTelegramMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown"
    })
  });
}

// 📌 Gemini API call
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
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    const geminiData = await geminiRes.json();

    return geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I had an error processing your request.";
  }
}
