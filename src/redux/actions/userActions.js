import instance from "../../axios";
import fileUpload from "../../Firebase/methods";

import {
    GET_ALL_USERS,
    DELETE_USER,
    USER_ERROR,
    GET_USER,
    UPDATE_USER,
} from "./types";

export async function getUser(id) {
    try {
        const res = await instance.get(`/api/user/${id}`);
        if (res.status === 200) {
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

export async function updateBio(bio, id) {
    try {
        const res = await instance.post("/api/user/bioUpload", {
            bio: bio,
            id: id,
        });
        if (res.status === 200) {
            return {
                type: UPDATE_USER,
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

export async function uploadProfilePic(url, id) {
    try {
        const res = await instance.post("/api/user/uploadUserPicture", {
            id: id,
            image: url,
        });
        return {
            type: UPDATE_USER,
            success: res.data.success,
            userId: res.data.userId,
            user: res.data.user,
            userError: false,
        };
    } catch (error) {
        return {
            type: USER_ERROR,
            userError: true,
        };
    }
}
