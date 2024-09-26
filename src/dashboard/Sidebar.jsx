// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Divider,
//   IconButton,
//   Box,
// } from "@mui/material";
// import {
//   ExpandLess,
//   ExpandMore,
//   Dashboard as DashboardIcon,
//   Person as PersonIcon,
//   Lock as LockIcon,
//   MenuBook as MenuBookIcon,
//   ShoppingCart as ShoppingCartIcon,
//   EventSeat as EventSeatIcon,
//   Inventory as InventoryIcon,
//   Receipt as ReceiptIcon,
//   People as PeopleIcon,
//   Assessment as AssessmentIcon,
//   Notifications as NotificationsIcon,
//   TableChart as TableChartIcon,
//   Security as SecurityIcon,
//   Language as LanguageIcon,
//   MobileFriendly as MobileFriendlyIcon,
//   Group as GroupIcon,
//   PersonAdd as PersonAddIcon,
//   Info as InfoIcon,
//   ContactMail as ContactMailIcon,
//   School as SchoolIcon,
// } from "@mui/icons-material";

// const Sidebar = () => {
//   const [open, setOpen] = useState(true); // Control the sidebar expand/collapse
//   const [expandedItems, setExpandedItems] = useState({}); // Control each dropdown menu

//   const toggleSidebar = () => {
//     setOpen(!open);
//   };

//   const handleExpandClick = (item) => {
//     setExpandedItems((prev) => ({ ...prev, [item]: !prev[item] }));
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         backgroundColor: "#1658AA",
//         width: open ? 240 : 60,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? 240 : 60,
//           boxSizing: "border-box",
//           overflowX: "hidden",
//           transition: "width 0.3s",
//         },
//       }}
//       className="drawer"
//     >
//       <Box
//         sx={{
//           backgroundColor: "#1658AA",
//           color: "#f5f5f5",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "10px",
//         }}
//       >
//         <IconButton onClick={toggleSidebar}>
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </IconButton>
//         {open && (
//           <ListItemText
//             primary="Restaurant Manager"
//             sx={{ marginLeft: 2, color: "#fff" }}
//           />
//         )}
//       </Box>
//       <Divider />

//       <List sx={{ backgroundColor: "#1658AA", color: "#fff" }}>
//         <ListItem
//           button
//           component={Link}
//           to="/dashboard"
//           style={{ color: "#fff" }}
//         >
//           <ListItemIcon>
//             <DashboardIcon style={{ color: "#fff" }} />
//           </ListItemIcon>
//           {open && <ListItemText primary="Dashboard" />}
//         </ListItem>

//         {/* User Authentication and Management */}
//         <ListItem button onClick={() => handleExpandClick("userAuth")}>
//           <ListItemIcon>
//             <PersonIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="User Management" />}
//           {open && (expandedItems.userAuth ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse in={expandedItems.userAuth} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/email-password-auth"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <LockIcon />
//               </ListItemIcon>
//               <ListItemText primary="Email/Password Auth" />
//             </ListItem>
//             <ListItem button component={Link} to="/social-login" sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <LockIcon />
//               </ListItemIcon>
//               <ListItemText primary="Social Login" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/role-based-access"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <LockIcon />
//               </ListItemIcon>
//               <ListItemText primary="Role-Based Access" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/user-profiles"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <PersonIcon />
//               </ListItemIcon>
//               <ListItemText primary="User Profiles" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Menu Management */}
//         <ListItem button onClick={() => handleExpandClick("menuManagement")}>
//           <ListItemIcon>
//             <MenuBookIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Menu Management" />}
//           {open &&
//             (expandedItems.menuManagement ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse
//           in={expandedItems.menuManagement}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem button component={Link} to="/dynamic-menu" sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <MenuBookIcon />
//               </ListItemIcon>
//               <ListItemText primary="Dynamic Menu" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/categorization"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <MenuBookIcon />
//               </ListItemIcon>
//               <ListItemText primary="Categorization" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Order Management */}
//         <ListItem button onClick={() => handleExpandClick("orderManagement")}>
//           <ListItemIcon>
//             <ShoppingCartIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Order Management" />}
//           {open &&
//             (expandedItems.orderManagement ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse
//           in={expandedItems.orderManagement}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/order-placement"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <ShoppingCartIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order Placement" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/order-tracking"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <ShoppingCartIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order Tracking" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Reservation Management */}
//         <ListItem
//           button
//           onClick={() => handleExpandClick("reservationManagement")}
//         >
//           <ListItemIcon>
//             <EventSeatIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Reservation Management" />}
//           {open &&
//             (expandedItems.reservationManagement ? (
//               <ExpandLess />
//             ) : (
//               <ExpandMore />
//             ))}
//         </ListItem>
//         <Collapse
//           in={expandedItems.reservationManagement}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem button component={Link} to="/reservations" sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <EventSeatIcon />
//               </ListItemIcon>
//               <ListItemText primary="Reservations" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/calendar-integration"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <EventSeatIcon />
//               </ListItemIcon>
//               <ListItemText primary="Calendar Integration" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Inventory Management */}
//         <ListItem
//           button
//           onClick={() => handleExpandClick("inventoryManagement")}
//         >
//           <ListItemIcon>
//             <InventoryIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Inventory Management" />}
//           {open &&
//             (expandedItems.inventoryManagement ? (
//               <ExpandLess />
//             ) : (
//               <ExpandMore />
//             ))}
//         </ListItem>
//         <Collapse
//           in={expandedItems.inventoryManagement}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/stock-tracking"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <InventoryIcon />
//               </ListItemIcon>
//               <ListItemText primary="Stock Tracking" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/automatic-deductions"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <InventoryIcon />
//               </ListItemIcon>
//               <ListItemText primary="Automatic Deductions" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Billing and Payments */}
//         <ListItem button onClick={() => handleExpandClick("billingPayments")}>
//           <ListItemIcon>
//             <ReceiptIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Billing & Payments" />}
//           {open &&
//             (expandedItems.billingPayments ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse
//           in={expandedItems.billingPayments}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/order-summaries"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <ReceiptIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order Summaries" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/payment-processing"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <ReceiptIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payment Processing" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Customer Relationship Management */}
//         <ListItem button onClick={() => handleExpandClick("crm")}>
//           <ListItemIcon>
//             <PeopleIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Customer Management" />}
//           {open && (expandedItems.crm ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse in={expandedItems.crm} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/customer-profiles"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <PeopleIcon />
//               </ListItemIcon>
//               <ListItemText primary="Customer Profiles" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/loyalty-programs"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <PeopleIcon />
//               </ListItemIcon>
//               <ListItemText primary="Loyalty Programs" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Analytics and Reporting */}
//         <ListItem
//           button
//           onClick={() => handleExpandClick("analyticsReporting")}
//         >
//           <ListItemIcon>
//             <AssessmentIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Analytics & Reporting" />}
//           {open &&
//             (expandedItems.analyticsReporting ? (
//               <ExpandLess />
//             ) : (
//               <ExpandMore />
//             ))}
//         </ListItem>
//         <Collapse
//           in={expandedItems.analyticsReporting}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/sales-reports"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <AssessmentIcon />
//               </ListItemIcon>
//               <ListItemText primary="Sales Reports" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/customer-insights"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <AssessmentIcon />
//               </ListItemIcon>
//               <ListItemText primary="Customer Insights" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Notifications */}
//         <ListItem button onClick={() => handleExpandClick("notifications")}>
//           <ListItemIcon>
//             <NotificationsIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Notifications" />}
//           {open &&
//             (expandedItems.notifications ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse in={expandedItems.notifications} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/order-notifications"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <NotificationsIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order Notifications" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/promotional-messages"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <NotificationsIcon />
//               </ListItemIcon>
//               <ListItemText primary="Promotional Messages" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Table Management */}
//         <ListItem button onClick={() => handleExpandClick("tableManagement")}>
//           <ListItemIcon>
//             <TableChartIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Table Management" />}
//           {open &&
//             (expandedItems.tableManagement ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse
//           in={expandedItems.tableManagement}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/real-time-table-status"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <TableChartIcon />
//               </ListItemIcon>
//               <ListItemText primary="Real-Time Table Status" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/waitlist-management"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <TableChartIcon />
//               </ListItemIcon>
//               <ListItemText primary="Waitlist Management" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Employee Management */}
//         <ListItem
//           button
//           onClick={() => handleExpandClick("employeeManagement")}
//         >
//           <ListItemIcon>
//             <PeopleIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Employee Management" />}
//           {open &&
//             (expandedItems.employeeManagement ? (
//               <ExpandLess />
//             ) : (
//               <ExpandMore />
//             ))}
//         </ListItem>
//         <Collapse
//           in={expandedItems.employeeManagement}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/shift-scheduling"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <PeopleIcon />
//               </ListItemIcon>
//               <ListItemText primary="Shift Scheduling" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/attendance-tracking"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <PeopleIcon />
//               </ListItemIcon>
//               <ListItemText primary="Attendance Tracking" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Security and Backup */}
//         <ListItem button onClick={() => handleExpandClick("securityBackup")}>
//           <ListItemIcon>
//             <SecurityIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Security & Backup" />}
//           {open &&
//             (expandedItems.securityBackup ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse
//           in={expandedItems.securityBackup}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/secure-data-storage"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <SecurityIcon />
//               </ListItemIcon>
//               <ListItemText primary="Secure Data Storage" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/automated-backups"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <SecurityIcon />
//               </ListItemIcon>
//               <ListItemText primary="Automated Backups" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Responsive Design */}
//         <ListItem button onClick={() => handleExpandClick("responsiveDesign")}>
//           <ListItemIcon>
//             <MobileFriendlyIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Responsive Design" />}
//           {open &&
//             (expandedItems.responsiveDesign ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse
//           in={expandedItems.responsiveDesign}
//           timeout="auto"
//           unmountOnExit
//         >
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/mobile-compatibility"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <MobileFriendlyIcon />
//               </ListItemIcon>
//               <ListItemText primary="Mobile Compatibility" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/offline-support"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <MobileFriendlyIcon />
//               </ListItemIcon>
//               <ListItemText primary="Offline Support" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Localization and Multi-language Support */}
//         <ListItem button onClick={() => handleExpandClick("localization")}>
//           <ListItemIcon>
//             <LanguageIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Localization & Language" />}
//           {open &&
//             (expandedItems.localization ? <ExpandLess /> : <ExpandMore />)}
//         </ListItem>
//         <Collapse in={expandedItems.localization} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               component={Link}
//               to="/language-options"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <LanguageIcon />
//               </ListItemIcon>
//               <ListItemText primary="Language Options" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/currency-support"
//               sx={{ pl: 4 }}
//             >
//               <ListItemIcon>
//                 <LanguageIcon />
//               </ListItemIcon>
//               <ListItemText primary="Currency Support" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Users */}
//         <ListItem button component={Link} to="/users">
//           <ListItemIcon>
//             <GroupIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Users" />}
//         </ListItem>

//         {/* Create User */}
//         <ListItem button component={Link} to="/create-user">
//           <ListItemIcon>
//             <PersonAddIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Create User" />}
//         </ListItem>

//         {/* Courses */}
//         <ListItem button component={Link} to="/courses">
//           <ListItemIcon>
//             <SchoolIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Courses" />}
//         </ListItem>

//         {/* About */}
//         <ListItem button component={Link} to="/about">
//           <ListItemIcon>
//             <InfoIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="About" />}
//         </ListItem>

//         {/* Contact */}
//         <ListItem button component={Link} to="/contact">
//           <ListItemIcon>
//             <ContactMailIcon />
//           </ListItemIcon>
//           {open && <ListItemText primary="Contact" />}
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
