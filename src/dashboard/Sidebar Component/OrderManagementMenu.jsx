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
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

const OrderManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <ShoppingCartIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Order Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/order-placement"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <ShoppingCartIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Order Placement" />
          </ListItem>
          <ListItem button component={Link} to="/order-tracking" sx={{ pl: 4 }}>
            <ListItemIcon>
              <ShoppingCartIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Order Tracking" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default OrderManagementMenu;
