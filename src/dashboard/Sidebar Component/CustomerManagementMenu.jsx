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
  People as PeopleIcon,
} from "@mui/icons-material";

const CustomerManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <PeopleIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Customer Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/customer-profiles"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <PeopleIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Customer Profiles" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/loyalty-programs"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <PeopleIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Loyalty Programs" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default CustomerManagementMenu;
