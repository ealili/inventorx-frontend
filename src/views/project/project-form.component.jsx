import { useNavigate, useParams } from "react-router-dom";
import axiosClient, { request } from "../../axios-client.js";
import { useEffect, useState } from "react";
import FormInput from "../../components/form-input/FormInput.jsx";
import PageHeader from "../../components/page-header/page-header.component.jsx";
import { FormContainer } from "../../components/shared/shared.styles.jsx";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [project, setProject] = useState({
    id: null,
    name: "",
    deadline: getCurrentDate(),
    description: "",
    client_id: "",
  });

  const [projectStatuses, setprojectStatuses] = useState(null);
  const [selectedStatus, setselectedStatus] = useState();
  const [clients, setClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState();

  useEffect(() => {
    fetchProjectStatuses();
    fetchClients();

    if (parseInt(id)) {
      setLoading(true);

      axiosClient
        .get(`projects/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setProject(data.data);
          setselectedStatus(data.data.status.id);
          setSelectedClient(data.data.client.id);
        })
        .catch((err) => {
          navigate("/notfound");
          // Set error
          setLoading(false);
        });
    }
  }, [id]);

  const fetchProjectStatuses = async () => {
    const response = await request("GET", "statuses");
    setprojectStatuses(response);

    if (typeof id !== "number") {
      setselectedStatus(response[0].id);
    }
  };

  const fetchClients = async () => {
    const response = await request("GET", "clients");
    setClients(response);

    if (response.length > 0 && typeof id !== "number") {
      setSelectedClient(response[0].id);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...project,
      project_status_id: parseInt(selectedStatus),
      client_id: parseInt(selectedClient),
    };

    if (project.id) {
      axiosClient
        .put(`projects/${project.id}`, payload)
        .then(() => {
          //   setNotification("Project updated successfully");
          navigate("/projects");
        })
        .catch((err) => {
          const response = err.response;
          console.log(response);
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/projects", payload)
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

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
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
      {clients?.length < 1 ? (
        <h3>Ops you don't have any clients yet</h3>
      ) : (
        <FormContainer>
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
              {/* TODO: Optimize, create new Select Component */}
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
                    <option key={projectStatus.id} value={projectStatus.id}>
                      {projectStatus.status}
                    </option>
                  ))}
              </select>
              <br />
              <br />
              {clients && (
                <>
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
                    value={selectedClient}
                    onChange={handleClientChange}
                  >
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.company_name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                </>
              )}
              <label htmlFor="deadline"> Deadline</label>
              <input
                type="date"
                id="start"
                value={getDateOnly(project.deadline)}
                onChange={(e) => setProject({ ...project, deadline: e.target.value })}
                min={getCurrentDate()}
                style={{ marginTop: "10px" }}
              />
              <FormInput
                label={"Description"}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                value={project.description}
              />
              <br />
              <button className="btn">Save</button>
            </form>
          )}
        </FormContainer>
      )}
    </>
  );
};

export default ProjectForm;
