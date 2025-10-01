import AppError from "../../errorHelpers/AppError";
import { IAuthProviders, IUser } from "./user.interface";
import { User } from "./user.model";
import { StatusCodes } from "http-status-codes";

const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;
  const isUserExist = await User.findOne({email})
  if(isUserExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"User Already Exist")
  }
  const authProvider: IAuthProviders = {provider:"credentials", providerId: email as string}

  const user = await User.create({
    email,
    auth:[authProvider],
    ...rest
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
