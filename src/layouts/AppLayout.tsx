import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeApi";
import DevTree from "../components/DevTree";

export default function AppLayout() {
    const { data, isLoading, isError } = useQuery({
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

    console.log(data);

    if (data) return <DevTree data={data} />;
}
