import React, { useState } from "react";
import { auth, db } from "../Login Component/firebase"; // Adjust the import path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateUser = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user to Firestore with additional details
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: user.email,
        role: role,
      });

      alert("User created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      handleClose(); // Close the dialog after creating the user
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "#c7253e",
          color: "#ffffff",
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        Create New User
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new user, please enter their email, password, and role.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginBottom: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            style={{ backgroundColor: "#c7253e", color: "#ffffff" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#099C00", color: "#ffffff" }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateUser;
