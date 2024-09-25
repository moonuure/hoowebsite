import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { auth } from "../Login Component/firebase"; // Ensure the path is correct
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings"; // Import the SettingsIcon
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-dot": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const Header = () => {
  const user = auth.currentUser;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        setAnchorEl(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1658AA", padding: "10px 20px" }}
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
        {user && (
          <>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <SettingsIcon
                fontSize="large"
                sx={{ marginLeft: 2, cursor: "pointer" }}
                onClick={handleIconClick}
              />
            </StyledBadge>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                Logged in as {user.email}
              </MenuItem>
              <MenuItem onClick={handleLogout} startIcon={<LogoutIcon />}>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
