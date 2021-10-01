import {
    GET_ALL_USERS,
    ADD_USER,
    DELETE_USER,
    USER_ERROR,
    GET_USER,
    UPDATE_USER,
} from "../actions/types";

const initialState = {
    success: false,
    userId: null,
    user: {},
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                success: action.success,
                userId: action.userId,
                user: action.user,
                userError: action.userError,
            };

        case GET_USER: {
            return {
                ...state,
                success: action.success,
                userId: action.userId,
                user: action.user,
                userError: action.userError,
            };
        }
        case UPDATE_USER: {
            return {
                ...state,
                success: action.success,
                userId: action.userId,
                user: action.user,
                userError: action.userError,
            };
        }
        case USER_ERROR:
            return {
                ...state,
                userError: action.userError,
            };

        default:
            return state;
    }
}
