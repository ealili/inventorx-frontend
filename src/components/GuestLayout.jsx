import {Navigate, Outlet} from "react-router-dom";
import {useStateConetxt} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const {token, notification} = useStateConetxt();

  if (token) {
    return <Navigate to={'/users'}/>
  }
  return (
    <>
      <Outlet/>
      {
        notification &&
        <div className={'notification'}>{notification}</div>
      }</>
  )
}