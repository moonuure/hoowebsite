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
  Security as SecurityIcon,
} from "@mui/icons-material";

const SecurityBackupMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <SecurityIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Security & Backup" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/secure-data-storage"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <SecurityIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Secure Data Storage" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/automated-backups"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <SecurityIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Automated Backups" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default SecurityBackupMenu;
