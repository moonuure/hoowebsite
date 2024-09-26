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
  TableChart as TableChartIcon,
} from "@mui/icons-material";

const TableManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Table Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/real-time-table-status"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <TableChartIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Real-Time Table Status" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/waitlist-management"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <TableChartIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Waitlist Management" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default TableManagementMenu;
