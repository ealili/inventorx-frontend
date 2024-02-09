import {Link, useNavigate,} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/user/userSlice.ts";
import {selectCurrentUser} from "../../store/user/user.selector.ts";
import {login} from "../../services/AuthService.ts";
import {ErrorType} from "../../types/error.ts";
import {AxiosError} from "axios";
import {AppDispatch} from "../../store/store.ts";
import {useTranslation} from "react-i18next";
import GuestNavbar from "../../components/guest-navbar/guest-navbar.component.tsx";

export default function Login() {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorType | null>();
  const [errorMessage, setErrorMessage] = useState('');

  // // Use an effect to navigate once currentUser becomes available
  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/dashboard");
  //   }
  // }, [currentUser, navigate]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setErrorMessage('')
    setErrors(null)
    e.preventDefault();

    const emailValue = emailRef.current?.value || ''; // Default value if emailRef is undefined
    const passwordValue = passwordRef.current?.value || ''; // Default value if passwordRef is undefined

    const payload = {
      email: emailValue,
      password: passwordValue,
    };

    setErrors(null);

    // TODO: Update error handling, create resuable functions to get error messages
    try {
      const response = await login(payload);
      const {user, access_token} = response;

      dispatch(loginUser({user, access_token}));

      navigate("/");
    } catch (err: AxiosError | unknown) {
      if (err instanceof AxiosError && err.response?.data?.data?.errors) {
        setErrors(err.response.data.data.errors);
        console.log(err.response.data.errors)
      } else {
        if (err instanceof AxiosError && err.response?.data.message) {
          setErrorMessage(err.response.data.message)
        }
      }
    }
  };

  if (currentUser) {
    return null; // Don't render anything if the user is already logged in
  }

  return (
    <>
      <GuestNavbar component={'login'}/>
      <div className="login-signup-form login-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className={"title"}>{t('loginHeading')}</h1>
            {errorMessage && (
              <div className={"alert"}>
                <p>{errorMessage}</p>
              </div>
            )}
            {errors && (
              <div className={"alert"}>
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <label className="form-label">{t('emailAddress')}</label>
            <input ref={emailRef} type="email" placeholder={"Email"}/>
            <label className="form-label">{t('password')}</label>
            <input ref={passwordRef} type="password" placeholder={t('password')}/>
            <button className="btn btn-block" type={"submit"}>
              {t('loginButton')}
            </button>
            <p className="message">
              {t('dontHaveAnAccount')} <Link to={"/register"}>{t('register')}</Link>
            </p>

            <p className="message">
              <Link to={"/forgot"}>{t('forgotPassword')}</Link>
            </p>
          </form>
        </div>
      </div>
    </>

  );
}
