import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Login Component/firebase";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Categories</Typography>
      <Button variant="contained" color="primary">
        Add Category
      </Button>
      <Box display="flex" flexWrap="wrap">
        {categories.map((category) => (
          <Card key={category.id} style={{ width: "200px", margin: "10px" }}>
            <CardMedia
              component="img"
              height="140"
              image={category.imageUrl}
              alt={category.name}
            />
            <CardContent>
              <Typography variant="h6">{category.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {category.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
