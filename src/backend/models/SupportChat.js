import mongoose from "mongoose";

export const ADMIN_ID = process.env.SUPPORT_ADMIN_ID || "admin-global-id";

const messageSchema = new mongoose.Schema(
  {
    sender_id: { type: String, required: true }, // user id or ADMIN_ID
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {
      type: Number,
      enum: [1, 2, 3], // 1=sent, 2=delivered, 3=seen
      default: 1,
    },
  },
  { _id: false }
);

const supportChatSchema = new mongoose.Schema(
  {
    sender_name: { type: String, required: true }, // display name for user
    user_id: { type: String, required: true, index: true }, // stable user identifier
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true }
);

supportChatSchema.index({ user_id: 1 }, { unique: true });

export default mongoose.models.SupportChat ||
  mongoose.model("SupportChat", supportChatSchema);
