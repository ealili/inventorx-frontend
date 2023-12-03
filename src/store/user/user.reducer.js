import { USER_ACTION_TYPES } from "./user.types";

export const initialState = {
  user: null,
  token: null,
};

export const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case USER_ACTION_TYPES.LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
