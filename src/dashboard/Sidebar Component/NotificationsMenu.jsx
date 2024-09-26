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
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const NotificationsMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <NotificationsIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Notifications" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/order-notifications"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <NotificationsIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Order Notifications" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/promotional-messages"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <NotificationsIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Promotional Messages" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default NotificationsMenu;
