import {Outlet, Navigate} from "react-router-dom";
import {FiUser, FiUsers} from "react-icons/fi";
import {TbUsersGroup} from "react-icons/tb";
import {RxExit} from "react-icons/rx";
import {RxDashboard} from "react-icons/rx";
import {LogOutLink, NavLink} from "./user-layout.styles.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, selectToken} from "../store/user/user.selector.js";
import {logoutUser} from "../store/user/userSlice.ts";
import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {selectHeaderTitle} from "../store/header/header.selector.ts"
import {UserInterface} from "../store/user/user.interface.ts";
import { TbClockHour5 } from "react-icons/tb";
import {
  selectNotification,
  selectNotificationType
} from "../store/notification/notification.selector.ts";
import {AppDispatch} from "../store/store.ts";
import {useTranslation} from "react-i18next";
import i18n from "../i18n.ts";
import {logout} from "../services/AuthService.ts";


const drawerWidth = 240;

export default function UserLayoutComponent() {
  const {t} = useTranslation();
  const user: UserInterface = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const headerTitle: string = useSelector(selectHeaderTitle);
  const notification = useSelector(selectNotification);
  const notificationType = useSelector(selectNotificationType)

  // TODO: Move to a separate file
  const lngs = {
    de: {
      nativeName: 'DE',
      flag: 'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png'
    },
    en: {
      nativeName: 'EN',
      flag: 'https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png'
    }
  };

  // const notification = useSelector(selectNotification);
  const dispatch = useDispatch<AppDispatch>();
  // const [loading, setLoading] = useState(false)

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!token) {
    console.log("Invalid token", token);
    return <Navigate to={"/login"}/>;
  }

  const notificationStyle = {
    backgroundColor: notificationType === 'success' ? '#00a762' : 'red'
  };


  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      await logout();
      dispatch(logoutUser());
    } catch (err)
    {
      console.error(err)
    }
  };

  const AdminDrawer = (
    <div>
      <List style={{backgroundColor: "#F5F5F5", color: "black"}}>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography variant="h6" noWrap component="div">
              {user.team?.name}
            </Typography>
          </ListItemButton>
          <ListItemText style={{textAlign: "center", margin: "12px"}}/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <aside>
          <NavLink to={"/dashboard"} onClick={() => closeDrawer()}>
            <RxDashboard style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('dashboard')}
          </NavLink>
          <NavLink to={"/team/users"} onClick={() => closeDrawer()}>
            <FiUsers style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('usersLink')}
          </NavLink>
          <NavLink to={`/team/working-hours/`} onClick={() => closeDrawer()}>
            <TbClockHour5 style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('workingHours')}
          </NavLink>
          <NavLink to={`/team/invitations/`} onClick={() => closeDrawer()}>
            <TbUsersGroup style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('invitationsLink')}
          </NavLink>
          {/*<NavLink to={`/profile/${users}`} onClick={()=> closeDrawer()}>*/}
          <NavLink to={`/profile/`} onClick={() => closeDrawer()}>
            <FiUser style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('profileLink')}
          </NavLink>
        </aside>
      </List>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <LogOutLink href="#">
            <ListItemButton component="span" onClick={onLogout}>
              <ListItemIcon>
                <RxExit style={{fontSize: "22px", margin: "0 10px", color: 'black'}}/>
              </ListItemIcon>
              <ListItemText primary={t('logoutLink')}/>
            </ListItemButton>
          </LogOutLink>
        </ListItem>
      </List>
    </div>
  );

  const UserDrawer = (
    <div className={'admin'}>
      <List style={{backgroundColor: "#F5F5F5", color: "black"}}>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography variant="h6" noWrap component="div">
              {user.team?.name}
            </Typography>
          </ListItemButton>
          <ListItemText style={{textAlign: "center", margin: "12px"}}/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <aside>
          <NavLink to={"/dashboard"} onClick={() => closeDrawer()}>
            <RxDashboard style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('dashboard')}
          </NavLink>
          <NavLink to={`/my-working-hours`} onClick={() => closeDrawer()}>
            <TbClockHour5 style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('My Working Hours')}
          </NavLink>
          <NavLink to={`/profile/`} onClick={() => closeDrawer()}>
            <FiUser style={{fontSize: "22px", margin: "0 10px"}}/>
            {t('profileLink')}
          </NavLink>
        </aside>
      </List>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <LogOutLink href="#">
            <ListItemButton component="span" onClick={onLogout}>
              <ListItemIcon>
                <RxExit style={{fontSize: "22px", margin: "0 10px", color: 'black'}}/>
              </ListItemIcon>
              <ListItemText primary={t('logoutLink')}/>
            </ListItemButton>
          </LogOutLink>
        </ListItem>
      </List>
    </div>
  );

  const drawer = user.role.name == "Admin" ? AdminDrawer : UserDrawer;

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}
        style={{backgroundColor: "#F5F5F5", border: "none", color: 'black'}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: "none"}}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {headerTitle}
          </Typography>
          <div style={{marginLeft: 'auto'}}>
            <>
              {Object.keys(lngs).map((lng) => (
                <button
                  key={lng}
                  style={{
                    fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
                    backgroundColor: 'transparent',
                    border: 'none'
                  }}
                  type="submit"
                  onClick={() => i18n.changeLanguage(lng)}
                >
                  <div className={'d-flex my-auto justify-content-center align-items-center'}>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/*// @ts-expect-error*/}
                    <img height={15} width={25} src={lngs[lng].flag} alt=""/>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/*// @ts-expect-error*/}
                    <span className="mx-1" style={{fontSize: '12px'}}>{lngs[lng].nativeName}</span>
                  </div>
                </button>
              ))}
            </>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
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
            display: {xs: "block", sm: "none"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
        {/* Drawer for desktop screens, does not open by default */}
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: "none", sm: "block"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
          open={mobileOpen} // This will now be controlled by the same state as the mobile drawer
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{flexGrow: 1, p: 2, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
      >
        <Toolbar/>
        <Outlet/>
        {notification &&
          <div className={"notification"} style={notificationStyle}>{notification}</div>}
      </Box>
    </Box>
  );
}
