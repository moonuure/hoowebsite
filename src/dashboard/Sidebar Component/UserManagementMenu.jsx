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
  Lock as LockIcon,
} from "@mui/icons-material";

const UserManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <PersonIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="User Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/email-password-auth"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <LockIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Email/Password Auth" />
          </ListItem>
          <ListItem button component={Link} to="/roleAccess" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LockIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Role-Based Access" />
          </ListItem>
          <ListItem button component={Link} to="/userProfile" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="User Profiles" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default UserManagementMenu;
