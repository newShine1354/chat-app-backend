import dotenv from "dotenv";
import express from "express";
import route from "./routes/routes.js";
import connectDB from "./db/indes.js";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", route);

server.listen(port, () => {
  connectDB();
  console.log("server is running at port");
});
