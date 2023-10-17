import {Link, Navigate, Outlet} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useEffect, useState} from "react";
import {useStateConetxt} from "../contexts/ContextProvider.jsx";
import {getAuthenticatedUser} from "../services/UserService.js";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateConetxt()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setLoading(true)
    try {
      const user = await getAuthenticatedUser()
      setUser(user)
    } catch (err) { /* empty */
    } finally {
      setLoading(false)
    }
  }

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
      {!loading && <aside>
        <Link to={'/dashboard'}>Dashboard</Link>
        {user.role?.name === 'Admin' ? (<>
              <Link to={'/users'}>Users</Link>
              <Link to={'/clients'}>Clients</Link>
              <Link to={'/projects'}>Projects</Link>
            </>
          )
          : ''}
        <Link to={`/profile/${user.id}`}>Profile</Link>
      </aside>
      }
      <div className="content">
        <header>
          <div>
            <h2 id={'greeting'}>
              <img className="v-aligned-image" height={'45px'} width={'45px'} src={user.avatar}
                   alt={'User'}/>
              &nbsp;
              &nbsp;
              {user.name}
            </h2>
          </div>
          <div>
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