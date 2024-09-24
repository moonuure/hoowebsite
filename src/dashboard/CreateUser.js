import React, { useState } from "react";
import { auth, db } from "../Login Component/firebase"; // Adjust the import path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Typography, Box } from "@mui/material";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        // Never store plain-text passwords, just including for completeness.
        // Firebase Auth securely stores hashed passwords.
      });

      alert("User created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Create New User
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" color="primary" onClick={handleCreateUser}>
        Create User
      </Button>
    </Box>
  );
};

export default CreateUser;
