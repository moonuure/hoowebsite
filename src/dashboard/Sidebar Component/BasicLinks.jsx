import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
  School as SchoolIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
} from "@mui/icons-material";

const BasicLinks = ({ open }) => (
  <>
    <ListItem button component={Link} to="/users" style={{ color: "#fff" }}>
      <ListItemIcon>
        <GroupIcon style={{ color: "#fff" }} />
      </ListItemIcon>
      {open && <ListItemText primary="Users" />}
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/create-user"
      style={{ color: "#fff" }}
    >
      <ListItemIcon>
        <PersonAddIcon style={{ color: "#fff" }} />
      </ListItemIcon>
      {open && <ListItemText primary="Create User" />}
    </ListItem>
    <ListItem button component={Link} to="/courses" style={{ color: "#fff" }}>
      <ListItemIcon>
        <SchoolIcon style={{ color: "#fff" }} />
      </ListItemIcon>
      {open && <ListItemText primary="Courses" />}
    </ListItem>
    <ListItem button component={Link} to="/about" style={{ color: "#fff" }}>
      <ListItemIcon>
        <InfoIcon style={{ color: "#fff" }} />
      </ListItemIcon>
      {open && <ListItemText primary="About" />}
    </ListItem>
    <ListItem button component={Link} to="/contact" style={{ color: "#fff" }}>
      <ListItemIcon>
        <ContactMailIcon style={{ color: "#fff" }} />
      </ListItemIcon>
      {open && <ListItemText primary="Contact" />}
    </ListItem>
  </>
);

export default BasicLinks;
