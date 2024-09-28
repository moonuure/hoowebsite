import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { db, storage } from "../../../Login Component/firebase"; // Adjust path as needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    availability: "In Stock", // Default to "In Stock"
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  const handleOpen = (category = null) => {
    setEditingCategory(category);
    setForm(
      category || {
        name: "",
        description: "",
        imageUrl: "",
        availability: "In Stock",
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setImageFile(null); // Reset image file
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    let imageUrl = form.imageUrl;

    if (imageFile) {
      const imageRef = ref(storage, `categoryImages/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const categoryData = { ...form, imageUrl };

    if (editingCategory) {
      const docRef = doc(db, "categories", editingCategory.id);
      await updateDoc(docRef, categoryData);
    } else {
      await addDoc(collection(db, "categories"), categoryData);
    }

    setOpen(false);
    setEditingCategory(null);
    setImageFile(null);

    // Refresh the list
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categoriesList = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(categoriesList);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ marginBottom: 2 }}
      >
        Add Category
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {category.imageUrl && (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.availability}</TableCell>
                <TableCell>
                  <IconButton
                    style={{
                      backgroundColor: "#1976d2", // Blue background
                      color: "#ffffff", // White icon color
                      marginRight: "1px",
                      borderRadius: "6%",
                    }}
                    onClick={() => handleOpen(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "#d32f2f", // Red background
                      color: "#ffffff", // White icon color
                      marginRight: "1px",
                      borderRadius: "6%",
                    }}
                    onClick={() => handleDelete(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Categories */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            variant="outlined"
            value={form.description}
            onChange={handleChange}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="availability-label">Availability</InputLabel>
            <Select
              labelId="availability-label"
              name="availability"
              value={form.availability}
              onChange={handleChange}
              sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
            >
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#f4f4f4",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingCategory ? "Save Changes" : "Add Category"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManagement;
