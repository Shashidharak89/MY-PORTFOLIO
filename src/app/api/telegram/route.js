// app/api/telegram/route.js
import { NextResponse } from "next/server";
import { Telegraf, Markup } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Flexible keyword matching
function containsAny(text, keywords) {
  return keywords.some((word) => text.includes(word));
}

bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text.trim().toLowerCase();
    console.log("Incoming message:", userMessage);

    // 1️⃣ Creator keywords
    if (
      containsAny(userMessage, [
        "creator",
        "father",
        "who made you",
        "made you",
        "your parent"
      ])
    ) {
      return await ctx.reply(
        "My creator is Shashidhara K, a student of NMAMIT Nitte MCA 1st year."
      );
    }

    // 2️⃣ Contact keywords
    if (
      containsAny(userMessage, [
        "contact",
        "reach you",
        "email",
        "telegram",
        "connect with you"
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

    // 3️⃣ Otherwise, Gemini AI
    const result = await model.generateContent(ctx.message.text);
    const aiReply = result.response.text();
    await ctx.reply(aiReply);

  } catch (error) {
    console.error("Gemini error:", error);
    await ctx.reply("Sorry, I had an error processing your request.");
  }
});

// POST: Handle Telegram webhook
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook update:", JSON.stringify(body, null, 2));

    // Test mode for Postman
    if (body.message && body.message.chat?.id === 123456789) {
      const msg = body.message.text.trim().toLowerCase();

      if (
        containsAny(msg, [
          "creator",
          "father",
          "who made you",
          "made you",
          "your parent"
        ])
      ) {
        return NextResponse.json({
          reply:
            "My creator is Shashidhara K, a student of NMAMIT Nitte MCA 1st year."
        });
      }
      if (
        containsAny(msg, [
          "contact",
          "reach you",
          "email",
          "telegram",
          "connect with you"
        ])
      ) {
        return NextResponse.json({
          reply:
            "📧 Email: shashidharak334@gmail.com\n💬 Telegram: @shashi_kulal"
        });
      }

      const result = await model.generateContent(body.message.text);
      const aiReply = result.response.text();
      return NextResponse.json({ reply: aiReply });
    }

    await bot.handleUpdate(body);
    return NextResponse.json({ status: "ok" });

  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Optional GET
export async function GET() {
  return NextResponse.json({ status: "Telegram bot webhook is running!" });
}
