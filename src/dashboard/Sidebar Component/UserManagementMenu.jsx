import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
} from "@mui/icons-material";

const UserManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick} sx={{ color: "#fff" }}>
        <ListItemIcon>
          <PersonIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && (
          <ListItemText primary="User Management" sx={{ color: "#fff" }} />
        )}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            pl: 3, // Increase padding for indentation
            color: "#fff", // Set text color to white
          }}
        >
          <ListItem
            button
            component={Link}
            to="/email-password-auth"
            sx={{ pl: 1 }}
          >
            <ListItemText
              primary="• Email/Password Auth"
              sx={{ fontSize: "0.875rem", color: "#fff" }} // Set small font size and color
            />
          </ListItem>
          <ListItem button component={Link} to="/roleAccess" sx={{ pl: 1 }}>
            <ListItemText
              primary="• Role-Based Access"
              sx={{ fontSize: "0.875rem", color: "#fff" }} // Set small font size and color
            />
          </ListItem>
          <ListItem button component={Link} to="/userProfile" sx={{ pl: 1 }}>
            <ListItemText
              primary="• User Profiles"
              sx={{ fontSize: "0.875rem", color: "#fff" }} // Set small font size and color
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default UserManagementMenu;
