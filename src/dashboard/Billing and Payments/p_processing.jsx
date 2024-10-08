import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { db } from "../../Login Component/firebase"; // Adjust path
import { doc, getDoc } from "firebase/firestore";
import PaymentPage from "../Billing and Payments/paymentPage"; // Assuming this is the Stripe payment integration component

const PaymentProcessing = () => {
  const { orderId } = useParams(); // This should capture the orderId from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const orderRef = doc(db, "orders", orderId); // Fetch using the document ID (orderId)
          const orderSnap = await getDoc(orderRef);

          if (orderSnap.exists()) {
            setOrder(orderSnap.data());
          } else {
            console.error("Order not found");
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };

    fetchOrder();
  }, [orderId]);

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
      {order ? (
        <>
          <Typography variant="h4" gutterBottom>
            Payment for Order: {order.orderId || order.id}{" "}
            {/* Use orderId or id */}
          </Typography>
          <Typography variant="h6">
            Total: ${calculateTotal(order.items)}
          </Typography>
          <PaymentPage total={calculateTotal(order.items)} />{" "}
          {/* Stripe payment form */}
        </>
      ) : (
        <Typography variant="h6">Loading order...</Typography>
      )}
    </Box>
  );
};

export default PaymentProcessing;
