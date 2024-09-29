import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { db } from "../../Login Component/firebase"; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";

const MakeReservationForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [reservationDate, setReservationDate] = useState(new Date());
  const [specialRequests, setSpecialRequests] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "reservations"), {
        name: customerName,
        contactNumber: contactNumber,
        email: email,
        numGuests: numGuests,
        reservationDate: reservationDate,
        specialRequests: specialRequests,
        status: "Confirmed", // Initial status for the reservation
      });
      alert("Reservation made successfully");
      setCustomerName("");
      setContactNumber("");
      setEmail("");
      setNumGuests("");
      setReservationDate(new Date());
      setSpecialRequests("");
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed to make reservation. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Make a Reservation
      </Typography>
      <TextField
        fullWidth
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Number of Guests</InputLabel>
        <Select
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          required
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDateTimePicker
          label="Reservation Date & Time"
          value={reservationDate}
          onChange={(newValue) => setReservationDate(newValue)}
          renderInput={(params) => (
            <TextField fullWidth {...params} sx={{ marginBottom: 2 }} />
          )}
          required
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        multiline
        label="Special Requests"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Make Reservation
      </Button>
    </Box>
  );
};

export default MakeReservationForm;
