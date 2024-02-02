import {createBrowserRouter, Navigate} from "react-router-dom";
import GuestLayout from "./components/guest-layout.component.jsx";
import UserLayoutComponent from "./components/user-layout.component.tsx";
import Dashboard from "./routes/dashboard/dashboard.component.tsx";
import Users from "./routes/users/users.component.tsx";
import Profile from "./routes/profile/profile.component.tsx";
import NotFound from "./routes/not-found/not-found.component.tsx";
import Login from "./routes/auth/Login.tsx";
import RegisterComponent from "./routes/auth/Register/register.component.tsx";
import ForgotPassword from "./routes/auth/forgot.password.tsx";
import ResetPassword from "./routes/users/ResetPassword.tsx";
import UserCreationForm from "./routes/users/user-creation-form.component.tsx";
import UserInvitations from "./routes/invitations/user-invitations.component.tsx";
import UserInvitationForm from "./routes/invitations/user-invitation-form.component.tsx";
import UserForm from "./routes/users/user-form.component.tsx";
import LandingPage from "./routes/landing/landing-page.component.tsx";
import WorkingHours from "./routes/working-hours/working-hours.component.tsx";

const root = localStorage.getItem("persist:root");
let currentUserRole = "Guest";

if (root) {
  const currentUser = JSON.parse(root)?.user;
  console.log("Current User:", currentUser);
  if (currentUser) {
    currentUserRole = currentUser?.role?.name;
  }
}

const userRoutes = [
  {
    path: "/",
    element: <Navigate to={"/dashboard"}/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
];

const adminRoutes = [
  {
    path: "/",
    element: <Navigate to={"/dashboard"}/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/users",
    element: <Users/>,
  },
  {
    path: "/users/:id",
    element: <UserForm key={"userUpdate"}/>,
  },
  {
    path: "/invitations",
    element: <UserInvitations key={'user-invitations'}/>,
  },
  {
    path: "/invite",
    element: <UserInvitationForm key={'user-invitation'}/>,
  },
  {
    path: "/working-hours",
    element: <WorkingHours/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/",
    element: <UserLayoutComponent/>,
    children:
      currentUserRole == "User"
        ? userRoutes.map((route) => ({...route, caseSensitive: false}))
        : adminRoutes.map((route) => ({...route, caseSensitive: false})),
  },
  {
    path: "/",
    element: <GuestLayout/>,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <RegisterComponent/>,
      },
      {
        path: "/forgot",
        element: <ForgotPassword/>,
      },
      {
        path: "/reset/:token/:email",
        element: <ResetPassword/>,
      },
      {
        path: "/users/create/:token",
        element: <UserCreationForm key={'user-create'}/>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);

export default router;
