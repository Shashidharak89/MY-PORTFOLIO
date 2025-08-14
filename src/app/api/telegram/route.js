import { NextResponse } from "next/server";

// Movie database (title: link)
const MOVIES = {
  "we can be heroes ep1": "https://t.me/webseriesang/213",
  "we can be heroes ep2": "https://t.me/webseriesang/214",
  "inception": "https://t.me/webseriesang/999",
  "avatar": "https://t.me/webseriesang/888"
};

export async function POST(req) {
  try {
    const data = await req.json();

    // Handle button clicks (callback queries)
    if (data.callback_query) {
      const chatId = data.callback_query.message.chat.id;
      const queryData = data.callback_query.data;

      // Show movie list
      if (queryData === "show_movie_list") {
        const movieButtons = Object.keys(MOVIES).map((title) => [
          { text: title, callback_data: `movie_${title}` }
        ]);
        await sendTelegramMessage(chatId, "📜 Available Movies:", {
          reply_markup: { inline_keyboard: movieButtons }
        });
        return NextResponse.json({ ok: true });
      }

      // Handle specific movie click
      if (queryData.startsWith("movie_")) {
        const movieKey = queryData.replace("movie_", "");
        if (MOVIES[movieKey]) {
          await sendTelegramMessage(chatId, `🎬 Here’s your link: ${MOVIES[movieKey]}`);
        } else {
          await sendTelegramMessage(chatId, "❌ Sorry, that movie is not available.");
        }
        return NextResponse.json({ ok: true });
      }
    }

    const chatId = data.message?.chat?.id;
    const messageTextRaw = data.message?.text || "";
    const messageText = messageTextRaw.toLowerCase();

    if (!chatId) {
      return NextResponse.json({ status: "no chat id" });
    }

    // Start command
    if (messageText === "/start") {
      const welcomeMsg =
        "👋 Welcome! I am your AI-powered Telegram bot.\n\n" +
        "Commands:\n" +
        "/start - Show this introduction\n" +
        "$movies-<movie/series name> - Search and download\n" +
        "Ask 'who is my creator'\n" +
        "Say 'contact' to get my creator's info";

      await sendTelegramMessage(chatId, welcomeMsg, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "📥 Search Movie", switch_inline_query_current_chat: "$movies-" }
            ],
            [
              { text: "🎬 Movie List", callback_data: "show_movie_list" }
            ]
          ]
        }
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
        "📬 Contact my creator:\n" +
          "📧 Email: shashidharak334@gmail.com\n" +
          "💬 Telegram: @shashi_kulal"
      );
      return NextResponse.json({ ok: true });
    }

    // Movies command
    if (messageText.startsWith("$movies-")) {
      const searchTerm = messageTextRaw.substring(8).trim().toLowerCase();
      const matches = Object.keys(MOVIES).filter((title) => title.includes(searchTerm));

      if (matches.length === 0) {
        await sendTelegramMessage(chatId, `❌ No movies found for "${searchTerm}"`);
      } else if (matches.length === 1) {
        await sendTelegramMessage(chatId, `🎬 Here’s your link: ${MOVIES[matches[0]]}`);
      } else {
        const movieButtons = matches.map((title) => [
          { text: title, callback_data: `movie_${title}` }
        ]);
        await sendTelegramMessage(chatId, `📜 Found ${matches.length} results:`, {
          reply_markup: { inline_keyboard: movieButtons }
        });
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
    body: JSON.stringify({ chat_id: chatId, text, ...extra })
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
          contents: [{ parts: [{ text: userMessage }] }]
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
