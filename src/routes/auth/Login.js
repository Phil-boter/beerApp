import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../redux/actions/authActions";
import { getUser } from "../../redux/actions/userActions";

const LoginComponent = ({ setIsVisible, visible }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector((state) => {
        return state.auth;
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        await dispatch(login(email, password));
    };

    useEffect(() => {
        if (auth.isLoggedIn === true) {
            console.log("push");
            dispatch(getUser(auth.userId));
            return history.push("/user");
        } else {
            console.log("NO push");
            return;
        }
    }, [auth, history, dispatch]);

    return (
        <>
            <div className="admin-container">
                <div className="login-container"></div>
                <form>
                    <div>
                        <input
                            type="text"
                            name="email"
                            autoComplete="email"
                            placeholder="Email"
                            onChange={(e) => handleEmail(e)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => handlePassword(e)}
                        ></input>
                    </div>
                </form>
                <div>
                    <button
                        disabled={(email.length < 1, password.length < 1)}
                        className="toggle-button login"
                        onClick={() => handleLogin()}
                    >
                        Sign In
                    </button>
                </div>
                {auth.authError && <h1>Please try again</h1>}
            </div>
        </>
    );
};

const Login = ({ setIsVisible, visible }) => {
    return (
        <>
            <LoginComponent setIsVisible={setIsVisible} visible={visible} />
        </>
    );
};
export default Login;
