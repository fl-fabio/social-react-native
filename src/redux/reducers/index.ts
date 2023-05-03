import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import bookmarkReducer from "./bookmarkReducer";


export default combineReducers({
    accountReducer,
    bookmarkReducer,
})