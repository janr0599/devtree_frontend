import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../schemas";
import type { ProfileForm, User } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<User>(["user"])!;

    console.log(data);

    const defaultValues: ProfileForm = {
        handle: data.handle,
        description: data.description,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileForm>({
        defaultValues,
        resolver: zodResolver(profileSchema),
    });

    const handleUserProfileForm = async (
        formData: ProfileForm
    ): Promise<void> => {
        console.log(formData);
    };

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">
                Editar Información
            </legend>
            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle">Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle")}
                />
                {errors.handle && (
                    <ErrorMessage>{errors.handle.message}</ErrorMessage>
                )}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register("description")}
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={() => {}}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value="Guardar Cambios"
            />
        </form>
    );
}
