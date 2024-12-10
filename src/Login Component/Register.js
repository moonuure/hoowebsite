import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Adjust the path as necessary
import { doc, setDoc } from "firebase/firestore";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        role: "Chef", // Default role
      });

      console.log("User registered and stored:", user);
      navigate("/"); // Redirect to the main page
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Failed to register user: " + error.message);
    }
  };

  return (
    <Container className="register-container" maxWidth="sm">
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "10px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Your Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Fill in the details below to register.
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "20px", padding: "10px 0" }}
          >
            Register
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link href="/login" color="primary">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
