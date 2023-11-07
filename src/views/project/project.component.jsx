import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";

export default function Project({ project, onDelete }) {
  return (
    <>
      <tr>
        <td>{project.name}</td>
        <td>{project.status.status}</td>
        <td>{new Date(project.created_at).toLocaleDateString()}</td>
        <td>{new Date(project.deadline).toLocaleDateString()}</td>
        <td>
          <Link style={{ textDecoration: "none" }} to={"/projects/" + project.id}>
            <BiEditAlt style={{ color: "black", fontSize: "20px" }} />
          </Link>
          &nbsp;
        </td>
        <td style={{ textAlign: "right" }}>
          <RxCross2
            id={"cross-button"}
            style={{ color: "red", fontSize: "22px" }}
            onClick={() => onDelete(project)}
          />
          {/*<button onClick={(e) => onDelete(project)} className={'btn-delete'}>X</button>*/}
        </td>
      </tr>
    </>
  );
}

Project.propTypes = {
  project: PropTypes.object,
  onDelete: PropTypes.func,
};
