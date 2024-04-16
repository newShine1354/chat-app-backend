import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: ObjectId, required: true, ref: "user" },
    receiverId: { type: ObjectId, required: true, ref: "user" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("message", messageSchema);
