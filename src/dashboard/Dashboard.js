import React from "react";
import { Box, Grid, Typography } from "@mui/material";
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

const Dashboard = () => {
  return (
    <Box p={3} className="dashparts">
      <Typography variant="h4" gutterBottom className="Overview">
        Dashboard Overview
      </Typography>
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
