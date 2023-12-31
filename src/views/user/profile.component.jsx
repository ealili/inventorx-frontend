import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { FormContainer, PageHeaderContainer } from "../../components/shared/shared.styles.jsx";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/notification/notification.action.js";

export default function Profile() {
  const dispatch = useDispatch;
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

  const [updateProfilePicture, setUpdateProfilePicture] = useState(false);

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
          dispatch(setNotification("User updated successfully"));
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
          dispatch(setNotification("User created successfully"));
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

  const handleProfilePictureChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    axiosClient
      .post(`avatar`, formData)
      .then(({ data }) => {
        console.log("Profile picture updated");
        // Update the user state with the new avatar URL
        setUser({ ...user, avatar: data.avatar });
        setUpdateProfilePicture(false);
        dispatch(setNotification("Profile picture updated successfully"));
      })
      .catch((err) => {
        console.error(err);
      });
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
      {user.id && (
        <PageHeaderContainer>
          <h1>Profile</h1>
        </PageHeaderContainer>
      )}
      <FormContainer>
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className={"alert"}>
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {/* TODO: Make profile picture component */}

        <img src={user.avatar} width={120} height={"auto"} alt="" />
        {updateProfilePicture && (
          <input
            type="file"
            id="profile-picture"
            name="avatar"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        )}
        <br />
        {!updateProfilePicture && (
          <button
            style={{ width: "30%", padding: "5px", fontSize: "12px" }}
            className="btn"
            onClick={() => setUpdateProfilePicture(true)}
          >
            Update profile picture
          </button>
        )}
        <hr />

        {!loading && (
          <form onSubmit={onSubmit}>
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
      </FormContainer>
    </>
  );
}
