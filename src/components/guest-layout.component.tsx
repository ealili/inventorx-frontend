import {Navigate, Outlet} from "react-router-dom";
import {selectToken} from "../store/user/user.selector.js";
import {useSelector} from "react-redux";
import {
  selectNotification,
  selectNotificationType
} from "../store/notification/notification.selector.ts";

export default function GuestLayout() {
  const token = useSelector(selectToken);
  const notification = useSelector(selectNotification);
  const notificationType = useSelector(selectNotificationType)

  if (token) {
    return <Navigate to={"/"}/>;
  }

  const notificationStyle = {
    backgroundColor: notificationType === 'success' ? '#00a762' : 'red'
  };

  return (
    <>
      <Outlet/>
      {notification &&
        <div className={"notification"} style={notificationStyle}>{notification}</div>}
    </>
  );
}
