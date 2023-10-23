import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { useStateConetxt } from "../../contexts/ContextProvider.jsx";

export default function ResetPassword() {
  const { token, email } = useParams();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errors, setErrors] = useState(null);

  const { setNotification } = useStateConetxt();

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      token: token,
      email: atob(email),
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    };

    setErrors(null);

    axios
      .post("http://localhost:8000/api/password/reset", payload)
      .then(({ data }) => {
        setNotification("Password reset successfully");
        navigate("/login");
      })
      .catch((err) => {
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
      });
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className={"title"}>Reset your password</h1>
          {errors && (
            <div className={"alert"}>
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={passwordRef} type="password" placeholder={"Password"} />
          <input ref={passwordConfirmRef} type="password" placeholder={"Password confirmation"} />
          <button className="btn btn-block" type={"Update Password"}>
            Reset
          </button>
          {/*<p className="message">*/}
          {/*  Not Registered? <Link to={'/signup'}>Register</Link>*/}
          {/*</p>*/}
        </form>
      </div>
    </div>
  );
}
