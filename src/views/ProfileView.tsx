import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { profileSchema } from "../schemas";
import type { ProfileForm, ProfilePicture, User } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { updateProfile, uploadProfilePicture } from "../api/DevTreeApi";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<User>(["user"])!;

    const defaultValues: ProfileForm = {
        handle: data.handle,
        description: data.description,
        image: data.description,
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProfileForm>({
        defaultValues,
        resolver: zodResolver(profileSchema),
    });

    // Watch the current form values
    const watchedValues = watch();

    // Check if the form has changes to enable submit button
    const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(defaultValues);

    // Mutation to update the user profile
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (mesage: string) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            reset(); //reset form to compare values again and disable button after successfull update
            toast.success(mesage);
        },
    });

    const handleUserProfileForm = (formData: ProfileForm) => {
        updateProfileMutation.mutate(formData);
    };

    //Mutation to upload profile picture
    const uploadProfilePictureMutation = useMutation({
        mutationFn: uploadProfilePicture,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (data: ProfilePicture) => {
            queryClient.setQueryData(["user"], (prevData: User) => {
                return { ...prevData, image: data.image };
            });
            toast.success(data.message);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadProfilePictureMutation.mutate(e.target.files[0]);
        }
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
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className={`bg-cyan-300 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold ${
                    hasChanges
                        ? "hover:bg-cyan-400 hover:cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                } transition-colors`}
                value="Guardar Cambios"
                disabled={!hasChanges}
            />
        </form>
    );
}
