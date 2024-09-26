import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const DashboardLink = ({ open }) => (
  <ListItem button component={Link} to="/dashboard" style={{ color: "#fff" }}>
    <ListItemIcon>
      <DashboardIcon style={{ color: "#fff" }} />
    </ListItemIcon>
    {open && <ListItemText primary="Dashboard" />}
  </ListItem>
);

export default DashboardLink;
