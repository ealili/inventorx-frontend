import { NOTIFICATION_ACTION_TYPES } from "./notification.types";

export const NOTIFICATION_INITIAL_STATE = {
  notification: null,
};

export const notificationReducer = (state = NOTIFICATION_INITIAL_STATE, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notification: payload,
      };
    case NOTIFICATION_ACTION_TYPES.RESET_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
};
