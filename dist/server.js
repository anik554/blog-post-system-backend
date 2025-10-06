"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const seedAdmin_1 = require("./app/utils/seedAdmin");
let server;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("Connected to DB!!");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log("Server is listening to port 5000");
        });
    }
    catch (error) {
        console.log(error);
    }
};
(async () => {
    await startServer();
    await (0, seedAdmin_1.seedAdmin)();
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
