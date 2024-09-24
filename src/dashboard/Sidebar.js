import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // For CreateUser
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: 250,
        backgroundColor: "#C7253E",
        color: "#fff",
        height: "100vh",
        padding: "20px 0",
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/courses">
          <ListItemIcon>
            <SchoolIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <ContactMailIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/analytics">
          <ListItemIcon>
            <BarChartIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ListItemIcon>
            <PieChartIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <GroupIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/create-user">
          <ListItemIcon>
            <PersonAddIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Create User" />
        </ListItem>

        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/calendar">
          <ListItemIcon>
            <CalendarTodayIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button component={Link} to="/tasks">
          <ListItemIcon>
            <AssignmentIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/documents">
          <ListItemIcon>
            <FolderIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItem>
        <ListItem button component={Link} to="/notifications">
          <ListItemIcon>
            <NotificationsIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button component={Link} to="/support">
          <ListItemIcon>
            <HelpOutlineIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/security">
          <ListItemIcon>
            <SecurityIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Security" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
