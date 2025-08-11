// app/api/telegram/route.js
import { NextResponse } from "next/server";
import { Telegraf, Markup } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper to check if a message contains any keyword
function containsAny(message, keywords) {
  return keywords.some((kw) => message.includes(kw.toLowerCase()));
}

// Handle incoming messages
bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text.trim().toLowerCase();
    console.log("Incoming message:", userMessage);

    // 1️⃣ Creator-related responses
    if (
      containsAny(userMessage, [
        "creator",
        "father",
        "who made you",
        "made you",
        "your parent",
        "developer",
        "author",
        "inventor"
      ])
    ) {
      return await ctx.reply(
        "My creator is Shashidhara K, a student of NMAMIT Nitte MCA 1st year."
      );
    }

    // 2️⃣ Contact-related responses
    if (
      containsAny(userMessage, [
        "contact",
        "contact us",
        "reach you",
        "email",
        "telegram",
        "connect with you",
        "get in touch"
      ])
    ) {
      return await ctx.reply(
        "Here are my creator's contact options:",
        Markup.inlineKeyboard([
          [
            Markup.button.url(
              "📧 Email Shashidhara",
              "mailto:shashidharak334@gmail.com"
            ),
            Markup.button.url(
              "💬 Message on Telegram",
              "https://t.me/shashi_kulal"
            )
          ]
        ])
      );
    }

    // 3️⃣ Postman test mode — return Gemini reply directly
    if (ctx.chat.id === 123456789) {
      const result = await model.generateContent(userMessage);
      const aiReply = result.response.text();
      console.log("Gemini reply:", aiReply);
      return;
    }

    // 4️⃣ Normal Gemini AI response
    const result = await model.generateContent(userMessage);
    const aiReply = result.response.text();
    console.log("Gemini reply:", aiReply);
    await ctx.reply(aiReply);

  } catch (error) {
    console.error("Error handling message:", error);
    if (ctx.chat.id !== 123456789) {
      await ctx.reply("Sorry, I had an error processing your request.");
    }
  }
});

// Handle Telegram webhook POST
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook update:", JSON.stringify(body, null, 2));

    // Postman test mode — respond directly
    if (
      body.message &&
      body.message.chat &&
      body.message.chat.id === 123456789
    ) {
      const userMessage = body.message.text.trim().toLowerCase();

      // Custom responses in Postman too
      if (
        containsAny(userMessage, [
          "creator",
          "father",
          "who made you",
          "made you",
          "your parent",
          "developer",
          "author",
          "inventor"
        ])
      ) {
        return NextResponse.json({
          reply:
            "My creator is Shashidhara K, a student of NMAMIT Nitte MCA 1st year."
        });
      }

      if (
        containsAny(userMessage, [
          "contact",
          "contact us",
          "reach you",
          "email",
          "telegram",
          "connect with you",
          "get in touch"
        ])
      ) {
        return NextResponse.json({
          reply: "📧 shashidharak334@gmail.com | 💬 @shashi_kulal"
        });
      }

      // Otherwise Gemini
      const result = await model.generateContent(userMessage);
      const aiReply = result.response.text();
      return NextResponse.json({ reply: aiReply });
    }

    // Normal Telegram update
    await bot.handleUpdate(body);
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET route for testing if webhook is live
export async function GET() {
  return NextResponse.json({ status: "Telegram bot webhook is running!" });
}
