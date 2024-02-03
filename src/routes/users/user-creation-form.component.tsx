import {useDispatch} from "react-redux";
import {FormEvent, useEffect, useRef, useState} from "react";
import {ErrorResponse, Link, useNavigate, useParams} from "react-router-dom";
import {AppDispatch} from "../../store/store.ts";
import FormInput from "../../components/form-input/form-input.component.tsx";
import axios from "axios";
import {notify} from "../../store/notification/notificationSlice.ts";
import {UserCreationPayload} from "../../types/user.ts";
import {getInvitation} from "../../services/InvitationService.ts";
import {UserInvitation} from "../../types/invitation.ts";

export default function UserCreationForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  // const [errors, setErrors] = useState<ErrorObject | null>(null);
  const [invitation, setInvitation] = useState<UserInvitation | null>(null);
  // const [roles, setRoles] = useState<Role | null>(null);
  const {token} = useParams<{ token: string | undefined }>()

  useEffect(() => {
    fetchInvitation();
  }, []);

  async function fetchInvitation() {
    if (token) {
      try {
        const response = await getInvitation(token);
        // await fetchRoles()
        setEmail(response.email)
        setInvitation(response)
      } catch (err) {
        console.log("ERROR Occurred: ", err)
        navigate('/notfound')
      }
    } else {
      console.error('Token is undefined');
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: UserCreationPayload = {
      email,
      name: nameRef.current?.value || '',
      password: passwordRef.current?.value || '',
      password_confirmation: passwordConfirmRef.current?.value || '',
      invitation_token: invitation?.invitation_token || ''
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users`, payload);
      console.log(response)
      dispatch(notify({message: "Account created successfully", type: 'success'}))

      navigate("/login");
    } catch (err) {
      const response = err as ErrorResponse;
      console.log(response)

      if (response && (response.status === 422 || response.status === 400)) {
        console.log(response.data)
        // if (response.data.errors) {
        //   setErrors(response.data.errors);
        // }
        // if (response.data.errors) {
        //   setErrors(response.data.errors);
        // } else {
        //   setErrors({
        //     email: [response.data.message as string], // Assuming message is a string
        //   });
        // }
      }
    }
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className={"title"}>Welcome to StudHeim</h1>
        <hr/>
        <br/>
        <form onSubmit={onSubmit}>
          {/*{errors && (*/}
          {/*  <div className={"alert"}>*/}
          {/*    {Object.keys(errors).map((key) => (*/}
          {/*      <p key={key}>{errors[key][0]}</p>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*)}*/}
          <FormInput type={'text'} name={'Name'} label={'Name'} ref={nameRef} required/>
          <fieldset disabled={true}>
            <FormInput type={'text'} name={'Email'} label={'Email'} defaultValue={email} required disabled/>
          </fieldset>
          {/*<FormInput type={'text'} name={'Role'} defaultValue={invitation?.role.name} required*/}
          {/*           disabled/>*/}
          <FormInput type={'password'} name={'Password'}  label={'Password'} ref={passwordRef} required/>
          <FormInput type={'password'} name={'Password Confirmation'}  label={'Password Confirmation'} ref={passwordConfirmRef}
                     required/>
          <button className="btn btn-block" type="submit">
            Register
          </button>
        </form>
        <p className="message">
          Already registered? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
