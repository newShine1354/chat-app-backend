import { messageModel } from "../model/messageModel.js";
import { conversationModel } from "../model/conversationModel.js";
import { userModel } from "../model/userModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    // Authentication flow
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    const recieverSocketId = getRecieverSocketId(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).send({
      message: "Message sent successfully.",
      newMessage,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages"); // messageData instead of messageId.
    if (!conversation) {
      return res.status(200).send([]);
    }

    res.status(200).send({
      message: "Messages fetched successfully.",
      messages: conversation.messages || [],
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};
export { sendMessage, getMessages };
