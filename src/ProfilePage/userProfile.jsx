import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useAuth } from "../context/AuthContext"; // Assuming you have a useAuth hook

const UserProfile = () => {
  const { user } = useAuth(); // Assuming useAuth provides user data
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(
    user?.photoURL || "/static/images/avatar/1.jpg"
  );

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Add your logic to save the profile details here
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
    // Add logic to upload the new profile picture to the server or cloud storage
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        sx={{
          bgcolor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <label htmlFor="profile-pic-upload">
              <input
                accept="image/*"
                id="profile-pic-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
                disabled={!editMode}
              />
              <Avatar
                src={profilePic}
                sx={{
                  width: 80,
                  height: 80,
                  mr: 2,
                  cursor: editMode ? "pointer" : "default",
                }}
              />
              {editMode && (
                <IconButton component="span" sx={{ position: "absolute" }}>
                  <PhotoCamera />
                </IconButton>
              )}
            </label>
            <Box>
              <Typography variant="h6">{fullName || "User Name"}</Typography>
              <Typography variant="body2" color="textSecondary">
                {email || "useremail@example.com"}
              </Typography>
            </Box>
          </Box>
          {editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
        </Box>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nick Name"
              variant="outlined"
              fullWidth
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" disabled={!editMode}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" disabled={!editMode}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Time Zone"
              variant="outlined"
              fullWidth
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              disabled={!editMode}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            My Email Address
          </Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body2" color="textSecondary">
            1 month ago
          </Typography>
          {editMode && (
            <Button variant="outlined" sx={{ mt: 1 }}>
              + Add Email Address
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
