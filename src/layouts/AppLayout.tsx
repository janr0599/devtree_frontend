import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeApi";
import DevTree from "../components/DevTree";
import type { User } from "../types";

export default function AppLayout() {
    const { data, isLoading, isError } = useQuery<User>({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <Navigate to="/auth/login" />;
    }

    if (data) return <DevTree data={data} />;
}
