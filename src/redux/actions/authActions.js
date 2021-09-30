import instance from "../../axios";

import { POST_LOGIN, POST_LOGOUT, ADD_USER, AUTH_ERROR } from "./types";

export async function login(email, password) {
    console.log(email, password);
    try {
        const res = await instance.post("/api/auth/login", {
            email: email,
            password: password,
        });
        if (res.status === 200) {
            localStorage.setItem(
                "auth",
                JSON.stringify({ isLoggedIn: true, userId: res.data.userId })
            );
            return {
                type: POST_LOGIN,
                userId: res.data.userId,
                isLoggedIn: true,
                authError: false,
            };
        }
    } catch (error) {
        console.log("error in login");
        return {
            type: AUTH_ERROR,
            authError: true,
        };
    }
}

export async function registration(first, last, email, password) {
    console.log("data", first, last, email, password);
    try {
        const res = await instance.post("/api/auth/addUser", {
            first_name: first,
            last_name: last,
            email: email,
            password: password,
        });
        if (res.status === 200) {
            localStorage.setItem(
                "auth",
                JSON.stringify({ isLoggedIn: true, userId: res.data.userId })
            );
            return {
                type: ADD_USER,
                userId: res.data.userId,
                isLoggedIn: true,
                authError: false,
            };
        }
    } catch (error) {
        console.log("error in registration");
        return {
            type: AUTH_ERROR,
            authError: true,
        };
    }
}

export async function logout() {
    try {
        const res = await instance.get("/api/auth/logout");
        if (res.status === 200) {
            if (res.status === 200) {
                return {
                    type: POST_LOGOUT,
                    userId: null,
                    isLoggedIn: false,
                    authError: false,
                    user: {},
                };
            }
        }
    } catch (error) {
        console.log("error in logout");
        return {
            type: AUTH_ERROR,
            authError: true,
        };
    }
}
