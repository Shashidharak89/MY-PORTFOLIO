import connectDB from "../utils/db.js";
import SupportChat, { ADMIN_ID } from "../models/SupportChat.js";

// helper: generate 10-char random ID
const generateUserId = () => {
  return Math.random().toString(36).substring(2, 12); // 10 chars
};

/**
 * POST /api/support
 * Body: { sender_name, sender_id, message, user_id? }
 * - If user_id missing → generate a new 10-char user_id
 * - Persists user message into conversation
 */
export const sendMessage = async (req) => {
  try {
    await connectDB();
    const { sender_name, sender_id, message, user_id } = await req.json();

    if (!sender_name || !sender_id || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // use existing user_id or generate a new one
    const finalUserId = user_id || generateUserId();

    const msg = {
      sender_id,
      message,
      status: 1, // sent
      createdAt: new Date(),
    };

    const chat = await SupportChat.findOneAndUpdate(
      { user_id: finalUserId },
      {
        $setOnInsert: { sender_name, user_id: finalUserId },
        $push: { messages: msg },
      },
      { new: true, upsert: true }
    );

    return Response.json({ success: true, chat }, { status: 201 });
  } catch (err) {
    console.error("sendMessage error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};

/**
 * GET /api/support?user_id=...          -> get a single chat (user)
 * GET /api/support?admin=1              -> admin view: list all chats (summary)
 */
export const getChats = async (req) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");
    const user_id = searchParams.get("user_id");

    if (admin) {
      // Admin: list all chats with last message
      const chats = await SupportChat.find({})
        .select("user_id sender_name messages")
        .lean();

      const summaries = chats.map((c) => {
        const last = c.messages?.[c.messages.length - 1] || null;
        return {
          _id: c._id, // expose for admin use
          user_id: c.user_id,
          sender_name: c.sender_name,
          last_message: last?.message || null,
          last_status: last?.status || null,
          last_at: last?.createdAt || null,
          total_messages: c.messages?.length || 0,
        };
      });

      return Response.json({ admin_id: ADMIN_ID, chats: summaries }, { status: 200 });
    }

    if (!user_id) {
      return Response.json({ error: "user_id is required" }, { status: 400 });
    }

    const chat = await SupportChat.findOne({ user_id }).lean();
    if (!chat) return Response.json({ message: "No chat found" }, { status: 404 });

    return Response.json(chat, { status: 200 });
  } catch (err) {
    console.error("getChats error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};

/**
 * PATCH /api/support/status
 * Body: { user_id, index, status }   // update a specific message status (2=delivered, 3=seen)
 */
export const updateMessageStatus = async (req) => {
  try {
    await connectDB();
    const { user_id, index, status } = await req.json();

    if (!user_id || typeof index !== "number" || ![2, 3].includes(status)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    const chat = await SupportChat.findOne({ user_id });
    if (!chat) return Response.json({ error: "Chat not found" }, { status: 404 });

    if (!chat.messages[index]) {
      return Response.json({ error: "Message index out of range" }, { status: 400 });
    }

    chat.messages[index].status = status;
    await chat.save();

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("updateMessageStatus error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};

/**
 * POST /api/support/admin
 * Body: { chat_id, message }
 * - Allows admin to send message directly by chat document _id
 */
export const adminSendMessage = async (req) => {
  try {
    await connectDB();
    const { chat_id, message } = await req.json();

    if (!chat_id || !message) {
      return Response.json({ error: "chat_id and message are required" }, { status: 400 });
    }

    const msg = {
      sender_id: ADMIN_ID,
      message,
      status: 1,
      createdAt: new Date(),
    };

    const chat = await SupportChat.findByIdAndUpdate(
      chat_id,
      { $push: { messages: msg } },
      { new: true }
    );

    if (!chat) return Response.json({ error: "Chat not found" }, { status: 404 });

    return Response.json({ success: true, chat }, { status: 201 });
  } catch (err) {
    console.error("adminSendMessage error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};
