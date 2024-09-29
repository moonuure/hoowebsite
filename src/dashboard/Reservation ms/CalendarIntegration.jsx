import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { db } from "../../Login Component/firebase"; // Adjust the path to your Firebase config
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import EditReservation from "./EditReservation"; // Assuming you have this component for editing reservations

const localizer = momentLocalizer(moment);

const CalendarIntegration = () => {
  const [reservations, setReservations] = useState([]); // State to hold reservations
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected reservation
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control the edit dialog

  // Fetch reservations from Firestore
  useEffect(() => {
    const fetchReservations = async () => {
      const snapshot = await getDocs(collection(db, "reservations")); // Fetch all documents from the "reservations" collection
      const reservationsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().customerName, // assuming "customerName" is stored in the reservation
        start: new Date(doc.data().reservationDate), // converting string date to Date object
        end: new Date(doc.data().reservationDate),
        numberOfGuests: doc.data().numberOfGuests,
        specialRequests: doc.data().specialRequests,
        ...doc.data(),
      }));
      setReservations(reservationsList); // Update state with fetched reservations
    };

    fetchReservations();
  }, []);

  // Handle opening of the Edit Reservation Dialog
  const handleEditReservation = (event) => {
    setSelectedEvent(event); // Store selected reservation
    setOpenEditDialog(true); // Open the edit dialog
  };

  // Handle closing of the Edit Reservation Dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); // Close the edit dialog
    setSelectedEvent(null); // Reset selected reservation
  };

  // Handle cancellation of a reservation
  const handleCancelReservation = async (event) => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (confirmation) {
      try {
        await deleteDoc(doc(db, "reservations", event.id)); // Delete the reservation from Firestore
        setReservations((prev) => prev.filter((res) => res.id !== event.id)); // Remove the reservation from state
        alert("Reservation canceled successfully!");
      } catch (error) {
        console.error("Error canceling reservation:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Display the calendar with reservations */}
      <Calendar
        localizer={localizer}
        events={reservations} // Pass fetched reservations as events
        startAccessor="start" // Define which field to use for the start date
        endAccessor="end" // Define which field to use for the end date
        style={{ height: 500 }} // Height of the calendar
        onSelectEvent={(event) => handleEditReservation(event)} // Handle clicking on an event (reservation)
      />

      {/* Display reservation details with Edit and Cancel buttons */}
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
        >
          <DialogContent>
            <Typography variant="h6">{selectedEvent.title}</Typography>
            <Typography>
              Reservation Date:{" "}
              {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
            </Typography>
            <Typography>
              Number of Guests: {selectedEvent.numberOfGuests}
            </Typography>
            <Typography>
              Special Requests: {selectedEvent.specialRequests}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditReservation(selectedEvent)}
            >
              Edit Reservation
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleCancelReservation(selectedEvent)}
            >
              Cancel Reservation
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Reservation Dialog */}
      {selectedEvent && (
        <EditReservation
          reservationId={selectedEvent.id} // Pass selected reservation ID to the EditReservation component
          open={openEditDialog} // Control dialog open state
          handleClose={handleCloseEditDialog} // Pass the close handler
        />
      )}
    </div>
  );
};

export default CalendarIntegration;
