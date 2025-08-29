import { Server } from "socket.io";
import connectDB from "./db.js";
import SupportChat from "./models/SupportChat.js"; // your chat model

let io;

export const initSocket = (server) => {
  if (io) return io; // prevent reinitialization

  io = new Server(server, {
    cors: {
      origin: "*", // you can restrict to your frontend domain
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // handle sending messages
    socket.on("sendMessage", async ({ sender_name, sender_id, message }) => {
      try {
        await connectDB();

        let chat = await SupportChat.findOne({ sender_name });
        if (!chat) {
          chat = new SupportChat({
            sender_name,
            messages: [{ sender_id, message }],
          });
        } else {
          chat.messages.push({ sender_id, message });
        }

        await chat.save();

        // Emit to everyone (admin + users)
        io.emit("newMessage", { sender_name, sender_id, message });
      } catch (err) {
        console.error("Socket message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
