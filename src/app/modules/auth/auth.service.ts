import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import bcryptjs from "bcryptjs";
import { IsActive, IUser } from "../user/user.interface";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const creadentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email }).lean();

  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect Password");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email:isUserExist.email,
    role: isUserExist.role
  }

  const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
  const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_EXPIRED)

  delete isUserExist.password

  return {
    accessToken,
    refreshToken,
    user: isUserExist
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload
 
  const isUserExist = await User.findOne({ email:  verifiedRefreshToken.email});

  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
  }

  if (isUserExist.isActive === IsActive.BLOCKED) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is Blocked");
  }

  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is Deleted");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email:isUserExist.email,
    role: isUserExist.role
  }

  const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)

  delete isUserExist.password

  return {
    accessToken
  };
};

export const AuthServices = {
  creadentialsLogin,
  getNewAccessToken
};
