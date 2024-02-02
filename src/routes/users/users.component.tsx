import {useDispatch} from "react-redux";
import {setHeaderTitle} from "../../store/header/headerSlice.ts";
import {useEffect, useState} from "react";
import User from "./user.component.tsx";
import NoRecordsMessage from "./no-records-message.component.tsx";
import {UserInterface} from "../../store/user/user.interface.ts";
import LoadingSpinner from "../../components/loadingSpinner.component.tsx";
import './users.styles.scss'
import {PageHeaderContainer} from "./shared.styles.tsx";
import {Table} from "react-bootstrap";
import {getUsers} from "../../services/UserService.ts";
import {useTranslation} from "react-i18next";

export default function Users() {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setHeaderTitle(t('usersLink')));
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log('Fetching users')
    setLoading(true);
    try {
      const users = await getUsers();
      console.log(users);
      setUsers(users);
    } catch (err) {
      /* empty */
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {loading ? (<LoadingSpinner/>) : (
        <div>
          <PageHeaderContainer>
            <h1>Users Table</h1>
          </PageHeaderContainer>
          <div className={"card animated fadeInDown"}>
            <Table striped responsive>
              <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {users.map((user: UserInterface) => (
                <User key={user.id} user={user} access_token={''}/>
              ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {!loading && users.length < 1 && <NoRecordsMessage type={"users"}/>}
    </div>
  );
}
