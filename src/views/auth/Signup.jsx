import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/user/user.action.js";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [errors, setErrors] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        // Dispatch the login action
        const { user, token } = data;
        console.log("user", user);
        console.log("token", token);
        dispatch(loginUser(user, token));

        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className={"title"}>Register</h1>
          {errors && (
            <div className={"alert"}>
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} type="text" placeholder={"Full Name"} />
          <input ref={emailRef} type="email" placeholder={"Email Address"} />
          <input ref={passwordRef} type="password" placeholder={"Password"} />
          <input ref={passwordConfirmRef} type="password" placeholder={"Password confirmation"} />
          <button className="btn btn-block" type={"submit"}>
            Sign up
          </button>
          <p className="message">
            Already registered? <Link to={"/login"}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
