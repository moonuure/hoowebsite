import React, { useEffect, useState } from "react";
import { db } from "../Login Component/firebase"; // Ensure this path is correct
import { collection, getDocs, addDoc } from "firebase/firestore";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateUser = async () => {
    try {
      await addDoc(collection(db, "users"), {
        email: newUserEmail,
        role: newUserRole || "user", // Default role is 'user'
      });
      setOpen(false);
      setNewUserEmail("");
      setNewUserRole("");
      setSuccessMessage(true); // Show success message
      fetchUsers(); // Automatically refresh the user list after success
    } catch (error) {
      console.error("Error creating user: ", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Box>
        {users.map((user, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              marginBottom: "16px",
              backgroundColor: "#FF4E88", // Background color
              color: "#FFFFFF", // Foreground (text) color
            }}
          >
            <CardContent>
              <Typography variant="h6">{user.email}</Typography>
              <Typography color="inherit">
                Role: {user.role || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Button
        variant="contained"
        color="success"
        style={{
          color: "#c7253e",
          position: "fixed", // Keeps the button fixed at the top-right corner
          top: 20,
          right: 20,
          zIndex: 1000, // Ensure it stays on top of other elements
        }}
        onClick={handleClickOpen}
      >
        Create New User
      </Button>

      {/* Dialog for creating a new user */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new user, please enter their email and role here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioning at top-right
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully created!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
