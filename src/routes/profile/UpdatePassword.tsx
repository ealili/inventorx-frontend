import React, {useState} from "react";
import {Button} from "@mui/material";
import {updatePasswordRequest} from "../../services/AuthService.ts";
import {useTranslation} from "react-i18next";

export default function UpdatePassword() {
  const {t} = useTranslation()
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
        {t('updatePassword')}
      </Button>
    );
  }

  return (
    <form onSubmit={handleUpdatePassword}>
      <br/>
      <h2>{t('updatePassword')}</h2>
      <br/>
      <input
        onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
        placeholder={t('currentPassword')}
        type={"password"}
      />
      <input
        onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
        placeholder={t('newPassword')}
        type={"password"}
      />
      <input
        onChange={(e) => setPasswordForm({
          ...passwordForm,
          new_password_confirmation: e.target.value
        })}
        placeholder={t('newPasswordConfirmation')}
        type={"password"}
      />
      <button type={"submit"} className="btn">
        {t('updatePassword')}
      </button>
      &nbsp;
      <button className="btn" type="submit" onClick={() => setShowForm(false)}>
        {t('close')}
      </button>
    </form>

  )
}