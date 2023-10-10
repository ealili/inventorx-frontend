import {Link, Navigate, Outlet} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import {useStateConetxt} from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateConetxt()


  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })


  }, [])

  if (!token) {
    return <Navigate to={'/login'}/>
  }

  const onLogout = (e) => {
    e.preventDefault()

    axiosClient.post('logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }


  return (
    <div id={'defaultLayout'}>
      <aside>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/users'}>Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>{user.name}
            <a href="#" onClick={onLogout} className={'btn-logout'}>Log out</a></div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
      {
        notification &&
        <div className={'notification'}>{notification}</div>
      }
    </div>
  );
}