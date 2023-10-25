import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axiosClient from "../../axios-client.js";
import { getUsers } from "../../services/UserService.js";
import { RxCross2 } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";

export default function Client({ client, onDelete }) {
  return (
    <>
      <tr>
        <td>{client.company_name}</td>
        <td>{client.address}</td>
        {/*<td>{client.website}</td>*/}
        <td>{new Date(client.created_at).toLocaleDateString()}</td>
        <td>
          <Link to={"/clients/" + client.id}>
            <BiEditAlt style={{ color: "black", fontSize: "20px" }} />
          </Link>
          &nbsp;
        </td>
        <td style={{ textAlign: "right" }}>
          <RxCross2
            id={"cross-button"}
            style={{ color: "red", fontSize: "22px" }}
            onClick={(e) => onDelete(client)}
          />
        </td>
      </tr>
    </>
  );
}

Client.propTypes = {
  client: PropTypes.object,
  onDelete: PropTypes.func,
};
