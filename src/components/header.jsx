import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#283593", padding: "10px 20px" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
        >
          Skills
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ marginLeft: 2 }}>
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/courses"
          sx={{ marginLeft: 2 }}
        >
          Courses
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{ marginLeft: 2 }}
        >
          About
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          sx={{ marginLeft: 2 }}
        >
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
