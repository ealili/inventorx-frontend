import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { FiUser, FiUsers } from "react-icons/fi";
import { TbUsersGroup } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { LogOutLink, NavLink, TeamLogo } from "./default-layout.styles.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectToken } from "../store/user/user.selector.js";
import { logoutUser } from "../store/user/user.action.js";
import { selectNotification } from "../store/notification/notification.selector.js";
import { useEffect, useState } from "react";
import { setNotification } from "../store/notification/notification.action.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Logout } from "@mui/icons-material";

const drawerWidth = 240;

export default function DefaultLayout() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false)

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const drawer = (
    <div>
      <List style={{ backgroundColor: "#000b1a", color: "white" }}>
        <ListItem disablePadding>
          {/* Make it a button to go to profile */}
          <ListItemText style={{ textAlign: "center", margin: "12px" }} primary={user.name} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <aside>
          <NavLink to={"/dashboard"}>
            <RxDashboard style={{ fontSize: "22px", margin: "0 10px" }} />
            Dashboard
          </NavLink>
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
        </aside>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <LogOutLink href="#" onClick={onLogout}>
            <ListItemButton>
              <ListItemIcon>
                <IoExitOutline style={{ fontSize: "24px" }} />
              </ListItemIcon>
              <ListItemText primary={"Log out"} />
            </ListItemButton>
          </LogOutLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{ backgroundColor: "#000b1a", border: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {user.team?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
