import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Main from "./routes/main/Main";
import Login from "./routes/auth/Login";
import Registration from "./routes/auth/Registration";
import User from "./routes/user/User";
import Beer from "./routes/beers/Beer";
import Hop from "./routes/hops/Hop";

export default function App() {
    const auth = useSelector((state) => {
        return state.auth;
    });
    console.log("auth", auth);

    const [visible, setIsVisible] = useState(false);

    // useEffect(() => {
    //     dispatch(getUser(auth.userId));
    // }, [auth, dispatch]);

    return (
        <BrowserRouter>
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
                {!auth.isLoggedIn ? (
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
