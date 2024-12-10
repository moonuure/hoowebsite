import React, { useState, useEffect } from "react";
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
import { useAuth } from "../context/AuthContext"; // Ensure the useAuth hook is correctly implemented
import { db, storage } from "../Login Component/firebase"; // Ensure Firebase is configured properly
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserProfile = () => {
  const { user } = useAuth(); // Assuming useAuth provides user data
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("/static/images/avatar/1.jpg");

  const userDocRef = doc(db, "users", user?.uid); // Firestore reference to user document

  // Real-time user data fetch
  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFullName(data.fullName || "");
        setNickName(data.nickName || "");
        setGender(data.gender || "");
        setLanguage(data.language || "");
        setCountry(data.country || "");
        setTimeZone(data.timeZone || "");
        setEmail(data.email || user?.email || "");
        setProfilePic(data.profilePic || "/static/images/avatar/1.jpg");
      }
    });

    return unsubscribe; // Cleanup subscription on component unmount
  }, [userDocRef]);

  const handleEditClick = () => setEditMode(true);

  const handleSaveClick = async () => {
    setEditMode(false);
    try {
      await updateDoc(userDocRef, {
        fullName,
        nickName,
        gender,
        language,
        country,
        timeZone,
        email,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePics/${user.uid}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(userDocRef, { profilePic: downloadURL });
        setProfilePic(downloadURL); // Reflect the new picture immediately
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
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
      </Box>
    </Container>
  );
};

export default UserProfile;
