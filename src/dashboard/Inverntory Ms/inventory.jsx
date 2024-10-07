import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { db } from "../../Login Component/firebase"; // Adjust path as needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const InventoryManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    unit: "",
  });

  // Fetch ingredients and supplies from Firestore
  useEffect(() => {
    const fetchIngredients = async () => {
      const snapshot = await getDocs(collection(db, "inventory"));
      const ingredientsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Check for low stock and out-of-stock items
      const lowStock = ingredientsList.filter(
        (ingredient) => ingredient.quantity <= 10
      ); // Threshold for low stock
      const outOfStock = ingredientsList.filter(
        (ingredient) => ingredient.quantity === 0
      );

      if (lowStock.length > 0) {
        alert(
          `Low stock alert: ${lowStock.map((item) => item.name).join(", ")}`
        );
      }
      if (outOfStock.length > 0) {
        alert(
          `Out of stock: ${outOfStock.map((item) => item.name).join(", ")}`
        );
      }

      setIngredients(ingredientsList);
    };

    fetchIngredients();
  }, []);

  // Handle opening of dialog for adding or editing an ingredient
  const handleOpen = (ingredient = null) => {
    setEditingIngredient(ingredient);
    setForm(ingredient || { name: "", quantity: 0, unit: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIngredient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async () => {
    if (editingIngredient) {
      const docRef = doc(db, "inventory", editingIngredient.id);
      await updateDoc(docRef, form);
    } else {
      await addDoc(collection(db, "inventory"), form);
    }

    setOpen(false);
    setEditingIngredient(null);

    // Refresh the list
    const snapshot = await getDocs(collection(db, "inventory"));
    const ingredientsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIngredients(ingredientsList);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ marginBottom: 2 }}
      >
        Add Ingredient
      </Button>

      {/* Display Ingredients in Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.quantity}</TableCell>
                <TableCell>{ingredient.unit}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(ingredient)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(ingredient.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Ingredients */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {editingIngredient ? "Edit Ingredient" : "Add Ingredient"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            type="number"
            fullWidth
            value={form.quantity}
            onChange={handleChange}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label="Unit (e.g., kg, liters)"
            name="unit"
            fullWidth
            value={form.unit}
            onChange={handleChange}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingIngredient ? "Save Changes" : "Add Ingredient"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;
