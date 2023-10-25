import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user/user.action.js";
import axios from "axios";
import { selectCurrentUser } from "../../store/user/user.selector.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (currentUser) {
      navigate("/users");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, payload);
      // Dispatch the login action
      const { user, token } = response.data;
      console.log("user", user);
      console.log("token", token);
      dispatch(loginUser(user, token));

      navigate("/");
    } catch (err) {
      const response = err.response;
      if (response && (response.status === 422 || response.status === 400)) {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else {
          setErrors({
            email: [response.data.message],
          });
        }
      }
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className={"title"}>Login into your account</h1>
          {errors && (
            <div className={"alert"}>
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={emailRef} type="email" placeholder={"Email"} />
          <input ref={passwordRef} type="password" placeholder={"Password"} />
          <button className="btn btn-block" type={"submit"}>
            Log in
          </button>
          <p className="message">
            Don't have an account? <Link to={"/signup"}>Register</Link>
          </p>

          <p className="message">
            <Link to={"/forgot"}>Forgot your password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
