import React, {useState} from "react";
import {Button} from "@mui/material";
import {updatePasswordRequest} from "../../services/AuthService.ts";

export default function UpdatePassword() {
  // const [displayPassForm, setDisplayPassForm] = useState("none");
  const [showForm, setShowForm] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    try {
      const response = await updatePasswordRequest(passwordForm);
      console.log("response", response);

      setShowForm(false);
      alert("User password updated successfully!");
      // setDisplayPassForm("none");
    } catch (err) {
      console.error(err);
    }
  };

  if (!showForm) {
    return (
      <Button variant="contained"
              className={"btn-add"}
              onClick={() => setShowForm(true)}>
        Update Password
      </Button>
    );
  }

  return (
    <form onSubmit={handleUpdatePassword}>
      <br/>
      <h2>Change your password</h2>
      <br/>
      <input
        onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
        placeholder={"Current Password"}
        type={"password"}
      />
      <input
        onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
        placeholder={"New Password"}
        type={"password"}
      />
      <input
        onChange={(e) => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})}
        placeholder={"New Password Confirmation"}
        type={"password"}
      />
      <button type={"submit"} className="btn">
        Update Password
      </button>
      &nbsp;
      <button className="btn" type="submit" onClick={() => setShowForm(false)}>
        Close
      </button>
    </form>

  )
}