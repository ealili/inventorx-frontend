import { createAction } from "../../utils/reducer/reducer.utils.js";
import { NOTIFICATION_ACTION_TYPES } from "./notification.types.js";

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(createAction(NOTIFICATION_ACTION_TYPES.SET_NOTIFICATION, message));

    // Automatically reset the notification after 5 seconds
    setTimeout(() => {
      dispatch(createAction(NOTIFICATION_ACTION_TYPES.RESET_NOTIFICATION, null));
    }, 5000);
  };
};
