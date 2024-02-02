import {NotificationInterface} from "./notification.interface.ts";
export const selectNotification = (state: NotificationInterface) => state.notification.notification

export const selectNotificationType = (state: NotificationInterface) => state.notification.type;
