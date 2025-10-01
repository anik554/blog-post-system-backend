import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IAuthProviders {
  provider: "credentials" | "google";
  providerId: string;
}

export enum IsActive {
  "ACTIVE" = "ACTIVE",
  "INACTIVE" = "INACTIVE",
  "BLOCKED" = "BLOCKED",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;
  auth: IAuthProviders[];
  orders?: Types.ObjectId[];
}