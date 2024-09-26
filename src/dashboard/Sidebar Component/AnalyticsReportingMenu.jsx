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
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

const AnalyticsReportingMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <AssessmentIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Analytics & Reporting" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/sales-reports" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AssessmentIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Sales Reports" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/customer-insights"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <AssessmentIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Customer Insights" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default AnalyticsReportingMenu;
