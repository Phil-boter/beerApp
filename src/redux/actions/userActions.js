import instance from "../../axios";

import { GET_ALL_USERS, DELETE_USER, USER_ERROR, GET_USER } from "./types";

export async function getUser(id) {
    console.log("id", id);
    try {
        const res = await instance.get(`/api/user/${id}`);
        if (res.status === 200) {
            console.log("res in get user", res);
            return {
                type: GET_USER,
                success: res.data.success,
                userId: res.data.userId,
                user: res.data.user,
                userError: false,
            };
        }
    } catch (error) {
        console.log("error in get admin");
        return {
            type: USER_ERROR,
            userError: true,
        };
    }
}
