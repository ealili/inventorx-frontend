import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import PageHeader from "../../components/page-header/page-header.component.jsx";
import { FormContainer } from "../../components/shared/shared.styles.jsx";
import { setNotification } from "../../store/notification/notification.action.js";

export default function ClientForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [client, setClient] = useState({
    id: null,
    company_name: "",
    address: "",
    website: "",
  });

  useEffect(() => {
    if (!isNaN(id)) {
      setLoading(true);
      axiosClient
        .get(`clients/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setClient(data.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (client.id) {
      axiosClient
        .put(`clients/${client.id}`, client)
        .then(() => {
          dispatch(setNotification("Client has been updated successfully"));
          navigate("/clients");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/clients", client)
        .then(() => {
          dispatch(setNotification("Client has been created successfully"));
          navigate("/clients");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {client.id && <PageHeader model={"Client"} title={client.company_name} />}
      {!client.id && <h2>Create Client</h2>}
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
            <label className="form-label">Company Name</label>
            <input
              placeholder={"Company Name"}
              onChange={(e) => setClient({ ...client, company_name: e.target.value })}
              value={client.company_name}
            />
            <label className="form-label">Address</label>
            <input
              placeholder={"Address"}
              onChange={(e) => setClient({ ...client, address: e.target.value })}
              value={client.address}
              type={"text"}
            />
            <label className="form-label">Website</label>
            <input
              placeholder={"Website"}
              onChange={(e) => setClient({ ...client, website: e.target.value })}
              value={client.website}
              type={"text"}
            />
            <button className="btn">Save</button>
          </form>
        )}
      </FormContainer>
    </>
  );
}
