import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CampaignIcon from "@mui/icons-material/Campaign";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";

const Dashboard = () => {
  return (
    <Box p={3} className="dashparts">
      <Typography variant="h4" gutterBottom className="Overview">
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#347928",
            }}
          >
            <TrendingUpIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Sales
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              $34,000
            </Typography>
            <Typography color="textSecondary" style={{ color: "#FFFFFF" }}>
              Compared to last year
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#640D5F",
            }}
          >
            <CampaignIcon style={{ fontSize: 40, color: "#ff9800" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Campaigns
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              $3,265
            </Typography>
            <Typography color="textSecondary" style={{ color: "#FFFFFF" }}>
              -34.69% from last year
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#FF6600",
            }}
          >
            <LocalOfferIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Coupons
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              $2,654
            </Typography>
            <Typography color="textSecondary" style={{ color: "#FFFFFF" }}>
              15.4% from last year
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#B8001F",
            }}
          >
            <PeopleIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              User Growth
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              1,235
            </Typography>
            <Typography color="textSecondary" style={{ color: "#FFFFFF" }}>
              New Users this month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#16423C",
            }}
          >
            <TaskAltIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Tasks Completed
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              152
            </Typography>
            <Typography color="textSecondary" style={{ color: "#FFFFFF" }}>
              This week
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#295F98",
            }}
          >
            <NotificationsActiveIcon
              style={{ fontSize: 40, color: "#f5f5f5" }}
            />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Notifications
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              24
            </Typography>
            <Typography color="textLigh" style={{ color: "#FFFFFF" }}>
              New Notifications
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#C7253E",
            }}
          >
            <SupportAgentIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Support Tickets
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              8
            </Typography>
            <Typography color="textLigh" style={{ color: "#FFFFFF" }}>
              Open Tickets
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#00712D",
            }}
          >
            <ShoppingCartIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Orders
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              12
            </Typography>
            <Typography color="textLigh" style={{ color: "#FFFFFF" }}>
              Pending Orders
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              textAlign: "center",
              backgroundColor: "#3A1078",
            }}
          >
            <SecurityIcon style={{ fontSize: 40, color: "#f5f5f5" }} />
            <Typography variant="h6" style={{ marginTop: 10 }}>
              System Health
            </Typography>
            <Typography variant="h4" style={{ marginTop: 10 }}>
              Good
            </Typography>
            <Typography color="textLigh" style={{ color: "#FFFFFF" }}>
              No issues detected
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
