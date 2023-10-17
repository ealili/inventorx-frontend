import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import Signup from "./views/auth/Signup.jsx";
import Users from "./views/user/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/user/UserForm.jsx";
import ForgotPassword from "./views/auth/ForgotPassword.jsx";
import ResetPassword from "./views/user/ResetPassword.jsx";
import Profile from "./views/user/Profile.jsx";
import Clients from "./views/client/Clients.jsx";
import Projects from "./views/project/Projects.jsx";
import ClientForm from "./views/client/ClientForm.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        // Can also be rendered directly, this is navigated...
        element: <Navigate to={'/users'}/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/profile/:id',
        element: <Profile/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key={'userCreate'}/>
      },
      {
        path: '/users/:id',
        element: <UserForm key={'userUpdate'}/>
      },
      {
        path: '/clients',
        element: <Clients/>
      },
      {
        path: '/clients/:id',
        element: <ClientForm key={'clientUpdate'}/>
      },
      {
        path: '/clients/:id',
        element: <ClientForm key={'clientCreate'}/>
      },
      {
        path: '/projects',
        element: <Projects/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/forgot',
        element: <ForgotPassword/>
      },
      {
        path: '/reset/:token/:email',
        element: <ResetPassword/>
      },
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  },
]);


export default router;