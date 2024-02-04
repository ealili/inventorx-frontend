import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import FormInput from "../../components/form-input/form-input.component.jsx";
import {PageHeaderContainer} from "./shared.styles.tsx";
import {getUser, updateUser} from "../../services/UserService.ts";
import LoadingSpinner from "../../components/loadingSpinner.component.tsx";

export default function UserForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
  });

  useEffect(() => {
    console.log('id', id);
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    console.log('Fetching user');
    if (id) {
      setLoading(true);
      try {
        const user = await getUser(id);
        console.log('user', user);
        setUser(user);
      } catch (err) {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
  }

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    try {
      const response = await updateUser(id, user)
      console.log("response", response);

      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/users");
    }
  };

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <PageHeaderContainer>
        <h1>Update User</h1>
      </PageHeaderContainer>
      {user.id && <div title={`${user.name}`}/>}
      {/*{!user.id && <h2>Update User</h2>}*/}
      <div>
        {loading && <div className="text-center">Loading...</div>}
        {/*{errors && (*/}
        {/*  <div className={"alert"}>*/}
        {/*    {Object.keys(errors).map((key) => (*/}
        {/*      <p key={key}>{errors[key][0]}</p>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*)}*/}
        {!loading && (
          <form onSubmit={handleUpdateUser}>
            <br/>
            <FormInput
              label={"Name"}
              name={"Name"}
              type={"text"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({
                ...user,
                name: e.target.value
              })}
              value={user.name}
            />
            {/*<FormInput*/}
            {/*  label={"Email"}*/}
            {/*  name={"email"}*/}
            {/*  type={"email"}*/}
            {/*  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value })}*/}
            {/*  value={user.email}*/}
            {/*/>*/}
            {/*{!id && (*/}
            {/*  <>*/}
            {/*    <FormInput*/}
            {/*      label={"Password"}*/}
            {/*      name={"password"}*/}
            {/*      type={"password"}*/}
            {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: e.target.value })}*/}
            {/*      value={user.password}*/}
            {/*    />*/}
            {/*    <FormInput*/}
            {/*      label={"Password Confirmation"}*/}
            {/*      name={"password"}*/}
            {/*      type={"password"}*/}
            {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password_confirmation: e.target.value })}*/}
            {/*      value={user.password_confirmation}*/}
            {/*    />*/}
            {/*  </>*/}
            {/*)}*/}
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
