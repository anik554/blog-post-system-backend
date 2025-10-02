/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IAuthProviders, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ email: envVars.ADMIN_EMAIL });
    if (isAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }
    console.log("Trying to create Admin User...");
    const hashedPassword = await bcrypt.hash(
      envVars.ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
    const authProvider: IAuthProviders = {
      provider: "credentials",
      providerId: envVars.ADMIN_EMAIL,
    };
    const payload: IUser = {
      name: "Admin User",
      role: Role.ADMIN,
      email: envVars.ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auth: [authProvider],
    };
    const admin = await User.create(payload);
    console.log("Admin User Created Successfully! \n");
    console.log(admin);
  } catch (error) {
    console.log(error);
  }
};
