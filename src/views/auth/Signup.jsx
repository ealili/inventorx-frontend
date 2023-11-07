import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/user/user.action.js";
import FormInput from "../../components/form-input/FormInput.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const teamNameRef = useRef(null);
  const [errors, setErrors] = useState(null);

  const onSubmit = (e) => {
    console.log("form hit submit");
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
      team_name: teamNameRef.current.value,
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
          <label className="form-label">Team Name</label>
          <input ref={teamNameRef} type="text" placeholder="Team Name" required />
          <label className="form-label">Full Name</label>
          <input ref={nameRef} type="text" placeholder="Full Name" required />
          <label className="form-label">Email Address</label>
          <input ref={emailRef} type="email" placeholder="Email Address" required />
          <label className="form-label">Password</label>
          <input ref={passwordRef} type="password" placeholder="Password" required />
          <label className="form-label">Password Confirmation</label>
          <input
            ref={passwordConfirmRef}
            type="password"
            placeholder="Password confirmation"
            required
          />
          <button className="btn btn-block" type="submit">
            Sign Up
          </button>
        </form>

        <p className="message">
          Already registered? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
