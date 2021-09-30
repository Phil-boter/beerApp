import { BEER_ERROR, GET_BEERS } from "../actions/types";

const initialState = {
    beers: [],
    beerError: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BEERS:
            console.log("action", action);
            return {
                ...state,
                beers: action.payload,
                beerError: false,
            };
        case BEER_ERROR:
            return {
                ...state,
                beerError: true,
            };
        default:
            return state;
    }
}
