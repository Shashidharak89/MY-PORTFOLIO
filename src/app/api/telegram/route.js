import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// When a message is received
bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text;

    // Send to Gemini AI
    const result = await model.generateContent(userMessage);
    const aiReply = result.response.text();

    // Reply back
    await ctx.reply(aiReply);
  } catch (error) {
    console.error("Gemini error:", error);
    await ctx.reply("Sorry, I had an error processing your request.");
  }
});

export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Telegram bot webhook is running!" });
}
