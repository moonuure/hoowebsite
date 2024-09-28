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
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { db } from "../../Login Component/firebase"; // Adjust path as needed
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // To generate a unique ID

const OrderPlacement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

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
      alert("Order placed successfully!");
      setOrderItems([]);
      setSpecialInstructions("");
      setSelectedUser("");
      handleClose();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
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

  const handleFilterByUser = async (userId) => {
    if (!userId) {
      setFilteredOrders([]);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("preparedBy", "==", userId)
    );
    const ordersSnapshot = await getDocs(q);
    const ordersList = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFilteredOrders(ordersList);
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
            <Card sx={{ minHeight: 240 }}>
              <CardContent>
                <Typography variant="h6" noWrap>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ height: 60 }}>
                  {item.description}
                </Typography>
                <Typography variant="body1">${item.price}</Typography>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToOrder(item)}
                  startIcon={<AddIcon />}
                  sx={{ marginTop: 1 }}
                  size="small"
                >
                  Add to Order
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
    </Box>
  );
};

export default OrderPlacement;
