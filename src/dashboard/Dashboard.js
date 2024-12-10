import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Alert, AlertTitle } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CampaignIcon from "@mui/icons-material/Campaign";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import StatCard from "../dashboard/StatCard"; // Import the StatCard component
import { db } from "../Login Component/firebase"; // Firebase config
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const Dashboard = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]); // State to store pending orders

  // Fetching low stock, out-of-stock items, and pending orders
  useEffect(() => {
    const inventoryRef = collection(db, "inventory"); // Firestore collection for inventory
    const ordersRef = collection(db, "orders"); // Firestore collection for orders

    // Query for low stock (items with quantity <= 5)
    const lowStockQuery = query(inventoryRef, where("quantity", "<=", 5));
    const unsubscribeLowStock = onSnapshot(lowStockQuery, (snapshot) => {
      const lowStock = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLowStockItems(lowStock);
    });

    // Query for out of stock (items with quantity = 0)
    const outOfStockQuery = query(inventoryRef, where("quantity", "==", 0));
    const unsubscribeOutOfStock = onSnapshot(outOfStockQuery, (snapshot) => {
      const outOfStock = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOutOfStockItems(outOfStock);
    });

    // Query for pending orders (status = "pending")
    const pendingOrdersQuery = query(
      ordersRef,
      where("status", "==", "pending") // Filter by pending status
    );
    const unsubscribePendingOrders = onSnapshot(
      pendingOrdersQuery,
      (snapshot) => {
        const pending = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingOrders(pending); // Update state with pending orders
      }
    );

    // Cleanup listeners on unmount
    return () => {
      unsubscribeLowStock();
      unsubscribeOutOfStock();
      unsubscribePendingOrders(); // Unsubscribe from pending orders query
    };
  }, []);

  return (
    <Box p={3} className="dashboard" sx={{ backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "#333",
          marginBottom: "20px",
          letterSpacing: "0.5px",
          textAlign: { xs: "center", sm: "left" }, // Responsive text alignment
        }}
      >
        Dashboard Overview
      </Typography>

      {/* Low Stock and Out of Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ marginBottom: 3, borderRadius: "8px" }}>
          <AlertTitle sx={{ fontWeight: 600 }}>Low Stock Alert</AlertTitle>
          The following items have low stock levels:
          <ul>
            {lowStockItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} left
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {outOfStockItems.length > 0 && (
        <Alert severity="error" sx={{ marginBottom: 3, borderRadius: "8px" }}>
          <AlertTitle sx={{ fontWeight: 600 }}>Out of Stock Alert</AlertTitle>
          The following items are out of stock:
          <ul>
            {outOfStockItems.map((item) => (
              <li key={item.id}>{item.name} - Out of Stock</li>
            ))}
          </ul>
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={TrendingUpIcon}
            title="Order Tracking"
            value={pendingOrders.length}
            description="Orders waiting to process"
            percentage={pendingOrders.length > 0 ? 10 : 0}
            bgColor="#ffffff"
            iconBgColor="#347928"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={CampaignIcon}
            title="Order History"
            value="1,235"
            description="Processed orders this year"
            percentage={15}
            bgColor="#ffffff"
            iconBgColor="#640D5F"
            iconColor="#ff9800"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={ShoppingCartIcon}
            title="Pending Orders"
            value={pendingOrders.length}
            description="Orders waiting for action"
            percentage={pendingOrders.length > 0 ? 5 : 0}
            bgColor="#ffffff"
            iconBgColor="#00712D"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={LocalOfferIcon}
            title="Coupons"
            value="$2,654"
            description="15.4% from last year"
            percentage={15.4}
            bgColor="#ffffff"
            iconBgColor="#FF6600"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={PeopleIcon}
            title="User Growth"
            value="1,235"
            description="New Users this month"
            percentage={10}
            bgColor="#ffffff"
            iconBgColor="#B8001F"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={TaskAltIcon}
            title="Tasks Completed"
            value="152"
            description="This week"
            percentage={5}
            bgColor="#ffffff"
            iconBgColor="#16423C"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={NotificationsActiveIcon}
            title="Notifications"
            value="24"
            description="New Notifications"
            percentage={5}
            bgColor="#ffffff"
            iconBgColor="#295F98"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={SupportAgentIcon}
            title="Support Tickets"
            value="8"
            description="Open Tickets"
            percentage={2}
            bgColor="#ffffff"
            iconBgColor="#C7253E"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon={SecurityIcon}
            title="System Health"
            value="Good"
            description="No issues detected"
            percentage={0}
            bgColor="#ffffff"
            iconBgColor="#3A1078"
            iconColor="#f5f5f5"
            shadow
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
