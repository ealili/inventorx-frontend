import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function Client({client, onDelete}) {
  return (
    <>
      <tr>
        <td>{client.id}</td>
        <td>{client.company_name}</td>
        <td>{client.address}</td>
        {/*<td>{client.website}</td>*/}
        <td>{new Date(client.created_at).toLocaleDateString()}</td>
        <td>
          <Link className={'btn-edit'} to={'/users/' + client.id}>Edit</Link>
          &nbsp;
          <button onClick={(e) => onDelete(client)} className={'btn-delete'}>Delete</button>
        </td>
      </tr>
    </>
  )
}

Client.propTypes = {
  client: PropTypes.object,
  onDelete: PropTypes.func
};