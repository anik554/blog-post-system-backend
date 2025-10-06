"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
const requiredString = (fieldName) => zod_1.z.string().refine((val) => val.trim().length > 0, {
    message: `${fieldName} is required`,
});
exports.createUserZodSchema = zod_1.z.object({
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
    phone: zod_1.z
        .string()
        .refine((val) => val === "" || /^(?:\+8801\d{9}|01\d{9})$/.test(val), {
        message: "Phone Number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
});
exports.updateUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .optional(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: "Password must contain at least 1 special character",
    })
        .optional(),
    role: zod_1.z.enum(Object.values(user_interface_1.Role)).optional(),
    isActive: zod_1.z.enum(Object.values(user_interface_1.IsActive)).optional(),
    isDelete: zod_1.z
        .boolean()
        .refine((val) => typeof val === "boolean", {
        message: "isDeleted must be true or false",
    })
        .optional(),
    isVerified: zod_1.z
        .boolean()
        .refine((val) => typeof val === "boolean", {
        message: "isVerified must be true or false",
    })
        .optional(),
    phone: zod_1.z
        .string()
        .refine((val) => val === "" || /^(?:\+8801\d{9}|01\d{9})$/.test(val), {
        message: "Phone Number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
});
