"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = require("./app/routers");
const globalErrorHandlers_1 = require("./app/middlewares/globalErrorHandlers");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./app/config/env");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const allowedOrigins = [
    "http://localhost:5000",
    "https://blog-post-system-frontend-6in0pk2pc-aniks-projects-d10b87e1.vercel.app",
    env_1.envVars.FRONTEND_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api/v1", routers_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to blog post system bankend",
    });
});
app.use(globalErrorHandlers_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
