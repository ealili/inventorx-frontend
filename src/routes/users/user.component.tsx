import {Link} from "react-router-dom";
import {RxCross2} from "react-icons/rx";
import {BiEditAlt} from "react-icons/bi";
import {UserStateInterface} from "../../store/user/user.interface.ts";
import React from "react";

const User: React.FC<UserStateInterface> = ({user}: UserStateInterface) => {
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
            // onClick={() => onDelete(users)}
          />
        </td>
      </tr>
    </>
  );
};

export default User;
