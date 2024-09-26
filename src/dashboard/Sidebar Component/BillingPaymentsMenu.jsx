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
  Receipt as ReceiptIcon,
} from "@mui/icons-material";

const BillingPaymentsMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <ReceiptIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Billing & Payments" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/order-summaries"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <ReceiptIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Order Summaries" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/payment-processing"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <ReceiptIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Payment Processing" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default BillingPaymentsMenu;
