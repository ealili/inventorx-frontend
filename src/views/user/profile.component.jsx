import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { useStateConetxt } from "../../contexts/ContextProvider.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    avatar: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [displayPassForm, setDisplayPassForm] = useState("none");
  const [displayBtn, setDisplayBtn] = useState("");
  const { setNotification } = useStateConetxt();

  useEffect(() => {
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

  const updatePassword = (e) => {
    e.preventDefault();

    setPasswordErrors([]);

    if (user.id) {
      axiosClient
        .put(`password`, {
          current_password: user.current_password,
          new_password: user.new_password,
          new_password_confirmation: user.new_password_confirmation,
        })
        .then(() => {
          setNotification("Password updated successfully.");
          setUser({
            ...user,
            current_password: "",
            new_password: "",
            new_password_confirmation: "",
          });
          setDisplayBtn("");
          setDisplayPassForm("none");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setPasswordErrors(response.data.errors);
          }
        });
    }
  };

  const handleClick = (e) => {
    setErrors(null);
    setDisplayPassForm("block");
    setDisplayBtn("none");
  };

  const handleCloseClick = (e) => {
    setErrors(null);
    setDisplayPassForm("none");
    setDisplayBtn("");
  };

  return (
    <>
      {user.id && <h2>Profile</h2>}
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
            {/*TODO: Put avatar into a new image form*/}
            {/*<img src={user.avatar} width={60} height={60} alt=""/><br/>*/}
            {/*<button style={{backgroundColor: 'White', color: 'black', borderRadius: '10px'}}>Change</button>*/}
            {/*<input type="file" id="img" name="img" accept="image/*" />*/}

            <div style={{ marginTop: "1%" }}></div>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              placeholder={"Name"}
            />
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              placeholder={"Email"}
              type={"email"}
              disabled={true}
            />

            <button className="btn">Save</button>
          </form>
        )}

        <div style={{ marginTop: "5%" }}></div>

        <form style={{ display: `${displayPassForm}` }} onSubmit={updatePassword}>
          {passwordErrors && (
            <div className={"alert"}>
              {Object.keys(passwordErrors).map((key) => (
                <p key={key}>{passwordErrors[key][0]}</p>
              ))}
            </div>
          )}
          <h2>Change your password</h2>
          <br />
          <input
            onChange={(e) => setUser({ ...user, current_password: e.target.value })}
            placeholder={"Current Password"}
            type={"password"}
          />
          <input
            onChange={(e) => setUser({ ...user, new_password: e.target.value })}
            placeholder={"New Password"}
            type={"password"}
          />
          <input
            onChange={(e) => setUser({ ...user, new_password_confirmation: e.target.value })}
            placeholder={"New Password Confirmation"}
            type={"password"}
          />
          <button type={"submit"} className="btn">
            Update Password
          </button>
          &nbsp;
          <button className={"btn"} type={"button"} onClick={handleCloseClick}>
            Close
          </button>
        </form>
        <button style={{ display: `${displayBtn}` }} onClick={handleClick} className={"btn"}>
          Change Password
        </button>
      </div>
    </>
  );
}
