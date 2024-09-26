import React, { useState, useContext } from "react";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  Box,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardLink from "../Sidebar Component/DashboardLink";
import UserManagementMenu from "../Sidebar Component/UserManagementMenu";
import MenuManagementMenu from "../Sidebar Component/MenuManagementMenu";
import OrderManagementMenu from "../Sidebar Component/OrderManagementMenu";
import ReservationManagementMenu from "../Sidebar Component/ReservationManagementMenu";
import InventoryManagementMenu from "../Sidebar Component/InventoryManagementMenu";
import BillingPaymentsMenu from "../Sidebar Component/BillingPaymentsMenu";
import CustomerManagementMenu from "../Sidebar Component/CustomerManagementMenu";
import AnalyticsReportingMenu from "../Sidebar Component/AnalyticsReportingMenu";
import NotificationsMenu from "../Sidebar Component/NotificationsMenu";
import TableManagementMenu from "../Sidebar Component/TableManagementMenu";
import EmployeeManagementMenu from "../Sidebar Component/EmployeeManagementMenu";
import SecurityBackupMenu from "../Sidebar Component/SecurityBackupMenu";
import BasicLinks from "../Sidebar Component/BasicLinks"; // For links like Users, Create User, etc.

// Assume you have a context for authentication that provides user roles
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { userRole } = useContext(AuthContext); // Get the user's role from context

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        backgroundColor: "#1658AA",
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.3s",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1658AA",
          color: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <IconButton onClick={toggleSidebar}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        {open && (
          <ListItemText
            primary="Restaurant Manager"
            sx={{ marginLeft: 2, color: "#fff" }}
          />
        )}
      </Box>
      <Divider />

      <List sx={{ backgroundColor: "#1658AA", color: "#fff" }}>
        <DashboardLink open={open} />
        {/* Conditionally render menus based on user role */}
        {["Admin", "Manager"].includes(userRole) && (
          <UserManagementMenu open={open} />
        )}
        {["Admin", "Chef"].includes(userRole) && (
          <MenuManagementMenu open={open} />
        )}
        {["Admin", "Server", "Chef"].includes(userRole) && (
          <OrderManagementMenu open={open} />
        )}
        {["Admin", "Manager", "Server"].includes(userRole) && (
          <ReservationManagementMenu open={open} />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <InventoryManagementMenu open={open} />
        )}
        {["Admin", "Accountant"].includes(userRole) && (
          <BillingPaymentsMenu open={open} />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <CustomerManagementMenu open={open} />
        )}
        {["Admin", "Manager", "Analyst"].includes(userRole) && (
          <AnalyticsReportingMenu open={open} />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <NotificationsMenu open={open} />
        )}
        {["Admin", "Server"].includes(userRole) && (
          <TableManagementMenu open={open} />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <EmployeeManagementMenu open={open} />
        )}
        {["Admin", "IT"].includes(userRole) &&
          ((<SecurityBackupMenu open={open} />), (<BasicLinks open={open} />))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
