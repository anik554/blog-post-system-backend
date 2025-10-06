"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_interface_1 = require("../user/user.interface");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const creadentialsLogin = async (payload) => {
    console.log("payload", payload);
    const { email, password } = payload;
    const isUserExist = await user_model_1.User.findOne({ email }).lean();
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email does not exist");
    }
    const isPasswordMatch = await bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Incorrect Password");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_REFRESH_EXPIRED);
    delete isUserExist.password;
    return {
        accessToken,
        refreshToken,
        user: isUserExist
    };
};
const getNewAccessToken = async (refreshToken) => {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, env_1.envVars.JWT_REFRESH_SECRET);
    const isUserExist = await user_model_1.User.findOne({ email: verifiedRefreshToken.email });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User does not exist");
    }
    if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is Blocked");
    }
    if (isUserExist.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is Deleted");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    delete isUserExist.password;
    return {
        accessToken
    };
};
exports.AuthServices = {
    creadentialsLogin,
    getNewAccessToken
};
