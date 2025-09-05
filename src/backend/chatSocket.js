import { Server } from 'socket.io';
import Support from './models/SupportModel.js';
import connectDB from './utils/db.js';

let io;

export default function initSocket(server) {
  if (io) return io; // prevent multiple instances

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // client sends a message
    socket.on('sendMessage', async ({ name, message, userid }) => {
      try {
        await connectDB();
        const newMsg = new Support({ name, message, userid: userid || 'SH10001' });
        await newMsg.save();

        // broadcast to everyone
        io.emit('newMessage', newMsg);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}
