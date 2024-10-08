import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
} from "@mui/material";
import { db } from "../../Login Component/firebase"; // Adjust the path as needed
import { collection, getDocs } from "firebase/firestore";

const OrderSummaries = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);

  const calculateTotal = (items) => {
    const taxRate = 0.1;
    const serviceChargeRate = 0.05;
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * taxRate;
    const serviceCharge = subtotal * serviceChargeRate;
    const total = subtotal + tax + serviceCharge;
    return total.toFixed(2);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Summaries
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card
              sx={{
                backgroundColor: "#F7F9FC",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID: {order.orderId}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body2" color="textSecondary">
                  Prepared by: {order.preparedBy}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Subtotal:</strong> $
                  {order.items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tax (10%): $
                  {(
                    order.items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) * 0.1
                  ).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Service Charge (5%): $
                  {(
                    order.items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) * 0.05
                  ).toFixed(2)}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="h6">
                  Total: ${calculateTotal(order.items)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  href={`/payment/${order.id}`} // Use Firestore document ID if orderId field doesn't exist
                >
                  Proceed to Payment
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderSummaries;
