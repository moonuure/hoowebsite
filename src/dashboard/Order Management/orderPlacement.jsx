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
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { db } from "../../Login Component/firebase"; // Adjust path as needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // To generate a unique ID

const OrderPlacement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false); // Error state for Snackbar
  const [success, setSuccess] = useState(false); // Success state for Snackbar

  // Fetch menu items and users from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuSnapshot = await getDocs(collection(db, "menuItems"));
      const menuList = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuList);
    };

    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableUsers(usersList);
    };

    fetchMenuItems();
    fetchUsers();
  }, []);

  const handleAddToOrder = (menuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === menuItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromOrder = (menuItemId) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === menuItemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmOrder = async () => {
    if (orderItems.length === 0) {
      alert("Please add items to your order.");
      return;
    }

    if (!selectedUser) {
      alert("Please select a user to assign the order.");
      return;
    }

    const generatedId = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`; // Generate a unique ID

    // Save the order to Firestore
    try {
      await addDoc(collection(db, "orders"), {
        orderId: generatedId,
        items: orderItems,
        instructions: specialInstructions,
        status: "Pending", // Initial status
        preparedBy: selectedUser, // Assign the selected user to the order
        createdAt: new Date(),
      });

      // Deduct quantities from the inventory
      for (const item of orderItems) {
        const ingredientRef = doc(db, "inventory", item.ingredientId); // Assuming `ingredientId` maps to the inventory item
        const ingredientSnap = await getDoc(ingredientRef);
        if (ingredientSnap.exists()) {
          const currentQuantity = ingredientSnap.data().quantity;
          const updatedQuantity = currentQuantity - item.quantity; // Deduct based on the order quantity
          if (updatedQuantity < 0) {
            alert(`Not enough stock for ${item.name}`);
          } else {
            await updateDoc(ingredientRef, { quantity: updatedQuantity });
          }
        }
      }

      // Success case
      setSuccess(true);
      setError(false); // Make sure error state is cleared
      setOrderItems([]);
      setSpecialInstructions("");
      setSelectedUser("");
      handleClose();
    } catch (error) {
      console.error("Error placing order:", error);
      setError(true); // Trigger the error snackbar
      setSuccess(false); // Ensure success state is cleared
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleResetOrder = () => {
    setOrderItems([]);
    setSpecialInstructions("");
    setSelectedUser("");
  };

  const handleRetry = () => {
    setError(false);
    handleConfirmOrder(); // Retry placing the order
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>
      <TextField
        label="Search Menu"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Grid container spacing={2}>
        {filteredMenuItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card sx={{ minHeight: 240, backgroundColor: "#FFA500" }}>
              <CardContent>
                <Box
                  sx={{
                    backgroundColor: "#002F5D",
                    color: "#fff",
                    padding: "8px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="h6" noWrap>
                    Order Name: {item.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Item Desc: {item.description}
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  Item Price: ${item.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#002F5D",
                    color: "#fff",
                    width: "100%",
                    marginTop: 2,
                    "&:hover": {
                      backgroundColor: "#001F40",
                    },
                  }}
                  onClick={() => handleAddToOrder(item)}
                  startIcon={<AddIcon />}
                >
                  Add Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          disabled={orderItems.length === 0}
          sx={{ marginRight: 2 }}
        >
          View Order ({orderItems.length} items)
        </Button>
        <Button variant="outlined" onClick={handleResetOrder}>
          Reset Order
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Order Summary</DialogTitle>
        <DialogContent>
          {orderItems.length > 0 ? (
            <List>
              {orderItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.name} - $${item.price}`}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => handleAddToOrder(item)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      color="secondary"
                      onClick={() => handleRemoveFromOrder(item.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add any special instructions..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                sx={{ marginTop: 2 }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="select-user-label">Assign to User</InputLabel>
                <Select
                  labelId="select-user-label"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {availableUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </List>
          ) : (
            <Typography>No items added to the order.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmOrder}
            variant="contained"
            color="primary"
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for displaying errors */}
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        message="Failed to place order. Please try again."
        action={
          <Button color="secondary" size="small" onClick={handleRetry}>
            Retry
          </Button>
        }
      />

      {/* Snackbar for successful order placement */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Order placed successfully!"
      />
    </Box>
  );
};

export default OrderPlacement;
