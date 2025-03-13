import { isAxiosError } from "axios";
import type { ProfileForm, User } from "../types";
import api from "../config/axios";
import { userSchema } from "../schemas";

export const getUser = async (): Promise<User> => {
    try {
        // Fetch user data from the API
        const { data } = await api<{ user: User }>("/user");

        // Validate the received data
        const validation = userSchema.safeParse(data.user);
        if (validation.success) {
            return validation.data;
        }

        // Throw error if validation fails
        throw new Error("Validation failed");
    } catch (error) {
        // Handle Axios-specific errors
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

        // Handle any other unexpected errors
        throw new Error("An unexpected error occurred");
    }
};

export const updateProfile = async (formData: ProfileForm): Promise<string> => {
    try {
        // Send the updated user data to the API
        const { data } = await api.patch<{ message: string }>(
            "/user",
            formData
        );

        // return the received message
        return data.message;
    } catch (error) {
        // Handle Axios-specific errors
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

        // Handle any other unexpected errors
        throw new Error("An unexpected error occurred");
    }
};
