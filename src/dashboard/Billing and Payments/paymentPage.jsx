import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Billing and Payments/checkoutForm"; // A form that we'll create for payment

const stripePromise = loadStripe(
  "pk_test_51Otr1uQjks9zJPuQjgLp4dcASe6qAy5vYAPyGe4hvPuwgUw8mJAnpqOqzniPNpbGIFiMVLi5IkBNkydJltV1Kyy500svdRdp8g"
);

const PaymentPage = ({ total }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={total} />
    </Elements>
  );
};

export default PaymentPage;
