import { z } from "zod";
import { IsActive, Role } from "./user.interface";

const requiredString = (fieldName: string) =>
  z.string().refine((val) => val.trim().length > 0, {
    message: `${fieldName} is required`,
  });

export const createUserZodSchema = z.object({
  name: requiredString("Name")
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: requiredString("Email")
    .email("Invalid email address format.")
    .min(2, { message: "Email must be at least 2 characters long" })
    .max(50, { message: "Email cannot exceed 50 characters." }),

  password: requiredString("Password")
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Password must contain at least 1 special character",
    }),

  phone: z
    .string()
    .refine((val) => val === "" || /^(?:\+8801\d{9}|01\d{9})$/.test(val), {
      message:
        "Phone Number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  address: z
    .string()
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),

  email: z
    .string()
    .email("Invalid email address format.")
    .min(2, { message: "Email must be at least 2 characters long" })
    .max(50, { message: "Email cannot exceed 50 characters." })
    .optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Password must contain at least 1 special character",
    })
    .optional(),

  role: z.enum(Object.values(Role) as [string, ...string[]]).optional(),

  isActive: z.enum(Object.values(IsActive) as [string, ...string[]]).optional(),

  isDelete: z
    .boolean()
    .refine((val) => typeof val === "boolean", {
      message: "isDeleted must be true or false",
    })
    .optional(),

  isVerified: z
    .boolean()
    .refine((val) => typeof val === "boolean", {
      message: "isVerified must be true or false",
    })
    .optional(),

  phone: z
    .string()
    .refine((val) => val === "" || /^(?:\+8801\d{9}|01\d{9})$/.test(val), {
      message:
        "Phone Number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  address: z
    .string()
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});
