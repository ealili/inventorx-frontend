import { createAction } from "../../utils/reducer/reducer.utils.js";

export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const RESET_NOTIFICATION = "RESET_NOTIFICATION";

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(createAction(SET_NOTIFICATION, message));

    // Automatically reset the notification after 5 seconds
    setTimeout(() => {
      dispatch(createAction(RESET_NOTIFICATION, null));
    }, 5000);
  };
};
