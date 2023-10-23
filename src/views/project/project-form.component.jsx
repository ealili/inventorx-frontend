import { useNavigate, useParams } from "react-router-dom";
import axiosClient, { request } from "../../axios-client.js";
import { useEffect, useState } from "react";
import FormInput from "../../components/form-input/FormInput.jsx";
import PageHeader from "../../components/page-header/page-header.component.jsx";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [project, setProject] = useState({
    id: null,
    name: "",
    status: "",
    deadline: "",
  });

  const [projectStatuses, setprojectStatuses] = useState(null);
  const [selectedStatus, setselectedStatus] = useState();

  useEffect(() => {
    if (id) {
      setLoading(true);

      fetchProjectStatuses();

      axiosClient
        .get(`projects/${id}`)
        .then(({ data }) => {
          console.log(data);

          setLoading(false);
          setProject(data.data);
          setselectedStatus(data.data.status.status);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  const fetchProjectStatuses = async () => {
    const response = await request("GET", "statuses");
    setprojectStatuses(response);
    console.log(response);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (project.id) {
      axiosClient
        .put(`projects/${project.id}`, project)
        .then(() => {
          //   setNotification("Project updated successfully");
          navigate("/projects");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/projects", project)
        .then(() => {
          //   setNotification("Project created successfully");
          navigate("/projects");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleStatusChange = (e) => {
    setselectedStatus(e.target.value);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  function getDateOnly(datetimeString) {
    const dateTimeParts = datetimeString.split(" ");
    const dateParts = dateTimeParts[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const dateOnly = `${year}-${month}-${day}`;
    return dateOnly;
  }

  return (
    <>
      {project.id && <PageHeader model={"Project"} title={project.name} />}
      {!project.id && <h2>Create Project</h2>}
      <div className={"card animated fadeInDown"}>
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className={"alert"}>
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <FormInput
              label={"Name"}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              value={project.name}
            />
            {/* TODO: Get request to get statuses from backend*/}
            <label htmlFor="status">Status</label>
            <select
              style={{
                padding: "15px 10px",
                width: "100%",
                marginTop: "10px",
                borderColor: "#ccc",
                borderRadius: "5px",
              }}
              name="project"
              id=""
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {projectStatuses &&
                projectStatuses.map((projectStatus) => (
                  <option key={projectStatus.id} value={projectStatus.status}>
                    {projectStatus.status}
                  </option>
                ))}
            </select>
            <br />
            <br />
            <label htmlFor="deadline"> Deadline</label>
            <input
              type="date"
              id="start"
              value={getDateOnly(project.deadline)}
              onChange={(e) => setProject({ ...project, deadline: e.target.value })}
              min={getCurrentDate()}
              style={{ marginTop: "10px" }}
            />

            {/* <FormInput
              label={"Status"}
              onChange={(e) => setProject({ ...project, address: e.target.value })}
              value={project.status?.status}
              type={"text"}
            /> */}
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProjectForm;
