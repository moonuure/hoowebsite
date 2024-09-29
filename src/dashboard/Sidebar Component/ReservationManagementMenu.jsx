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
  EventSeat as EventSeatIcon,
} from "@mui/icons-material";

const ReservationManagementMenu = ({ open }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <EventSeatIcon style={{ color: "#fff" }} />
        </ListItemIcon>
        {open && <ListItemText primary="Reservation Management" />}
        {open && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/reservation" sx={{ pl: 4 }}>
            <ListItemIcon>
              <EventSeatIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/calendarIntegration"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <EventSeatIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Calendar Integration" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/editReservation"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <EventSeatIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Edit Reservation" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/cancelReservation"
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <EventSeatIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Cancel Reservation" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default ReservationManagementMenu;
