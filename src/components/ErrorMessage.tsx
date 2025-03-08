import { ReactNode } from "react";

type ErrorMessageProps = {
    children: ReactNode;
};

function ErrorMessage({ children }: ErrorMessageProps) {
    return <p className="text-red-500 text-xs italic">{children}</p>;
}

export default ErrorMessage;
