import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateConetxt} from "../contexts/ContextProvider.jsx";

export default function Users() {
  const {setNotification} = useStateConetxt()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        console.log(data)
        setLoading(false)

        setUsers(data.data)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const onDelete = (user) => {

    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    console.log(user.id)

    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was deleted successfully')
        // Update Users, fetch again
        getUsers();
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link className={'btn-add'} to={'/users/new'}>Add new</Link>
      </div>

      <div className={'card animated fadeInDown'}>
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Actions</th>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
                <Link className={'btn-edit'} to={'/users/' + user.id}>Edit</Link>
                &nbsp;
                <button onClick={(e) => onDelete(user)} className={'btn-delete'}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  )
}