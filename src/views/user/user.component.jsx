import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";

export default function User({ user, onDelete }) {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.created_at}</td>
        <td>
          <Link style={{ textDecoration: "none" }} to={"/users/" + user.id}>
            <BiEditAlt style={{ color: "black", fontSize: "20px" }} />
          </Link>
          &nbsp;
        </td>
        <td style={{ textAlign: "right" }}>
          <RxCross2
            id={"cross-button"}
            style={{ color: "red", fontSize: "22px" }}
            onClick={(e) => onDelete(user)}
          />
        </td>
      </tr>
    </>
  );
}

User.propTypes = {
  user: PropTypes.object,
  onDelete: PropTypes.func,
};
