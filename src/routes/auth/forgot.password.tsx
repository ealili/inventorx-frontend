import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {
  notify,
} from "../../store/notification/notificationSlice.ts";
import {sendForgotPasswordRequest} from "../../services/AuthService.ts";
import {AppDispatch} from "../../store/store.ts";
import {useTranslation} from "react-i18next";
import GuestNavbar from "../../components/guest-navbar/guest-navbar.component.tsx";

export default function ForgotPassword() {
  const dispatch: AppDispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(null);
  const {t} = useTranslation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current?.value,
    };

    setMessage(null);

    try {
      await sendForgotPasswordRequest(payload);

      dispatch(notify({message: "Password link sent success", type: 'success'}))
      // dispatch(setNotification({
      //   message: "Please check your email to reset your password"
      // }));
      //
      // setTimeout(
      //   () => {
      //     dispatch(resetNotification())
      //   }, 5000)
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <>
      <GuestNavbar component={'forgot-password'}/>
      <div className="login-signup-form forgot-password-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className={"title"}>{t('enterYourEmailAddress')}</h1>
            {message && <div className={"alert"}>{message}</div>}
            <input ref={emailRef} type="email" placeholder={t('emailAddress')}/>
            <button className="btn btn-block" type={"submit"}>
              {t('confirm')}
            </button>
            <p className="message">
              <Link to={"/login"}>{t('backToLogin')}</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
