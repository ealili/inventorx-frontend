import {ErrorResponse, Link, useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../store/user/userSlice.ts";
import {ErrorType} from "../../../types/error.ts";
import "./register.styles.scss";
import {register} from '../../../services/AuthService.ts';
import {RegisterPayload} from '../../../types/auth.ts';
import {useTranslation} from "react-i18next";
import GuestNavbar from "../../../components/guest-navbar/guest-navbar.component.tsx";

export default function RegisterComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const teamNameRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorType | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payloadToSend: RegisterPayload = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      password_confirmation: passwordConfirmRef.current?.value || '',
      team_name: teamNameRef.current?.value || '',
    };

    console.log("form hit submit", payloadToSend);

    try {
      const response = await register(payloadToSend);
      const {user, access_token} = response;
      console.log("user", user);
      console.log("token", access_token);
      dispatch(loginUser({user, access_token}));

      navigate("/dashboard");
    } catch (err) {
      const response = err as ErrorResponse;

      if (response && (response.status === 422 || response.status === 400)) {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else {
          setErrors({
            email: [response.data.message as string], // Assuming message is a string
          });
        }
      }
    }
  };

  return (
    <>
      <GuestNavbar component={'register'}/>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>

            <h1 className={"title"}>{t('register')}</h1>
            {errors && (
              <div className={"alert"}>
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <label className="form-label">{t('teamName')}</label>
            <input ref={teamNameRef} type="text" placeholder={t('teamName')}
                   required/>
            <label className="form-label">{t('fullName')}</label>
            <input ref={nameRef} type="text" placeholder={t('fullName')} required/>
            <label className="form-label">{t('emailAddress')}</label>
            <input ref={emailRef} type="email" placeholder={t('emailAddress')} required/>
            <label className="form-label">{t('password')}</label>
            <input ref={passwordRef} type="password" placeholder={t('password')} required/>
            <label className="form-label">{t('passwordConfirmation')}</label>
            <input
              ref={passwordConfirmRef}
              type="password"
              placeholder={t('passwordConfirmation')}
              required
            />
            <button className="btn btn-block" type="submit">
              {t('register')}
            </button>
          </form>
          <p className="message">
            {t('alreadyRegistered')} <Link to={"/login"}> {t('loginButton')}</Link>
          </p>
        </div>
      </div>
    </>
  );
}
