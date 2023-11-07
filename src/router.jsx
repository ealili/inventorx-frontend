import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import Signup from "./views/auth/Signup.jsx";
import Users from "./views/user/users.component.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import UserForm from "./views/user/user-form.component.jsx";
import ForgotPassword from "./views/auth/ForgotPassword.jsx";
import ResetPassword from "./views/user/ResetPassword.jsx";
import Profile from "./views/user/profile.component.jsx";
import Clients from "./views/client/clients.component.jsx";
import Projects from "./views/project/projects.component.jsx";
import ClientForm from "./views/client/client-form.component.jsx";
import Dashboard from "./views/dashboard/dashboard.component.jsx";
import ProjectForm from "./views/project/project-form.component.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        // Can also be rendered directly, this is navigated...
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key={"userCreate"} />,
      },
      {
        path: "/users/:id",
        element: <UserForm key={"userUpdate"} />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/clients/:id",
        element: <ClientForm key={"clientUpdate"} />,
      },
      {
        path: "/clients/:id",
        element: <ClientForm key={"clientCreate"} />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:id",
        element: <ProjectForm key={"projectUpdate"} />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/reset/:token/:email",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
