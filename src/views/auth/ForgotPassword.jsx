import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../../axios-client.js";
import axios from "axios";
import {useStateConetxt} from "../../contexts/ContextProvider.jsx";

export default function ForgotPassword() {
  const emailRef = useRef()
  const [message, setMessage] = useState(null)

  const {setNotification} = useStateConetxt()

  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
    }

    setMessage(null)

    axios.post('http://localhost:8000/api/password/forgot', payload)
      .then(({data}) => {
        setNotification('Please check your email to reset your password')
      })
      .catch(err => {
        const response = err.response
        setMessage(response.data.message)
        console.log(response)
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className={'title'}>Enter your email</h1>
          {
            message && <div className={'alert'}>{message}</div>
          }
          <input ref={emailRef} type="email" placeholder={'Email'}/>
          <button className="btn btn-block" type={'submit'}>Confirm</button>
          <p className="message">
            <Link to={'/login'}>Back to login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}