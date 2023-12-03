import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import Project from "./project.component.jsx";
import { getProjects } from "../../services/ProjectService.js";
import { PageHeaderContainer } from "../../components/shared/shared.styles.jsx";
import NoRecordsMessage from "../../components/no-records-message/no-records-message.component.jsx";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/notification/notification.action.js";

export default function Projects() {
  const dispatch = useDispatch;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const projects = await getProjects();
      setProjects(projects);
    } catch (err) {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  const onDelete = (project) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    console.log(project.id);

    axiosClient.delete(`/projects/${project.id}`).then(() => {
      dispatch(setNotification("Project was deleted successfully"));
      // Update Projects, fetch again
      fetchProjects();
    });
  };

  return (
    <div>
      <PageHeaderContainer>
        <h1>Projects</h1>
        <Link
          style={{ padding: "10px 40px", fontSize: "16px" }}
          className={"btn-add"}
          to={"/projects/new"}
        >
          Create
        </Link>
      </PageHeaderContainer>

      {!loading && projects.length > 0 && (
        <div className={"card animated fadeInDown"}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Created at</th>
                <th>Deadline</th>
                <th>Edit</th>
                <th style={{ textAlign: "right" }}>Delete</th>
              </tr>
            </thead>
            {loading && (
              <tbody>
                <tr>
                  <td colSpan={"5"} className={"text-center"}>
                    Loading...
                  </td>
                </tr>
              </tbody>
            )}
            {!loading && (
              <tbody>
                {projects.map((project) => (
                  <Project key={project.id} project={project} onDelete={onDelete} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}
      {!loading && projects.length < 1 && <NoRecordsMessage type={"projects"} />}
    </div>
  );
}
