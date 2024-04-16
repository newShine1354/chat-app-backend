import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: ObjectId, ref: "user" }],
    messages: [{ type: ObjectId, ref: "message", default: [] }],
  },
  { timestamps: true }
);
export const conversationModel = mongoose.model(
  "conversation",
  conversationSchema
);
