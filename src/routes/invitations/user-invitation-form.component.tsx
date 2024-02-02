import {useDispatch, useSelector} from "react-redux";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {selectCurrentUser} from "../../store/user/user.selector.ts";
import {AppDispatch} from "../../store/store.ts";
import {notify} from "../../store/notification/notificationSlice.ts";
import FormInput from "../../components/form-input/form-input.component.tsx";
import {Role} from "../../types/role.ts";
import {getAllRoles} from "../../services/RoleService.ts";
import Select from "../../components/select/select.component.tsx";
import {UserInvitationPayload} from "../../types/invitation.ts";
import {inviteUser} from "../../services/InvitationService.ts";
import axios from "axios";
import ErrorMessage from "../../components/error-message/error-message.component.tsx";

export default function UserInvitationForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const emailRef = useRef<HTMLInputElement>(null);
  const roomNumberRef = useRef<HTMLInputElement>(null);
  const [roles, setRoles] = useState<Role[]>([]); // Change 'Role | null' to 'Role[]'
  const [selectedRole, setSelectedRole] = useState(3)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailValue = emailRef.current?.value || '';
    const roomNumberValue = roomNumberRef.current?.value || '';

    const payload: UserInvitationPayload = {
      email: emailValue,
      room_number: roomNumberValue,
      role_id: selectedRole,
      team_id: user.team.id
    };

    console.log(payload)

    try {
      const response = await inviteUser(payload);
      console.log(response)
      dispatch(notify({message: 'User has been invited successfully', type: 'success'}))
      navigate("/invitations");
    } catch (err) {
      // console.log(err.response?.data.data.message)
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data.data.message)
      }
      // if (response && (response.status === 422 || response.status === 400)) {
      //   if (response.data.errors) {
      //     setErrors(response.data.errors);
      //   } else {
      //     setErrors({
      //       email: [response.data.message as string], // Assuming message is a string
      //     });
      //   }
      // }
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getAllRoles();
      console.log(response)
      setRoles(response)
      // setRoles(response)
    } catch (err) {
      console.log("ERROR Occurred: ", err)
      navigate('/notfound')
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(parseInt(e.target.value)); // Parse the string value to a number
  }

  return (
    <div>
      <div className={"card animated fadeInDown"}>
        <h3>Invite user</h3>
        <hr/>
        <form onSubmit={handleSubmit}>
          <ErrorMessage message={errorMessage}/>
          <FormInput type={'email'} name={'Email'} label={'Email'} ref={emailRef} required/>
          <Select
            data={roles}
            name="Role"
            handleChange={handleRoleChange}
            selected={selectedRole}
            col="name"
          />
          <button style={{marginTop: '20px'}} type={'submit'} className={'btn btn-success'}>Invite</button>
        </form>
      </div>
    </div>
  );
}
