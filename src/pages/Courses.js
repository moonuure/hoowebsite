import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
const courses = [
  {
    title: "Web Development",
    description:
      "Learn to build modern, responsive websites using HTML, CSS, JavaScript, and more.",
    image: image1,
  },
  {
    title: "Graphic Design",
    description:
      "Master the art of visual communication using tools like Adobe Photoshop and Illustrator.",
    image: image2,
  },
  {
    title: "Mobile App Development",
    description:
      "Create mobile applications for iOS and Android platforms using React Native and Flutter.",
    image: image3,
  },
];

const Courses = () => {
  return (
    <Container sx={{ padding: "40px 20px" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: "40px", fontWeight: "bold", color: "#283593" }}
      >
        Our Courses
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#283593" }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "20px" }}
                >
                  {course.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
