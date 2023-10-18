import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateConetxt} from "../../contexts/ContextProvider.jsx";
import {getUsers} from "../../services/UserService.js";
import {PageHeader} from "../../components/shared/shared.styles.jsx";
import {RxCross2} from "react-icons/rx";
import {BiEditAlt} from "react-icons/bi";

export default function Users() {
    const {setNotification} = useStateConetxt()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (err) { /* empty */
        }
        setLoading(false)

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
                fetchUsers();
            })
    }

    return (<div>
        <PageHeader>
            <h1>Users</h1>
            <Link style={{padding: '10px 40px', fontSize: '16px'}} className={'btn-add'} to={'/users/new'}>
                Create
            </Link>
        </PageHeader>

        <div className={'card animated fadeInDown'}>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created at</th>
                    <th>Actions</th>
                    <th style={{textAlign: 'right'}}>Delete</th>
                </tr>
                </thead>
                {loading && <tbody>
                <tr>
                    <td colSpan={'5'} className={'text-center'}>
                        Loading...
                    </td>
                </tr>
                </tbody>}
                {!loading && <tbody>
                {users.map(user => (<tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                        <Link style={{textDecoration: 'none'}} to={'/users/' + user.id}><BiEditAlt
                            style={{color: 'black', fontSize: '20px'}}/></Link>
                        &nbsp;
                    </td>
                    <td style={{textAlign: 'right'}}>
                        <RxCross2 id={'cross-button'} style={{color: 'red', fontSize: '22px'}}
                                  onClick={(e) => onDelete(user)}/>
                    </td>
                </tr>))}
                </tbody>}
            </table>
        </div>
    </div>);
}