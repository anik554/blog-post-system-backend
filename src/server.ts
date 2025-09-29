import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anikimtiaz:anikimtiaz@cluster0.irbpcqo.mongodb.net/blog-post-system?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to DB!!");

    server = app.listen(5000, () => {
      console.log("Server is listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandle Rejection Detected ...Server Shuthing Down", err);
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("uncaught Exception Detected ...Server Shuthing Down", err);
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Signal Received ...Server Shuthing Down");
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT Signal Received ...Server Shuthing Down");
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});
