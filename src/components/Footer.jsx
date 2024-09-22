import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#283593", padding: "20px 0", marginTop: "40px" }}
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
