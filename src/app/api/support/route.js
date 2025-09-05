import { sendMessage, getAllMessages } from '../../../backend/controllers/supportController.js';

export async function POST(req) {
  return await sendMessage(req);
}

export async function GET() {
  return await getAllMessages();
}
