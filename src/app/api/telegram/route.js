import { NextResponse } from "next/server";

// Example Movie database
const MOVIES = {
  "we can be heroes ep1": "https://t.me/webseriesang/213",
  "we can be heroes ep2": "https://t.me/webseriesang/214",
  "inception": "https://t.me/webseriesang/999",
  "avatar": "https://t.me/webseriesang/888",
  "movie 5": "https://t.me/webseriesang/111",
  "movie 6": "https://t.me/webseriesang/112",
  "movie 7": "https://t.me/webseriesang/113",
  "movie 8": "https://t.me/webseriesang/114",
  "movie 9": "https://t.me/webseriesang/115",
  "movie 10": "https://t.me/webseriesang/116",
  "movie 11": "https://t.me/webseriesang/117",
  "movie 12": "https://t.me/webseriesang/118",
  "movie 13": "https://t.me/webseriesang/119",
  "movie 14": "https://t.me/webseriesang/120",
  "movie 15": "https://t.me/webseriesang/121",
  "movie 16": "https://t.me/webseriesang/122"
};

// Store search results in memory (for pagination)
const searchSessions = {};

export async function POST(req) {
  try {
    const data = await req.json();

    // Handle callback queries (button clicks)
    if (data.callback_query) {
      const chatId = data.callback_query.message.chat.id;
      const queryData = data.callback_query.data;

      // Movie list page (full list)
      if (queryData.startsWith("show_movie_list_page_")) {
        const page = parseInt(queryData.split("_")[4] || "0", 10);
        await sendMovieList(chatId, page);
        return NextResponse.json({ ok: true });
      }

      // Search results page
      if (queryData.startsWith("search_page_")) {
        const [_, __, chatKey, pageStr] = queryData.split("_");
        const page = parseInt(pageStr, 10);
        const searchKey = `${chatId}_${chatKey}`;
        if (searchSessions[searchKey]) {
          await sendSearchResults(chatId, searchSessions[searchKey], chatKey, page);
        }
        return NextResponse.json({ ok: true });
      }

      // Movie selection
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

    // Normal text messages
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
            [{ text: "🎬 Movie List", callback_data: "show_movie_list_page_0" }],
            [{ text: "📢 Join Our Channel", url: "https://t.me/webseriesang" }]
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

    // Movies search command
    if (messageText.startsWith("$movies-") || messageText.startsWith("@shashiai_bot $movies-")) {
      const searchTerm = messageTextRaw.replace("@shashiai_bot", "").substring(8).trim().toLowerCase();
      const matches = Object.keys(MOVIES).filter((title) => title.includes(searchTerm));

      if (matches.length === 0) {
        await sendTelegramMessage(chatId, `❌ No movies found for "${searchTerm}"`);
      } else {
        // Store search in session
        const searchKey = Date.now().toString();
        searchSessions[`${chatId}_${searchKey}`] = matches;
        await sendSearchResults(chatId, matches, searchKey, 0);
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

// Paginated full movie list
async function sendMovieList(chatId, page = 0) {
  const movieTitles = Object.keys(MOVIES);
  await sendPaginatedList(chatId, movieTitles, page, "show_movie_list_page_");
}

// Paginated search results
async function sendSearchResults(chatId, matches, searchKey, page = 0) {
  await sendPaginatedList(chatId, matches, page, `search_page_${searchKey}_`);
}

// Generic pagination sender
async function sendPaginatedList(chatId, items, page, callbackPrefix) {
  const pageSize = 7;
  const start = page * pageSize;
  const paginated = items.slice(start, start + pageSize);

  const buttons = paginated.map((title) => [
    { text: title, callback_data: `movie_${title}` }
  ]);

  const navigationButtons = [];
  if (page > 0) navigationButtons.push({ text: "⬅ Prev", callback_data: `${callbackPrefix}${page - 1}` });
  if (start + pageSize < items.length)
    navigationButtons.push({ text: "Next ➡", callback_data: `${callbackPrefix}${page + 1}` });

  const extraButtons = [[{ text: "📢 Join Our Channel", url: "https://t.me/webseriesang" }]];

  await sendTelegramMessage(chatId, `📜 Results (Page ${page + 1}):`, {
    reply_markup: { inline_keyboard: [...buttons, navigationButtons, ...extraButtons] }
  });
}

// Send message to Telegram
async function sendTelegramMessage(chatId, text, extra = {}) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, ...extra })
  });
}

// Gemini AI
async function getGeminiResponse(userMessage) {
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] })
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
