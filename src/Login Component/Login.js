import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      navigate("/"); // Redirect to the main page after successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  return (
    <Container
      className="auth-container"
      maxWidth="sm" // Sets the maximum width for larger screens
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 3, // Margin bottom
          fontSize: { xs: "1.8rem", sm: "2.5rem" }, // Responsive font size
        }}
      >
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2, // Space between form fields
        }}
      >
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            py: 1.5, // Add padding for larger click area
            fontSize: "1rem", // Responsive button text size
          }}
        >
          Login
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive text size
          }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Register here
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
