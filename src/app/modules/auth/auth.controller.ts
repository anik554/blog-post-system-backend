/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

const creadentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.creadentialsLogin(req.body);
    setAuthCookie(res,loginInfo)
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Logged in successfully",
      data: loginInfo,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      throw new AppError(StatusCodes.BAD_REQUEST, "No refresh token recieved from cookies")
    }
    
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
    setAuthCookie(res,tokenInfo)
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Retrived New Access Token Successfully",
      data: tokenInfo,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken",{
      httpOnly: true,
      secure:false,
      sameSite: "lax"
    })
    res.clearCookie("refreshToken",{
      httpOnly: true,
      secure:false,
      sameSite: "lax"
    })
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Logged Out Successfully",
      data: null
    });
  }
);

export const AuthControllers = {
  creadentialsLogin,
  getNewAccessToken,
  logout
};
