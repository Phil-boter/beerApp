import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./navigation.css";

export default function Navigation({ auth }) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const style1 = {
        transform: "rotate(45deg) translate(10.5px, 7.5px)",
    };
    const style2 = {
        opacity: 0,
    };
    const style3 = {
        transform: "rotate(-45deg) translate(7.5px, -5px)",
    };

    return (
        <div className="header">
            <div className="logo-nav">
                <div className="logo-container" onClick={closeMobileMenu}>
                    <Link to="/">BEERAPP</Link>
                </div>
                <ul className={click ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/beer" className="bg_slider link">
                            Beers
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/hop" className="bg_slider link">
                            Hops
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/login" className="bg_slider link">
                            Sign In
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/registration" className="bg_slider link">
                            Sign Up
                        </Link>
                    </li>
                    {auth && auth.isLoggedIn === true ? (
                        <li className="option" onClick={closeMobileMenu}>
                            <Link to="/user" className="bg_slider link">
                                Profile
                            </Link>
                        </li>
                    ) : null}
                </ul>
            </div>

            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <span className="menu-icon navigation-burger">
                        <div
                            style={style1}
                            className="change burger bar1"
                        ></div>
                        <div
                            style={style2}
                            className="change burger bar2"
                        ></div>
                        <div
                            style={style3}
                            className="change burger bar3"
                        ></div>
                    </span>
                ) : (
                    <span className="navigation-burger">
                        <div className="bar1"></div>
                        <div className="bar3"></div>
                        <div className="bar3"></div>
                    </span>
                )}
            </div>
        </div>
    );
}
