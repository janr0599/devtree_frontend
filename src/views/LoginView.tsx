import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { LoginForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

function LoginView() {
    const initialValues = {
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({ defaultValues: initialValues });

    const handleLogin = async (formData: LoginForm): Promise<void> => {
        try {
            const { data } = await api.post<{ token: string }>(
                "/auth/login",
                formData
            );
            localStorage.setItem("AUTH_TOKEN_DEVTREE", data.token);
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <>
            <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
                noValidate
            >
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
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
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
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-300 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-400 transition-colors"
                    value="Iniciar Sesión"
                />
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    to="/auth/register"
                >
                    No tienes cuenta? Regístrate
                </Link>
            </nav>
        </>
    );
}

export default LoginView;
