import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  setNotification: () => {

  },
  setUser: () => {
  },
  setToken: () => {
  }
})


export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [token, _setToken] = useState(localStorage.getItem('access_token'))
  const [notification, _setNotification] = useState('')
  // const [token, _setToken] = useState(null)

  const setToken = (token) => {
    _setToken(token)

    if (token) {
      console.log('Setting token')
      localStorage.setItem('access_token', token)
      return
    }
    localStorage.removeItem('access_token')
  }

  const setNotification = (message) => {
    _setNotification(message)
    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
      notification,
      setNotification
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateConetxt = () => {
  return useContext(StateContext)
}