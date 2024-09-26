import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { storage, db } from "../Login Component/firebase"; // Adjust the path to your Firebase config
import { updateProfile } from "firebase/auth"; // Import the necessary Firebase functions

const UserProfile = () => {
  const { user } = useAuth(); // Assuming you have a user context with user data
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (event) => {
    if (event.target.files[0]) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    // Here you would include the logic to update the profile information
    // including uploading the profile picture to Firebase Storage,
    // updating the user's password, etc.

    alert("Profile updated!");
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={3}
        borderRadius="8px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      >
        <Avatar
          src={user?.photoURL || "/static/images/avatar/1.jpg"}
          sx={{ width: 80, height: 80, marginBottom: 2 }}
        />
        <form onSubmit={handleUpdateProfile} style={{ width: "100%" }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="username"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="old password"
              type="password"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              sx={{ ml: 1 }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="your email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="new password"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ ml: 1 }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="update your pic"
              type="file"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleProfilePicChange}
              sx={{ mr: 1 }}
            />
            <TextField
              label="confirm password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ ml: 1 }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1, mr: 1 }}
            >
              update profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ flex: 1, ml: 1 }}
              onClick={handleGoBack}
            >
              go back
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UserProfile;
