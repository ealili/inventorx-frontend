import {Link, Navigate, Outlet} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useEffect, useState} from "react";
import {useStateConetxt} from "../contexts/ContextProvider.jsx";
import {getAuthenticatedUser} from "../services/UserService.js";
import {FiUser, FiUsers} from 'react-icons/fi'
import {TbUsersGroup} from 'react-icons/tb'
import {AiOutlineFundProjectionScreen} from 'react-icons/ai'
import {RxDashboard} from 'react-icons/rx'
import {NavLink} from "./default-layout.styles.jsx";

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


  return (<div id={'defaultLayout'}>
    {!loading && <aside>
      <NavLink to={'/dashboard'}><RxDashboard style={{fontSize: '22px', margin: '0 10px'}}/>Dashboard</NavLink>
      {user.role?.name === 'Admin' ? (<>
        <NavLink to={'/users'}><FiUsers
          style={{fontSize: '22px', margin: '0 10px'}}/>Users</NavLink>
        <NavLink to={'/clients'}><TbUsersGroup
          style={{fontSize: '22px', margin: '0 10px'}}/>Clients</NavLink>
        <NavLink to={'/projects'}
                ><AiOutlineFundProjectionScreen
          style={{fontSize: '22px', margin: '0 10px'}}/>Projects</NavLink>
      </>) : ''}
      <NavLink to={`/profile/${user.id}`} ><FiUser
        style={{fontSize: '22px', margin: '0 10px'}}/>Profile</NavLink>
    </aside>}
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
    {notification && <div className={'notification'}>{notification}</div>}
  </div>);
}