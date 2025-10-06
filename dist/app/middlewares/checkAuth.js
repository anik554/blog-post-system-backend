"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const env_1 = require("../config/env");
const jwt_1 = require("../utils/jwt");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const checkAuth = (...authRoles) => {
    return async (req, res, next) => {
        try {
            const accessToken = req.headers.authorization || req.cookies.accessToken;
            if (!accessToken) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Token Not Received");
            }
            const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
            if (!authRoles.includes(verifiedToken.role)) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not permitted to view this route!!");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.checkAuth = checkAuth;
