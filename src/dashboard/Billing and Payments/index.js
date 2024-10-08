const functions = require("firebase-functions");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Otr1uQjks9zJPuQNcqptgfV0a3YMLm5ND3ChCePOItHpMAGhMWxjkZ5g9PEYAREllhYWUFnd8RDCpS1z9ZFPgb100HS1SiP5p"
); // Replace with your Stripe Secret Key

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  const { amount } = req.body; // Amount should be sent from the frontend in cents

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // The amount to charge (in cents)
      currency: "usd", // Example with USD currency
    });

    // Send the client secret to the frontend
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).send("Server error");
  }
});
