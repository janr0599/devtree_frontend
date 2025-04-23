import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./ErrorMessage";
import { useForm } from "react-hook-form";
import { searchHandleForm } from "../types";
import { searchHandleSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import slugify from "react-slugify";
import { checkHandleAvailability } from "../api/DevTreeApi";
import { Link } from "react-router-dom";

function SearchForm() {
    const defaultValues: searchHandleForm = {
        handle: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<searchHandleForm>({
        defaultValues,
        resolver: zodResolver(searchHandleSchema),
    });

    const mutation = useMutation({
        mutationFn: checkHandleAvailability,
    });

    const handle = watch("handle");

    const handleSearch = () => {
        const slug = slugify(handle);
        mutation.mutate(slug);
    };

    console.log(mutation);

    return (
        <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
                <label htmlFor="handle">devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="tuhandle"
                    {...register("handle")}
                />
            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="my-5">
                {mutation.isPending && (
                    <p className="text-slate-500 text-center">Buscando..</p>
                )}
                {mutation.error && (
                    <p className="text-red-500 text-center font-black">
                        {mutation.error.message}
                    </p>
                )}
                {mutation.data && (
                    <p className="text-cyan-500 text-center font-black">
                        {mutation.data}. Ir a{" "}
                        <Link
                            to={`/auth/register`}
                            state={{ handle: slugify(handle) }}
                            className="underline"
                        >
                            Registro
                        </Link>
                    </p>
                )}
            </div>

            <input
                type="submit"
                className="bg-cyan-300 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-400 transition-colors"
                value="Obtener mi DevTree"
            />
        </form>
    );
}

export default SearchForm;
