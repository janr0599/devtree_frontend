import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import type { RegisterForm } from "../types";
import api from "../config/axios";
import { registerSchema } from "../schemas";

function RegisterView() {
    const defaultValues: RegisterForm = {
        name: "",
        email: "",
        handle: "",
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterForm>({
        defaultValues,
        resolver: zodResolver(registerSchema),
    });

    const handleRegister = async (formData: RegisterForm): Promise<void> => {
        try {
            const { data } = await api.post<{ message: string }>(
                "/auth/register",
                formData
            );
            toast.success(data.message);
            reset();
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <>
            <h1 className="text-4xl text-white font-bold">Registro</h1>

            <form
                noValidate
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="name"
                        className="text-lg md:text-xl text-slate-500"
                    >
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("name")}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="email"
                        className="text-lg md:text-xl text-slate-500"
                    >
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email")}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="handle"
                        className="text-lg md:text-xl text-slate-500"
                    >
                        Handle
                    </label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("handle")}
                    />
                    {errors.handle && (
                        <ErrorMessage>{errors.handle.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="password"
                        className="text-lg md:text-xl text-slate-500"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password")}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="password_confirmation"
                        className="text-lg md:text-xl text-slate-500"
                    >
                        Repetir Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password_confirmation")}
                    />
                    {errors.password_confirmation && (
                        <ErrorMessage>
                            {errors.password_confirmation.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-300 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-400 transition-colors"
                    value="Crear Cuenta"
                />
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    to="/auth/login"
                >
                    Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    );
}

export default RegisterView;
