import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routers";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import path from "path";


const app = express();

app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5000",
  "https://blog-post-backend-p1u2dwt3n-aniks-projects-d10b87e1.vercel.app/api/v1",
  envVars.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to blog post system bankend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
