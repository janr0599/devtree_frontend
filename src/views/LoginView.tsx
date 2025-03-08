import { Link } from "react-router-dom";

function LoginView() {
    return (
        <>
            <div className="text-3xl font-bold">LoginView</div>

            <nav className="hover:opacity-80 transition-opacity">
                <Link to="/auth/register">No tienes cuenta? Regístrate</Link>
            </nav>
        </>
    );
}

export default LoginView;
