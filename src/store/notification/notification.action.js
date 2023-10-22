import {createAction} from "../../utils/reducer/reducer.utils.js";

export const setNotification = (message) => ({
  type: 'SET_NOTIFICATION',
  payload: message,
});