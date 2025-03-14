import { z } from "zod";
import {
    loginSchema,
    profilePictureSchema,
    profileSchema,
    registerSchema,
    userSchema,
} from "../schemas";

export type User = z.infer<typeof userSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type ProfilePicture = z.infer<typeof profilePictureSchema>;
