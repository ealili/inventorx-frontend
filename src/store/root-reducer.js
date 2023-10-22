import {combineReducers} from "redux";
import {userReducer} from "./user/user.reducer.js";
import {notificationReducer} from "./notification/notifiaction.reducer.js";


export const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer
})