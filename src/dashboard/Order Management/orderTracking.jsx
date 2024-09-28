import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { db } from "../../Login Component/firebase"; // Adjust the path to your Firebase config
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Reference to the orders collection
    const ordersRef = collection(db, "orders");

    // Real-time listener for the orders collection
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, "orders", orderId);

    try {
      await updateDoc(orderRef, {
        status: newStatus,
      });
      console.log("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Current Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography>Status: {order.status}</Typography>
                <Typography>
                  Estimated Time: {order.estimatedTime} minutes
                </Typography>
                <Typography>
                  Special Instructions: {order.instructions}
                </Typography>
                <Typography variant="h6">Items:</Typography>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>
                <Typography variant="h6">
                  Total: $
                  {order.items
                    .reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                    .toFixed(2)}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  {order.status === "Pending" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        updateOrderStatus(order.id, "In Preparation")
                      }
                      sx={{ marginRight: 1 }}
                    >
                      Mark as In Preparation
                    </Button>
                  )}
                  {order.status === "In Preparation" && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => updateOrderStatus(order.id, "Ready")}
                      sx={{ marginRight: 1 }}
                    >
                      Mark as Ready
                    </Button>
                  )}
                  {order.status === "Ready" && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updateOrderStatus(order.id, "Served")}
                    >
                      Mark as Served
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderTracking;
