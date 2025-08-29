import { updateMessageStatus } from "../../../../backend/controllers/supportController.js";

export async function PATCH(req) {
  return updateMessageStatus(req);
}
