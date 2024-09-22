import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";

const courses = [
  {
    title: "Web Development",
    description:
      "Learn to build websites from scratch using modern technologies.",
    image: image1,
  },
  {
    title: "Graphic Design | Video Editing",
    description: "Master tools like Photoshop and Premiere Pro.",
    image: image3,
  },
  {
    title: "Mobile App Development",
    description: "Create mobile apps for Android and iOS platforms.",
    image: image2,
  },
];

const CourseList = () => {
  return (
    <Box sx={{ padding: "40px 20px", backgroundColor: "#f0f4f8" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "40px", color: "#283593" }}
      >
        Explore Our Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#283593",
                    marginBottom: "10px",
                  }}
                >
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;
