import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function Project({project, onDelete}) {
  return (
    <>
      <tr>
        <td>{project.id}</td>
        <td>{project.name}</td>
        <td>{project.status.status}</td>
        {/*<td>{client.website}</td>*/}
        <td>{new Date(project.created_at).toLocaleDateString()}</td>
        <td>
          <Link className={'btn-edit'} to={'/users/' + project.id}>Edit</Link>
          &nbsp;
          <button onClick={(e) => onDelete(project)} className={'btn-delete'}>Delete</button>
        </td>
      </tr>
    </>
  )
}

Project.propTypes = {
  project: PropTypes.object,
  onDelete: PropTypes.func
};