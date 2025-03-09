import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../types";

function RegisterView() {
    const initialValues: RegisterForm = {
        name: "",
        email: "",
        handle: "",
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: initialValues });

    const handleRegister = async (formData: RegisterForm) => {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/register",
                formData
            );
            console.log(data.message);
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                console.log(error.response?.data.error);
            }
        }

        reset();
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
                        {...register("name", {
                            required: "El nombre es obligatorio",
                        })}
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
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "El email no es valido",
                            },
                        })}
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
                        {...register("handle", {
                            required: "El handle es obligatorio",
                        })}
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
                        {...register("password", {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message:
                                    "La contraseña debe tener al menos 8 caracteres",
                            },
                        })}
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
                        {...register("password_confirmation", {
                            required:
                                "La confirmación de password es obligatoria",
                            validate: (value) =>
                                value === watch("password") ||
                                "La confirmación de password no coincide",
                        })}
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
