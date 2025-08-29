import { adminSendMessage } from "../../../../backend/controllers/supportController.js";

export async function POST(req) {
  return adminSendMessage(req);
}
