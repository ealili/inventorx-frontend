import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { FiUser, FiUsers } from "react-icons/fi";
import { TbUsersGroup } from "react-icons/tb";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { NavLink, TeamLogo } from "./default-layout.styles.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectToken } from "../store/user/user.selector.js";
import { logoutUser } from "../store/user/user.action.js";
import { selectNotification } from "../store/notification/notification.selector.js";
import { useEffect } from "react";
import { setNotification } from "../store/notification/notification.action.js";

export default function DefaultLayout() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const notification = useSelector(selectNotification);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotification(""));
  }, []);

  // const fetchUser = async () => {
  //   setLoading(true)
  //   try {
  //     const user = await getAuthenticatedUser()
  //     setUser(user)
  //   } catch (err) { /* empty */
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  if (!token) {
    console.log("Invalid token");

    return <Navigate to={"/login"} />;
  }

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("logout").then(() => {
      dispatch(logoutUser());
    });
  };

  return (
    <div id={"defaultLayout"}>
      <aside>
        <TeamLogo>{user.team?.name}</TeamLogo>
        <NavLink to={"/dashboard"}>
          <RxDashboard style={{ fontSize: "22px", margin: "0 10px" }} />
          Dashboard
        </NavLink>
        {user.role?.name === "Admin" ? (
          <>
            <NavLink to={"/users"}>
              <FiUsers style={{ fontSize: "22px", margin: "0 10px" }} />
              Users
            </NavLink>
            <NavLink to={"/clients"}>
              <TbUsersGroup style={{ fontSize: "22px", margin: "0 10px" }} />
              Clients
            </NavLink>
            <NavLink to={"/projects"}>
              <AiOutlineFundProjectionScreen style={{ fontSize: "22px", margin: "0 10px" }} />
              Projects
            </NavLink>
          </>
        ) : (
          ""
        )}
        <NavLink to={`/profile/${user.id}`}>
          <FiUser style={{ fontSize: "22px", margin: "0 10px" }} />
          Profile
        </NavLink>
      </aside>
      <div className="content">
        <header>
          <div>
            <h2 id={"greeting"}>
              <img
                className="v-aligned-image"
                height={"45px"}
                width={"45px"}
                src={user.avatar}
                alt={"User"}
              />
              &nbsp; &nbsp;
              {user.name}
            </h2>
          </div>
          <div>
            <a href="#" onClick={onLogout} className={"btn-logout"}>
              Log out
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      {notification && <div className={"notification"}>{notification}</div>}
    </div>
  );
}
