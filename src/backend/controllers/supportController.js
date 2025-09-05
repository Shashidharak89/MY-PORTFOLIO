import Support from '../models/SupportModel.js';
import connectDB from '../utils/db.js';

// POST: send message
export const sendMessage = async (req) => {
  try {
    await connectDB();
    const { name, message, userid } = await req.json();

    if (!name || !message) {
      return new Response(JSON.stringify({ error: 'Name and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // default userid if not provided
    const userIdToSave = userid || 'SH10001';

    const newMessage = new Support({
      name,
      message,
      userid: userIdToSave,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message sent successfully', newMessage }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET: get all messages
export const getAllMessages = async () => {
  try {
    await connectDB();
    const messages = await Support.find().sort({ timestamp: 1 }); // oldest first
    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
