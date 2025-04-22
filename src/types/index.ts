import { z } from "zod";
import {
    devTreeLink,
    loginSchema,
    profilePictureSchema,
    profileSchema,
    registerSchema,
    socialNetworkSchema,
    userSchema,
    userHandleSchema,
} from "../schemas";

export type User = z.infer<typeof userSchema>;
export type UserHandle = z.infer<typeof userHandleSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type ProfilePicture = z.infer<typeof profilePictureSchema>;
export type SocialNetwork = z.infer<typeof socialNetworkSchema>;
export type DevTreeLink = z.infer<typeof devTreeLink>;
