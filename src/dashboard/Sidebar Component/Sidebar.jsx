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
import BasicLinks from "../Sidebar Component/BasicLinks";

import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ fontSize = 12 }) => {
  const [open, setOpen] = useState(true);
  const { userRole } = useContext(AuthContext);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Determine if the screen size requires a temporary drawer
  const isMobile = window.innerWidth < 768;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          background: "linear-gradient(to bottom, #001F40, #003366)",
          color: "#fff",
          width: open ? 240 : 60,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.3s",
        },
        "@media (max-width: 768px)": {
          width: 240,
        },
      }}
      open={open}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to bottom, #001F40, #003366)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: "#fff", fontSize: "10px" }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        {open && (
          <ListItemText
            primary="Restaurant Manager"
            sx={{
              marginLeft: 2,
              "& .MuiTypography-root": {
                fontSize,
              },
            }}
          />
        )}
      </Box>
      <Divider sx={{ backgroundColor: "#fff" }} />
      <List
        sx={{
          backgroundColor: "transparent",
          color: "#fff",
          "& .MuiListItemText-primary, & .MuiListItemText-secondary": {
            fontSize,
            color: "#fff",
          },
        }}
      >
        <DashboardLink open={open} iconSize="small" />
        {["Admin", "Manager"].includes(userRole) && (
          <UserManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Chef"].includes(userRole) && (
          <MenuManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Server", "Chef"].includes(userRole) && (
          <OrderManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Manager", "Server"].includes(userRole) && (
          <ReservationManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <InventoryManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Accountant"].includes(userRole) && (
          <BillingPaymentsMenu open={open} iconSize="small" />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <CustomerManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Manager", "Analyst"].includes(userRole) && (
          <AnalyticsReportingMenu open={open} iconSize="small" />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <NotificationsMenu open={open} iconSize="small" />
        )}
        {["Admin", "Server"].includes(userRole) && (
          <TableManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "Manager"].includes(userRole) && (
          <EmployeeManagementMenu open={open} iconSize="small" />
        )}
        {["Admin", "IT"].includes(userRole) && (
          <>
            <SecurityBackupMenu open={open} iconSize="small" />
            <BasicLinks open={open} iconSize="small" />
          </>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
