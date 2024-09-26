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
  Inventory as InventoryIcon,
} from "@mui/icons-material";

const InventoryManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <InventoryIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Inventory Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/stock-tracking" sx={{ pl: 4 }}>
            <ListItemIcon>
              <InventoryIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Stock Tracking" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/automatic-deductions"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <InventoryIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Automatic Deductions" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default InventoryManagementMenu;
