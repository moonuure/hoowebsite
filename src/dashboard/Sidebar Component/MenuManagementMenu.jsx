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
  MenuBook as MenuBookIcon,
} from "@mui/icons-material";

const MenuManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <MenuBookIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Menu Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/menuItemForm" sx={{ pl: 4 }}>
            <ListItemIcon>
              <MenuBookIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dynamic Menu" />
          </ListItem>
          <ListItem button component={Link} to="/categorization" sx={{ pl: 4 }}>
            <ListItemIcon>
              <MenuBookIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Categorization" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default MenuManagementMenu;
