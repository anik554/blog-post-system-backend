import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routers";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to blog post system bankend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
