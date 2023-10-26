import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/user/user.action.js";
import { BiArrowBack } from "react-icons/bi";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const teamNameRef = useRef(null);

  const [step, setStep] = useState(1);

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

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        {step > 1 && (
          <div>
            <button
              type="button"
              onClick={handleBack}
              className="btn"
              style={{
                color: "black",
                backgroundColor: "transparent",
              }}
            >
              <BiArrowBack style={{ fontSize: "20px" }} />
            </button>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <h1 className={"title"}>Register</h1>
          {errors && (
            <div className={"alert"}>
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <div className={step === 1 ? "fade-in" : "fade-out"}>
            <input ref={nameRef} type="text" placeholder={"Full Name"} required />
            <input ref={emailRef} type="email" placeholder={"Email Address"} required />
            <input ref={passwordRef} type="password" placeholder={"Password"} required />
            <input
              ref={passwordConfirmRef}
              type="password"
              placeholder={"Password confirmation"}
              required
            />
          </div>

          <div className={step === 2 ? "fade-in" : "fade-out"}>
            <input ref={teamNameRef} type="text" placeholder={"Team Name"} />
          </div>
          <div>
            {step < 2 ? (
              <button className="btn btn-block" type="button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="btn btn-block" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>

        <p className="message">
          Already registered? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
