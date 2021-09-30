import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Main from "./routes/main/Main";
import Login from "./routes/auth/Login";
import Registration from "./routes/auth/Registration";
import User from "./routes/user/User";
import Beer from "./routes/beers/Beer";
import Hop from "./routes/hops/Hop";
import Navigation from "./routes/navigation/Navigation";

import "./App.css";
import { getUser } from "./redux/actions/userActions";

export default function App() {
    const dispatch = useDispatch();

    const auth = useSelector((state) => {
        return state.auth;
    });
    console.log("auth", auth);

    const [visible, setIsVisible] = useState(false);
    const [logged, setAuthenticated] = useState(false);
    const [local, setStorage] = useState({});

    console.log("local", local);
    function getAdminDataFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem("auth"));
        if (data) {
            console.log("loacl", data);
            setAuthenticated(true);
            setStorage(data);
        } else {
            return;
        }
    }

    useEffect(() => {
        getAdminDataFromLocalStorage();
        dispatch(getUser(local.userId));
    }, [auth, dispatch, logged, local.userId]);

    return (
        <BrowserRouter>
            <Navigation auth={auth} local={local} />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Main setIsVisible={setIsVisible} visible={visible} />
                    )}
                />
                <Route
                    path="/login"
                    render={() => (
                        <Login setIsVisible={setIsVisible} visible={visible} />
                    )}
                />
                <Route path="/beer" render={() => <Beer />} />
                <Route path="/hop" render={() => <Hop />} />
                <Route path="/registration" render={() => <Registration />} />
                {local.isLoggedIn !== true ? (
                    <Redirect to="/" />
                ) : (
                    <Route
                        path="/user"
                        render={() => (
                            <User
                                setIsVisible={setIsVisible}
                                visible={visible}
                            />
                        )}
                    />
                )}
            </Switch>
        </BrowserRouter>
    );
}
