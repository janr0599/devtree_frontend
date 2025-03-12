import { z } from "zod";
import {
    loginSchema,
    profileSchema,
    registerSchema,
    userSchema,
} from "../schemas";

export type User = z.infer<typeof userSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
