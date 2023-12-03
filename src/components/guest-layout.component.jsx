import { Navigate, Outlet } from "react-router-dom";
import { selectToken } from "../store/user/user.selector.js";
import { useSelector } from "react-redux";
import { selectNotification } from "../store/notification/notification.selector.js";

export default function GuestLayout() {
  const token = useSelector(selectToken);
  const notification = useSelector(selectNotification);

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Outlet />
      {notification && <div className={"notification"}>{notification}</div>}
    </>
  );
}
