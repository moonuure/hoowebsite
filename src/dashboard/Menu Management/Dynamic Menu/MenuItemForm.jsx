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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
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

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [image, setImage] = useState(null);

  // Fetch categories and menu items from Firestore
  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const itemsSnapshot = await getDocs(collection(db, "menuItems"));

      const categoriesList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(categoriesList);
      setMenuItems(itemsList);
    };

    fetchCategoriesAndItems();
  }, []);

  const handleOpen = (item = null) => {
    setEditingItem(item);
    setForm(
      item || {
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
      }
    );
    setImage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    let imageUrl = form.imageUrl;

    if (image) {
      const imageRef = ref(storage, `menuItems/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedForm = { ...form, imageUrl };

    if (editingItem) {
      const docRef = doc(db, "menuItems", editingItem.id);
      await updateDoc(docRef, updatedForm);
    } else {
      await addDoc(collection(db, "menuItems"), updatedForm);
    }
    setOpen(false);
    setEditingItem(null);
    // Refresh the list
    const itemsSnapshot = await getDocs(collection(db, "menuItems"));
    const itemsList = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenuItems(itemsList);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "menuItems", id));
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ marginBottom: 2 }}
      >
        Add Menu Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ color: "#1658AA" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    style={{
                      backgroundColor: "#1976d2", // Blue background
                      color: "#ffffff", // White icon color
                      marginRight: "1px",
                      borderRadius: "6%",
                    }}
                    onClick={() => handleOpen(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "#d32f2f", // Blue background
                      color: "#ffffff", // White icon color
                      marginRight: "1px",
                      borderRadius: "6%",
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Menu Items */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingItem ? "Edit Menu Item" : "Add Menu Item"}
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
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            variant="outlined"
            value={form.price}
            onChange={handleChange}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
          />
          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
              label="Category"
              sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingItem ? "Save Changes" : "Add Item"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuManagement;
