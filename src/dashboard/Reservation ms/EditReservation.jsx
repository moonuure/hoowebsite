import React, { useState, useEffect } from "react";
import { db } from "../../Login Component/firebase"; // Adjust the path as necessary
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const EditReservation = ({ reservationId, open, handleClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    email: "",
    numberOfGuests: 0,
    specialRequests: "",
    reservationDate: "",
  });
  const [loading, setLoading] = useState(true); // Loading state while fetching the reservation

  // Fetch the reservation details when the component mounts
  useEffect(() => {
    const fetchReservationDetails = async () => {
      if (reservationId) {
        setLoading(true); // Set loading to true while fetching data
        const docRef = doc(db, "reservations", reservationId); // Reference the specific reservation
        const reservationDoc = await getDoc(docRef); // Get reservation data from Firestore
        if (reservationDoc.exists()) {
          setFormData(reservationDoc.data()); // Populate the form with the fetched data
        }
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value })); // Update form data
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "reservations", reservationId); // Reference the reservation to update
      await updateDoc(docRef, formData); // Update the reservation with the new data
      alert("Reservation updated successfully!");
      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("Failed to update reservation. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading reservation details...</div>; // Display loading message while fetching data
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Reservation</DialogTitle>
      <DialogContent>
        <TextField
          label="Customer Name"
          name="customerName"
          fullWidth
          value={formData.customerName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          fullWidth
          value={formData.contactNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Number of Guests"
          name="numberOfGuests"
          fullWidth
          value={formData.numberOfGuests}
          onChange={handleChange}
          margin="normal"
          type="number"
        />
        <TextField
          label="Special Requests"
          name="specialRequests"
          fullWidth
          value={formData.specialRequests}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Reservation Date"
          name="reservationDate"
          fullWidth
          value={formData.reservationDate}
          onChange={handleChange}
          margin="normal"
          type="datetime-local"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditReservation;
