import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";

const Contact = () => {
  return (
    <Container sx={{ padding: "40px 20px" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: "40px", fontWeight: "bold", color: "#283593" }}
      >
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Reach Out to Us
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <LocationOn sx={{ color: "#283593", marginRight: "10px" }} />
            <Typography variant="body1">
              123 Main Street, Hometown, Country
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <Phone sx={{ color: "#283593", marginRight: "10px" }} />
            <Typography variant="body1">+123 456 7890</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <Email sx={{ color: "#283593", marginRight: "10px" }} />
            <Typography variant="body1">info@hooskills.com</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              sx={{ color: "#3b5998" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              sx={{ color: "#00acee" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              sx={{ color: "#0077b5" }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Send Us a Message
          </Typography>
          <form>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              required
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              sx={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ padding: "10px" }}
            >
              Send Message
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
