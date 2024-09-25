import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="fixed" // Change to fixed to lock it to the bottom
      sx={{
        backgroundColor: "#1658AA",
        top: "auto", // Ensure it's at the bottom
        bottom: 0, // Attach to the bottom of the viewport
        width: "100%", // Make sure it spans the full width
        padding: "20px 0",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="body1" sx={{ color: "#fff", textAlign: "center" }}>
          © 2024 Skills | Follow us on Twitter | Facebook | LinkedIn
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
