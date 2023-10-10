import {Navigate, Outlet} from "react-router-dom";
import {useStateConetxt} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const {token} = useStateConetxt();

  if (token) {
    return <Navigate to={'/users'}/>
  }
  return (

    <><Outlet/></>
  )
}