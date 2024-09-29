import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { db } from "../../Login Component/firebase"; // Adjust the path to your Firebase config
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [unservedOrders, setUnservedOrders] = useState(0);

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredOrders = ordersList.filter(
          (order) => order.status !== "Served"
        );

        setOrders(filteredOrders);
        const unservedCount = filteredOrders.length;
        setUnservedOrders(unservedCount);
      },
      (error) => {
        console.error("Error fetching orders: ", error);
      }
    );

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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          color: "#d32f2f",
        }}
      >
        <Typography variant="h4" style={{ color: "#001F40" }}>
          Current Orders
        </Typography>
        <Badge
          badgeContent={unservedOrders}
          style={{
            backgroundColor: "#001F40",
            marginRight: "0px",
            borderRadius: "100%",
          }}
        >
          <IconButton>
            <NotificationsIcon
              style={{
                color: "#f5f5f5",
              }}
            />
          </IconButton>
        </Badge>
      </Box>

      {/* Main Content Section with Scrollable Orders */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 3,
          backgroundColor: "#E0E0E0",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {orders.length === 0 ? (
            <Typography justifyContent="center">No orders available</Typography>
          ) : (
            orders.map((order) => (
              <Grid item xs={12} sm={4} md={3} key={order.id}>
                <Card
                  sx={{
                    maxWidth: 280,
                    backgroundColor: "#ff8c00",
                    color: "#fff",
                    position: "relative",
                    margin: "0 auto",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        backgroundColor: "#1e3d59",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography variant="h6">
                        Order ID: ORD-{order.id.substring(0, 6).toUpperCase()}
                      </Typography>
                      <Typography>Status: {order.status}</Typography>
                      <Typography>
                        Estimated Time: {order.estimatedTime || "N/A"} minutes
                      </Typography>
                      <Typography>
                        Special Instructions: {order.instructions || "None"}
                      </Typography>
                    </Box>

                    <Typography variant="h6">Items:</Typography>
                    <Box sx={{ paddingLeft: 2 }}>
                      {order.items.map((item, index) => (
                        <Typography key={index}>
                          {item.name} - {item.quantity} x ${item.price}
                        </Typography>
                      ))}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: 2,
                        borderTop: "1px solid #fff",
                        paddingTop: 1,
                      }}
                    >
                      Total: $
                      {order.items
                        .reduce(
                          (total, item) => total + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </Typography>

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {order.status === "Pending" && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#1e3d59",
                            color: "#fff",
                            borderRadius: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                          onClick={() =>
                            updateOrderStatus(order.id, "In Preparation")
                          }
                        >
                          Mark as In Preparation
                        </Button>
                      )}
                      {order.status === "In Preparation" && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#1e3d59",
                            color: "#fff",
                            borderRadius: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                          onClick={() => updateOrderStatus(order.id, "Ready")}
                        >
                          Mark as Ready
                        </Button>
                      )}
                      {order.status === "Ready" && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#1e3d59",
                            color: "#fff",
                            borderRadius: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                          onClick={() => updateOrderStatus(order.id, "Served")}
                        >
                          Mark as Served
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderTracking;
