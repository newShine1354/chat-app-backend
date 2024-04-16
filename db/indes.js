import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected with mongodb");
  } catch (error) {
    console.log(error?.message, "error while connecting with db.");
  }
};

export default connectDB;
