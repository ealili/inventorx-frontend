export const NOTIFICATION_INITIAL_STATE = {
  notification: null,
};

export const notificationReducer = (state = NOTIFICATION_INITIAL_STATE, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: payload,
      };
    default:
      return state;
  }
};
