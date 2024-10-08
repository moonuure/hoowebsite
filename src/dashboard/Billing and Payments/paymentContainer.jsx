import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51Otr1uQjks9zJPuQjgLp4dcASe6qAy5vYAPyGe4hvPuwgUw8mJAnpqOqzniPNpbGIFiMVLi5IkBNkydJltV1Kyy500svdRdp8g"
); // Replace with your Stripe publishable key

const PaymentPage = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing…" : "Pay"}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

// Main component to initiate the payment
const PaymentContainer = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch the client secret from the backend
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 5000 }), // Example: $50.00 (5000 cents)
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      {clientSecret && <PaymentPage clientSecret={clientSecret} />}
    </Elements>
  );
};

export default PaymentContainer;
