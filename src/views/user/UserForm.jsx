import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { useStateConetxt } from "../../contexts/ContextProvider.jsx";
import FormInput from "../../components/form-input/FormInput.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { setNotification } = useStateConetxt();

  useEffect(() => {
    console.log(id);
    if (id) {
      setLoading(true);
      axiosClient
        .get(`users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.id) {
      axiosClient
        .put(`users/${user.id}`, user)
        .then(() => {
          setNotification("User updated successfully");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User created successfully");
          navigate("/users");
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
      {user.id && (
        <h2>
          Update User:{" "}
          <b>
            {user.name} ({user.email})
          </b>
        </h2>
      )}
      {!user.id && <h2>Create User</h2>}
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
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
            <FormInput
              label={"Email"}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type={"email"}
            />
            <FormInput
              label={"Password"}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              type={"password"}
            />
            <FormInput
              label={"Password Confirmation"}
              onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
              value={user.password_confirmation}
              type={"password"}
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
