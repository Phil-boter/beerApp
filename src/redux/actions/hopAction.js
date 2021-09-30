import instance from "../../axios";

import { GET_HOPS, HOP_ERROR } from "./types";

export const getHops = async () => {
    try {
        const { data } = await instance.get("api/hops");

        return {
            type: GET_HOPS,
            payload: data,
            hopError: false,
        };
    } catch (error) {
        console.log("errorin get Hops", error);
        return {
            type: HOP_ERROR,
            hopError: true,
        };
    }
};
