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
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Firebase Firestore

const Dashboard = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  // Fetching low stock and out-of-stock items
  useEffect(() => {
    const inventoryRef = collection(db, "inventory"); // Assuming 'inventory' is the Firestore collection

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

    // Cleanup listeners on unmount
    return () => {
      unsubscribeLowStock();
      unsubscribeOutOfStock();
    };
  }, []);

  return (
    <Box p={3} className="dashparts">
      <Typography variant="h4" gutterBottom className="Overview">
        Dashboard Overview
      </Typography>

      {/* Low Stock and Out of Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ marginBottom: 2 }}>
          <AlertTitle>Low Stock Alert</AlertTitle>
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
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          <AlertTitle>Out of Stock Alert</AlertTitle>
          The following items are out of stock:
          <ul>
            {outOfStockItems.map((item) => (
              <li key={item.id}>{item.name} - Out of Stock</li>
            ))}
          </ul>
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={TrendingUpIcon}
            title="Sales"
            value="$34,000"
            description="Compared to last year"
            percentage={55}
            bgColor="#ffffff"
            iconBgColor="#347928"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={CampaignIcon}
            title="Campaigns"
            value="$3,265"
            description="-34.69% from last year"
            percentage={-34.69}
            bgColor="#ffffff"
            iconBgColor="#640D5F"
            iconColor="#ff9800"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={LocalOfferIcon}
            title="Coupons"
            value="$2,654"
            description="15.4% from last year"
            percentage={15.4}
            bgColor="#ffffff"
            iconBgColor="#FF6600"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={PeopleIcon}
            title="User Growth"
            value="1,235"
            description="New Users this month"
            percentage={10}
            bgColor="#ffffff"
            iconBgColor="#B8001F"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={TaskAltIcon}
            title="Tasks Completed"
            value="152"
            description="This week"
            percentage={5}
            bgColor="#ffffff"
            iconBgColor="#16423C"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={NotificationsActiveIcon}
            title="Notifications"
            value="24"
            description="New Notifications"
            percentage={5}
            bgColor="#ffffff"
            iconBgColor="#295F98"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={SupportAgentIcon}
            title="Support Tickets"
            value="8"
            description="Open Tickets"
            percentage={2}
            bgColor="#ffffff"
            iconBgColor="#C7253E"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={ShoppingCartIcon}
            title="Orders"
            value="12"
            description="Pending Orders"
            percentage={10}
            bgColor="#ffffff"
            iconBgColor="#00712D"
            iconColor="#f5f5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            icon={SecurityIcon}
            title="System Health"
            value="Good"
            description="No issues detected"
            percentage={0}
            bgColor="#ffffff"
            iconBgColor="#3A1078"
            iconColor="#f5f5f5"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
