import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const chatId = data.message?.chat?.id;
    const messageText = data.message?.text || "";

    if (!chatId) {
      return NextResponse.json({ status: "no chat id" });
    }

    // Simple echo to check bot works
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `You said: ${messageText}`
      })
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bot error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
