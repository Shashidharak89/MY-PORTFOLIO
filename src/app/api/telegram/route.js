import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Hello from my portfolio webhook 🚀"));
bot.on("text", (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
  } catch (err) {
    console.error("Error handling Telegram update:", err);
  }
  return new Response("OK", { status: 200 });
}

export async function GET() {
  return new Response("Telegram bot webhook is running!", { status: 200 });
}
