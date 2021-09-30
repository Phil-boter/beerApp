import { GET_HOPS, HOP_ERROR } from "../actions/types";

const initialState = {
    hops: [],
    hopError: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOPS:
            return {
                ...state,
                hops: action.payload,
                hopError: action.hopError,
            };
        case HOP_ERROR:
            return {
                ...state,
                hopError: action.hopError,
            };
        default:
            return state;
    }
}
