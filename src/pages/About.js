import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";

// Example team member photos
import chefImage from "../images/image1.jpeg";
import managerImage from "../images/image2.jpg";
import developerImage from "../images/image3.jpg";

const About = () => {
  return (
    <Container sx={{ padding: { xs: "20px 10px", md: "40px 20px" } }}>
      {/* Header Section */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#d32f2f",
          marginBottom: "40px",
          letterSpacing: "1px",
        }}
      >
        Welcome to Our Restaurant System
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          lineHeight: "1.8",
          color: "#555",
          marginBottom: "40px",
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        Our Restaurant Management System is a cutting-edge solution designed to
        streamline operations, enhance customer experience, and optimize
        business efficiency. Whether you're managing orders, reservations, or
        inventory, we provide the tools you need to run a successful restaurant.
      </Typography>

      {/* Features Section */}
      <Box
        sx={{
          backgroundColor: "#f4f6f9",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#d32f2f",
            marginBottom: "20px",
          }}
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Order Management",
              desc: "Effortlessly handle orders from dine-in, takeout, and delivery services.",
            },
            {
              title: "Table Reservations",
              desc: "Simplify table bookings and avoid overbooking with our smart system.",
            },
            {
              title: "Inventory Tracking",
              desc: "Monitor stock levels and reduce wastage with real-time inventory management.",
            },
            {
              title: "Customer Insights",
              desc: "Understand your customers with data-driven analytics and reports.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#d32f2f" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginTop: "10px" }}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mission Section */}
      <Box
        sx={{
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#d32f2f",
            marginBottom: "20px",
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            lineHeight: "1.8",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Our mission is to empower restaurants of all sizes with innovative
          technology, enabling them to deliver exceptional dining experiences
          while maintaining operational excellence. We strive to create
          solutions that save time, reduce costs, and boost customer loyalty.
        </Typography>
      </Box>

      {/* Meet the Team */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#d32f2f",
          marginBottom: "30px",
        }}
      >
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[
          { name: "Chef Alex", title: "Culinary Director", img: chefImage },
          {
            name: "Sarah Johnson",
            title: "Operations Manager",
            img: managerImage,
          },
          {
            name: "Mike Williams",
            title: "Lead Developer",
            img: developerImage,
          },
        ].map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Avatar
                alt={member.name}
                src={member.img}
                sx={{
                  width: 120,
                  height: 120,
                  margin: "20px auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#d32f2f" }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "14px", marginTop: "10px" }}
                >
                  {member.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
