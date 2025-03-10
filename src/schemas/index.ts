import { z } from "zod";

export const baseUserSchema = z.object({
    name: z.string().nonempty("El nombre es obligatorio"),
    email: z
        .string()
        .nonempty("el email es obligatorio")
        .email("El email es inválido"),
    handle: z.string().nonempty("El handle es obligatorio"),
    password: z
        .string()
        .nonempty("El password es obligatorio")
        .min(8, "El password debe tener al menos 8 caracteres"),
});

export const userSchema = baseUserSchema.pick({
    name: true,
    email: true,
    handle: true,
});

export const registerSchema = baseUserSchema
    .extend({
        password_confirmation: z
            .string()
            .nonempty("La confirmación de password es obligatoria"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "La confirmación de password no coincide",
        path: ["password_confirmation"],
    });

export const loginSchema = baseUserSchema
    .pick({
        email: true,
        password: true,
    })
    .extend({
        password: z.string().nonempty("El password es obligatorio"),
    });
