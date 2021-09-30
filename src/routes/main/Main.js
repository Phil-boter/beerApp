import { Link } from "react-router-dom";
export default function Main({ setIsVisible, visible }) {
    return (
        <>
            <h1>hello from main</h1>
            <Link to="/login">Sign In</Link>
            <Link to="/registration">Sign UP</Link>
        </>
    );
}
