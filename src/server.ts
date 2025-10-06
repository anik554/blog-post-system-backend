
/// <reference types="node" />
/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedAdmin } from "./app/utils/seedAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!!");
    server = app.listen(envVars.PORT, () => {
      console.log("Server is listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedAdmin();
})();

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
