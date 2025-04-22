import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to={"/"}>
            <img
                src="/logo.svg"
                className="w-full block"
                alt="Logotipo DevTree"
            />
        </Link>
    );
}

export default Logo;
