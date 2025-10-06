import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";

export const checkAuth = (...authRoles: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      if (!accessToken) {
        throw new AppError(StatusCodes.FORBIDDEN, "Token Not Received");
      }
      
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "You are not permitted to view this route!!"
        );
      }
      
      (req as JwtPayload).user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
};