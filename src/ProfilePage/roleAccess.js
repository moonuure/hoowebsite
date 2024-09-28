import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Login Component/firebase"; // Adjust the path to your Firebase config

const RoleAccess = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const roles = ["Admin", "Manager", "Chef", "Server", "User"]; // Predefined roles

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
      setSnackbarMessage("User deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbarMessage("Failed to delete user.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditSave = async () => {
    if (currentUser) {
      try {
        await updateDoc(doc(db, "users", currentUser.id), {
          role: currentUser.role,
        });
        setUsers(
          users.map((user) => (user.id === currentUser.id ? currentUser : user))
        );
        setEditDialogOpen(false);
        setSnackbarMessage("User role updated successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating user role:", error);
        setSnackbarMessage("Failed to update user role.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box
        marginTop={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" style={{ color: "#1658AA" }}>
          Role Access Management
        </Typography>
        <TextField
          label="Search by email"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#8A9CAE" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username || user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditClick(user)}
                    style={{
                      backgroundColor: "#1976D2", // Blue background
                      color: "#FFFFFF", // White icon color
                      marginRight: "10px",
                      borderRadius: "4px",
                      padding: "10px",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(user.id)}
                    style={{
                      backgroundColor: "#D32F2F", // Red background
                      color: "#FFFFFF", // White icon color
                      borderRadius: "4px",
                      padding: "10px",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <Select
            label="Role"
            variant="outlined"
            fullWidth
            value={currentUser?.role || ""}
            onChange={(e) =>
              setCurrentUser((prevUser) => ({
                ...prevUser,
                role: e.target.value,
              }))
            }
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoleAccess;
