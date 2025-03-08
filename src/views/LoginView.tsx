import { Link } from "react-router-dom";

function LoginView() {
    return (
        <>
            <nav className="hover:opacity-80 transition-opacity">
                <Link to="/auth/register">No tienes cuenta? Regístrate</Link>
            </nav>
        </>
    );
}

export default LoginView;
