import dotenv from "dotenv";
import express from "express";
import route from "./routes/routes.js";
import connectDB from "./db/indes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api", route);

app.listen(port, () => {
  connectDB();
  console.log("server is running at port");
});
