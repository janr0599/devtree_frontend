import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeApi";
import type { UserHandle } from "../types";
import HandleData from "../components/HandleData";

function HandleView() {
    const params = useParams();
    const handle = params.handle!;

    // Query user by handle
    const { data, isLoading, isError } = useQuery<UserHandle>({
        queryKey: ["user", handle],
        queryFn: () => getUserByHandle(handle),
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div className="text-white">Loading...</div>;
    }

    if (isError) {
        return <Navigate to={"/404"} />;
    }

    if (data) {
        return <HandleData data={data} />;
    }
}

export default HandleView;
