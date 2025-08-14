import { NextResponse } from "next/server";

// Movie list with links
const MOVIES = {
  "we can be heroes": "https://t.me/webseriesang/213",
  "inception": "https://t.me/webseriesang/999", // Example
  "avatar": "https://t.me/webseriesang/888" // Example
};

export async function POST(req) {
  try {
    const data = await req.json();

    // Handle callback queries (button clicks)
    if (data.callback_query) {
      const chatId = data.callback_query.message.chat.id;
      const movieKey = data.callback_query.data;

      if (MOVIES[movieKey]) {
        await sendTelegramMessage(chatId, `🎬 Here’s your link: ${MOVIES[movieKey]}`);
      } else {
        await sendTelegramMessage(chatId, "❌ Sorry, that movie is not available.");
      }

      return NextResponse.json({ ok: true });
    }

    const chatId = data.message?.chat?.id;
    const messageTextRaw = data.message?.text || "";
    const messageText = messageTextRaw.toLowerCase();

    if (!chatId) {
      return NextResponse.json({ status: "no chat id" });
    }

    // /start command: Show intro with buttons
    if (messageText === "/start") {
      const welcomeMsg =
        "👋 Welcome! I am your AI-powered Telegram bot.\n\n" +
        "You can try these commands:\n" +
        "/start - Show this introduction\n" +
        "$movies-<movie or web series name> - to get the download link\n" +
        "Ask me who is my creator!\n" +
        "Say 'contact' to get creator's contact info.\n" +
        "Or just type anything else and I'll reply using AI.";

      await sendTelegramMessage(chatId, welcomeMsg, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📥 Search Movie",
                switch_inline_query_current_chat: "$movies-"
              }
            ],
            [
              {
                text: "🎬 Movie List",
                callback_data: "show_movie_list"
              }
            ]
          ]
        }
      });

      return NextResponse.json({ ok: true });
    }

    // Movie list button clicked
    if (messageText === "show_movie_list") {
      const movieButtons = Object.keys(MOVIES).map((title) => [
        { text: title, callback_data: title.toLowerCase() }
      ]);

      await sendTelegramMessage(chatId, "📜 Available Movies:", {
        reply_markup: { inline_keyboard: movieButtons }
      });
      return NextResponse.json({ ok: true });
    }

    // Creator info
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

    // Contact info
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

    // Movies command: $movies-
    if (messageText.startsWith("$movies-")) {
      const movieName = messageTextRaw.substring(8).trim().toLowerCase();
      if (MOVIES[movieName]) {
        await sendTelegramMessage(chatId, `🎬 Here’s your link: ${MOVIES[movieName]}`);
      } else {
        await sendTelegramMessage(chatId, `❌ Sorry, I don't have the movie "${movieName}" in my list.`);
      }
      return NextResponse.json({ ok: true });
    }

    // AI fallback
    const aiReply = await getGeminiResponse(messageTextRaw);
    await sendTelegramMessage(chatId, aiReply);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bot error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// Send Telegram message
async function sendTelegramMessage(chatId, text, extra = {}) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...extra
    })
  });
}

// Gemini AI call
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
    return geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I had an error processing your request.";
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "Telegram bot webhook is running!" });
}
