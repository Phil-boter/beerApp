import instance from "../../axios";

import { GET_BEERS, BEER_ERROR } from "./types";

export const getBeers = async () => {
    try {
        const { data } = await instance.get("api/beer");

        console.log("data res", data);
        return {
            type: GET_BEERS,
            payload: data,
            beerError: false,
        };
    } catch (error) {
        console.log("error in get beers", error);
        return {
            type: BEER_ERROR,
            beerError: true,
        };
    }
};
