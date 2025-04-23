import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function AdminNavigation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN_DEVTREE");
        queryClient.removeQueries({ queryKey: ["user"] });
        navigate("/auth/login");
    };

    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    );
}

export default AdminNavigation;
