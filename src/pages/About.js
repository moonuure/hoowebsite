import React from "react";
import { Container, Typography, Box, Grid, Avatar } from "@mui/material";

// Example team member photos
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";

const About = () => {
  return (
    <Container sx={{ padding: "40px 20px" }}>
      {/* About Section */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: "40px", fontWeight: "bold", color: "#283593" }}
      >
        About Skills
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ marginBottom: "40px", color: "#555" }}
      >
        Hoo Skills is dedicated to providing top-notch educational resources to
        help you build the skills of tomorrow. Our mission is to empower
        individuals through knowledge and skill development, enabling them to
        achieve their professional and personal goals.
      </Typography>

      {/* Mission Statement */}
      <Box
        sx={{
          backgroundColor: "#f4f6f9",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", color: "#283593", marginBottom: "20px" }}
        >
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: "#555" }}>
          At Hoo Skills, our mission is to make high-quality education
          accessible to everyone, everywhere. We believe that education is the
          key to unlocking potential, and we strive to create a learning
          platform that is both effective and affordable.
        </Typography>
      </Box>

      {/* Team Section */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "40px", color: "#283593" }}
      >
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              alt="Team Member 1"
              src={image1}
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#283593" }}
            >
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CEO & Founder
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              alt="Team Member 2"
              src={image2}
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#283593" }}
            >
              Jane Smith
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Chief Operating Officer
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              alt="Team Member 3"
              src={image3}
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#283593" }}
            >
              Emily Johnson
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Head of Marketing
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
