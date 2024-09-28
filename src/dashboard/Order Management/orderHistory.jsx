import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { db } from "../../Login Component/firebase"; // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersList = ordersSnapshot.docs.map((doc) => {
        const orderData = doc.data();

        // Calculate totalAmount if not present
        const totalAmount = orderData.items.reduce((total, item) => {
          const price = parseFloat(item.price) || 0; // Ensure price is a valid number
          return total + price * item.quantity;
        }, 0);

        return {
          id: doc.id,
          ...orderData,
          totalAmount: orderData.totalAmount || totalAmount,
        };
      });
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    // Replace the body content with the content you want to print
    document.body.innerHTML = printContent.innerHTML;

    // Print the window
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;
    window.location.reload(); // This will reload the page to reset any state
  };

  const calculateSubtotal = (items) => {
    return items.reduce((subtotal, item) => {
      const price = parseFloat(item.price) || 0; // Ensure price is a valid number
      return subtotal + price * item.quantity;
    }, 0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Prepared By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.createdAt?.toDate().toLocaleString() || "N/A"}
                </TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen(order)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent ref={printRef}>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h6">{selectedOrder.orderId}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {selectedOrder.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date:{" "}
                    {selectedOrder.createdAt?.toDate().toLocaleString() ||
                      "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Amount: ${selectedOrder.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    User: {selectedOrder.userName}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Payment Information</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Evc: 252618280055
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Acc: Salaam Bank: 33293113
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Merchant: 332931
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          ${parseFloat(item.price).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography
                variant="h6"
                sx={{ marginTop: 2, textAlign: "right" }}
              >
                Subtotal: ${calculateSubtotal(selectedOrder.items).toFixed(2)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions className="print-hide">
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handlePrint} variant="contained" color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderHistory;
