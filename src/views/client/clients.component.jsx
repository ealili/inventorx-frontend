import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { setNotification } from "../../store/notification/notification.action.js";
import { useDispatch } from "react-redux";
import Client from "./client.component.jsx";
import { getClients } from "../../services/ClientService.js";
import {
  NoDataFoundYetContainer,
  PageHeaderContainer,
} from "../../components/shared/shared.styles.jsx";
import NoRecordsMessage from "../../components/no-records-message/no-records-message.component.jsx";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const clients = await getClients();
      setClients(clients);
    } catch (err) {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  const onDelete = (client) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    console.log(client.id);

    axiosClient.delete(`/clients/${client.id}`).then(() => {
      dispatch(setNotification("Client was deleted successfully"));
      // Update Clients, fetch again
      fetchClients();
    });
  };

  return (
    <div>
      <PageHeaderContainer>
        <h1>Clients</h1>
        <Link
          style={{ padding: "10px 40px", fontSize: "16px" }}
          className={"btn-add"}
          to={"/clients/new"}
        >
          Create
        </Link>
      </PageHeaderContainer>

      {!loading && clients.length > 0 && (
        <div className={"card animated fadeInDown"}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                {/*<th>Website</th>*/}
                <th>Created at</th>
                <th>Edit</th>
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
                {clients.map((client) => (
                  <Client key={client.id} client={client} onDelete={onDelete} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}
      {!loading && clients.length < 1 && <NoRecordsMessage type={"clients"} />}
    </div>
  );
}
