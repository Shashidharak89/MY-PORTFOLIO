import { sendMessage, getChats } from "../../../backend/controllers/supportController.js";

export async function POST(req) {
  return sendMessage(req);
}

export async function GET(req) {
  return getChats(req);
}
