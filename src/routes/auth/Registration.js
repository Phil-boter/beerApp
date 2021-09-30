import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { registration } from "../../redux/actions/authActions";
import { getUser } from "../../redux/actions/userActions";

export default function Registration() {
    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector((state) => {
        return state.auth;
    });
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleFirst = (e) => {
        e.preventDefault();
        setFirst(e.target.value);
    };
    const handleLast = (e) => {
        e.preventDefault();
        setLast(e.target.value);
    };

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const Register = (e) => {
        e.preventDefault();
        dispatch(registration(firstName, lastName, email, password));
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
            <div>
                <form>
                    <div>
                        <input
                            type="text"
                            name="first"
                            placeholder="First name"
                            onChange={(e) => handleFirst(e)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="last"
                            placeholder="Last name"
                            onChange={(e) => handleLast(e)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => handleEmail(e)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => handlePassword(e)}
                        ></input>
                    </div>
                </form>
            </div>

            <div>
                <button
                    disabled={
                        (firstName.length < 1,
                        lastName.length < 1,
                        email.length < 1,
                        password.length < 6)
                    }
                    className="toggle-button login"
                    onClick={(e) => Register(e)}
                >
                    Sign Up
                </button>
            </div>
            {auth.authError && <h1>{auth.authError.response.data.msg}</h1>}
        </>
    );
}
