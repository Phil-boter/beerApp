import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import beerReducer from "./beerReducer";
import hopReducer from "./hopReducer";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    hop: hopReducer,
    beer: beerReducer,
});
