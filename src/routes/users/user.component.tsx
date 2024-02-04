import {Link} from "react-router-dom";
import {RxCross2} from "react-icons/rx";
import {BiEditAlt} from "react-icons/bi";
import {UserStateInterface} from "../../store/user/user.interface.ts";
import React from "react";
import {deleteUser} from "../../services/UserService.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {notify} from "../../store/notification/notificationSlice.ts";

const User: React.FC<UserStateInterface & {
  onDeleteCallback: () => Promise<void>
}> = ({user, onDeleteCallback}: UserStateInterface & {
  onDeleteCallback: () => Promise<void>
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const onDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Deleting user')
    e.preventDefault()

    try {
      await deleteUser(user.id)

      dispatch(notify({message: "User deleted successfully", type: "success"}))

      await onDeleteCallback()
    } catch (err) {
      dispatch(notify({message: "Could not delete user", type: "error"}))
    }
  }


  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role.name}</td>
        <td style={{textAlign: "left"}}>
          <Link style={{textDecoration: "none"}} to={"/users/" + user.id}>
            <BiEditAlt style={{color: "black", fontSize: "20px"}}/>
          </Link>
          &nbsp;
        </td>
        <td style={{textAlign: "left"}}>
          <RxCross2
            id={"cross-button"}
            style={{color: "red", fontSize: "22px"}}
            onClick={onDelete}
          />
        </td>
      </tr>
    </>
  );
};

export default User;
