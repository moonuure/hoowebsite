import React from "react";
import { Button } from "@mui/material";
import { db } from "../../Login Component/firebase"; // Adjust the path to your Firebase config
import { doc, deleteDoc } from "firebase/firestore";

const CancelReservation = ({ reservationId }) => {
  const handleCancel = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (confirmation) {
      try {
        const docRef = doc(db, "reservations", reservationId);
        await deleteDoc(docRef);
        alert("Reservation cancelled successfully!");
      } catch (error) {
        console.error("Error cancelling reservation:", error);
      }
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleCancel}>
      Cancel Reservation
    </Button>
  );
};

export default CancelReservation;
