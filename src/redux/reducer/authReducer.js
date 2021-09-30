import {
    POST_LOGIN,
    POST_LOGOUT,
    AUTH_ERROR,
    ADD_USER,
} from "../actions/types";

const initialState = {
    isLoggedIn: false,
    userId: null,
    authError: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST_LOGIN:
            return {
                ...state,
                userId: action.userId,
                isLoggedIn: action.isLoggedIn,
                authError: action.authError,
            };

        case POST_LOGOUT:
            return {
                ...state,
                userid: action.userId,
                isLoggedIn: action.isLoggedIn,
                authError: action.authError,
            };

        case ADD_USER:
            return {
                ...state,
                userId: action.userId,
                isLoggedIn: action.isLoggedIn,
                authError: action.authError,
            };

        case AUTH_ERROR:
            return {
                ...state,
                authError: action.authError,
            };

        default:
            return state;
    }
}
