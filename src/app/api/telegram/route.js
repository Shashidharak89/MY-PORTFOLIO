// app/api/telegram/route.js
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Telegram message handler
bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text;
    console.log("Incoming message:", userMessage);

    // Get Gemini reply
    const result = await model.generateContent(userMessage);
    const aiReply = result.response.text();
    console.log("Gemini reply:", aiReply);

    // Detect Postman test (fake chat ID)
    if (ctx.chat.id === 123456789) {
      console.log("Postman test detected — skipping Telegram reply");
    } else {
      await ctx.reply(aiReply);
    }
  } catch (error) {
    console.error("Gemini error:", error);
    if (ctx.chat.id !== 123456789) {
      await ctx.reply("Sorry, I had an error processing your request.");
    }
  }
});

// Handle POST requests from Telegram webhook
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook update:", JSON.stringify(body, null, 2));

    // Postman test mode: return Gemini reply directly
    if (
      body.message &&
      body.message.chat &&
      body.message.chat.id === 123456789
    ) {
      const userMessage = body.message.text;
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

// Optional GET route to verify it's live
export async function GET() {
  return NextResponse.json({ status: "Telegram bot webhook is running!" });
}
