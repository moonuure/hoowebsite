import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Box, Typography } from "@mui/material";

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "your-client-secret", // You will generate this from the server
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message);
    } else {
      setSucceeded(true);
      setError(null);
      console.log("Payment successful", paymentIntent);
    }

    setProcessing(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Total: ${total}</Typography>
      <CardElement />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        type="submit"
        disabled={!stripe || processing || succeeded}
        sx={{ marginTop: 2 }}
      >
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
