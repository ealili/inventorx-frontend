import {createAction} from "../../utils/reducer/reducer.utils.js";

export const loginUser = (user, token) =>
  createAction('LOGIN_USER', {user, token})

export const logoutUser = () => {
  // Clear user-related data from local storage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT_USER',
  }
};
