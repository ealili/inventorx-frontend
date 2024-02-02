import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setNotification} from "../../store/notification/notificationSlice.ts";
import {resetPasswordRequest} from "../../services/AuthService.ts";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const {token, email} = useParams();

  const passwordRef = useRef<HTMLInputElement>(null); // Specify the type as HTMLInputElement
  const passwordConfirmRef = useRef<HTMLInputElement>(null); // Specify the type as HTMLInputElement
  const [errors, setErrors] = useState(null);
  // const passwordValue = passwordRef.current?.value; // Optional chaining to handle possible undefined

  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      token: token,
      email: email ? atob(email) : "",
      password: passwordRef.current?.value ?? "", // Use a default value if it's undefined
      password_confirmation: passwordConfirmRef.current?.value ?? "", // Use default value for confirmation as well
    };

    setErrors(null)

    try {
      await resetPasswordRequest(payload)
      dispatch(setNotification({message: "Password reset successfully"}));
      navigate("/login");

      // TODO: Error handling
      // TODO: Check for bad response
    } catch (err) {
      console.error(err)
    }
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
          <input ref={passwordRef} type="password" placeholder={"Password"}/>
          <input ref={passwordConfirmRef} type="password" placeholder={"Password confirmation"}/>
          <button className="btn btn-block">
            Reset
          </button>
          {/*<p className="message">*/}
          {/*  Not Registered? <Link to={'/signup'}>RegisterComponent</Link>*/}
          {/*</p>*/}
        </form>
      </div>
    </div>
  );
}
