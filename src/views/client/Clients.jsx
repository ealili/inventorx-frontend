import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateConetxt} from "../../contexts/ContextProvider.jsx";
import Client from "./Client.jsx";
import {getClients} from "../../services/ClientService.js";

export default function Clients() {
  const {setNotification} = useStateConetxt()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    try {
      const clients = await getClients();
      setClients(clients);
    } catch (err) { /* empty */
    } finally {
      setLoading(false)
    }
  }

  const onDelete = (client) => {

    if (!window.confirm('Are you sure you want to delete this client?')) {
      return
    }

    console.log(client.id)

    axiosClient.delete(`/clients/${client.id}`)
      .then(() => {
        setNotification('Client was deleted successfully')
        // Update Clients, fetch again
        getClients();
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Clients</h1>
        <Link className={'btn-add'} to={'/clients/new'}>Add new</Link>
      </div>

      <div className={'card animated fadeInDown'}>
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            {/*<th>Website</th>*/}
            <th>Created at</th>
          </tr>
          </thead>
          {loading && <tbody>
          <tr>
            <td colSpan={'5'} className={'text-center'}>
              Loading...
            </td>
          </tr>
          </tbody>
          }
          {!loading && <tbody>
          {clients.map(client => (
            <Client key={client.id} client={client} onDelete={onDelete}/>
          ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  );
}