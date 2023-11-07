import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/UserService.js";
import { PageHeaderContainer } from "../../components/shared/shared.styles.jsx";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/notification/notification.action.js";
import User from "./user.component.jsx";

export default function Users() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  const onDelete = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    console.log(user.id);

    axiosClient.delete(`/users/${user.id}`).then(() => {
      // Update Users, fetch again
      dispatch(setNotification("User was deleted successfully"));
      fetchUsers();
    });
  };

  return (
    <div>
      <PageHeaderContainer>
        <h1>Users</h1>
        <Link
          style={{ padding: "10px 40px", fontSize: "16px" }}
          className={"btn-add"}
          to={"/users/new"}
        >
          Create
        </Link>
      </PageHeaderContainer>

      <div className={"card animated fadeInDown"}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created at</th>
              <th>Actions</th>
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
              {users.map((user) => (
                <User key={user.id} user={user} onDelete={onDelete} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
