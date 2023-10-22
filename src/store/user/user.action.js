import { createAction } from "../../utils/reducer/reducer.utils.js";
import { USER_ACTION_TYPES } from "./user.types.js";

export const loginUser = (user, token) =>
  createAction(USER_ACTION_TYPES.LOGIN_USER, { user, token });

export const logoutUser = () => {
  localStorage.clear();
  return {
    type: USER_ACTION_TYPES.LOGOUT_USER,
  };
};
