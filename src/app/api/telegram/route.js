import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create the bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper to detect if message contains any keyword
function containsAny(message, keywords) {
  return keywords.some((kw) => message.includes(kw.toLowerCase()));
}

// Handle all text messages
bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text.trim().toLowerCase();
    const chatId = ctx.chat.id;

    // === Custom Responses ===
    // Creator info
    if (
      containsAny(userMessage, [
        "your creator",
        "your father",
        "who made you",
        "made you",
        "your parent",
        "your developer",
        "your author",
        "your inventor"
      ])
    ) {
      return await bot.telegram.sendMessage(
        chatId,
        "My creator is *Shashidhara K*, a student of NMAMIT Nitte.",
        { parse_mode: "Markdown" }
      );
    }

    // Contact info without buttons
    if (
      containsAny(userMessage, [
        "want to contact",
        "contact us",
        "reach you",
        "your email",
        "your telegram id",
        "connect with you",
        "get in touch"
      ])
      
    ) {
      return await bot.telegram.sendMessage(
        chatId,
        "📬 You can contact my creator here:\n\n" +
        "📧 Email: [shashidharak334@gmail.com](mailto:shashidharak334@gmail.com)\n" +
        "💬 Telegram: [@shashi_kulal](https://t.me/shashi_kulal)",
        { parse_mode: "Markdown" }
      );
    }

    // === Gemini AI fallback ===
    const result = await model.generateContent(userMessage);
    const aiReply = result.response.text();
    await bot.telegram.sendMessage(chatId, aiReply || "I couldn't think of a reply just now.");

  } catch (error) {
    console.error("Error handling message:", error);
    if (ctx.chat?.id) {
      await bot.telegram.sendMessage(
        ctx.chat.id,
        "Sorry, I had an error processing your request."
      );
    }
  }
});

// Handle Telegram webhook POST
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Simple GET route for health check
export async function GET() {
  return NextResponse.json({ status: "Telegram bot webhook is running!" });
}
