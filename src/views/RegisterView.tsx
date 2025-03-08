import { Link } from "react-router-dom";

function RegisterView() {
    return (
        <>
            <nav className="hover:opacity-80 transition-opacity">
                <Link to="/auth/login">Ya tienes cuenta? Inicia Sesión</Link>
            </nav>
        </>
    );
}

export default RegisterView;
