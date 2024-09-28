import React, { useEffect, useState } from "react";
import { db } from "../Login Component/firebase"; // Ensure this path is correct
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
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

  const handleClickOpen = (user = null) => {
    if (user) {
      setEditMode(true);
      setSelectedUserId(user.id);
      setNewUserEmail(user.email);
      setNewUserRole(user.role);
    } else {
      setEditMode(false);
      setSelectedUserId(null);
      setNewUserEmail("");
      setNewUserRole("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateOrUpdateUser = async () => {
    try {
      if (editMode) {
        // Update the existing user
        const userDoc = doc(db, "users", selectedUserId);
        await updateDoc(userDoc, {
          email: newUserEmail,
          role: newUserRole || "user",
        });
      } else {
        // Create a new user
        await addDoc(collection(db, "users"), {
          email: newUserEmail,
          password: newPassword,
          role: newUserRole || "user",
        });
      }

      setOpen(false);
      setNewUserEmail("");
      setNewPassword("");
      setNewUserRole("");
      setSuccessMessage(true);
      fetchUsers(); // Automatically refresh the user list after success
    } catch (error) {
      console.error("Error creating/updating user: ", error);
      alert("Failed to save user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setSuccessMessage(true);
      fetchUsers(); // Automatically refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom style={{ color: "#8A9CAE" }}>
        Users
      </Typography>

      {/* Table to display users */}
      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead style={{ backgroundColor: "#8A9CAE" }}>
            <TableRow>
              <TableCell style={{ color: "#ffffff" }}>#</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Username</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Email</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Role</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username || user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role || "N/A"}</TableCell>
                <TableCell>
                  <IconButton
                    style={{
                      backgroundColor: "#1976d2", // Blue background
                      color: "#ffffff", // White icon color
                      marginRight: "1px",
                      borderRadius: "6%",
                    }}
                    onClick={() => handleClickOpen(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "#d32f2f", // Red background
                      color: "#ffffff", // White icon color
                      borderRadius: "6%",
                    }}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="success"
        style={{
          color: "#ffffff",
          backgroundColor: "#1658AA",
          position: "fixed", // Keeps the button fixed at the top-right corner
          top: 20,
          right: 20,
          zIndex: 1000, // Ensure it stays on top of other elements
        }}
        onClick={() => handleClickOpen()}
      >
        Create New User
      </Button>

      {/* Dialog for creating/editing a user */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit User" : "Create New User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode
              ? "To edit the user, please update the email and role."
              : "To create a new user, please enter their email, password, and role."}
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
          {!editMode && (
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          )}
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
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
            onClick={handleCreateOrUpdateUser}
            color="primary"
            style={{ backgroundColor: "#099C00", color: "#ffffff" }}
          >
            {editMode ? "Update" : "Create"}
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
          Successfully {editMode ? "updated" : "created"}!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
