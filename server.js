require("dotenv").config()
const express = require("express");
const cors = require("cors");
// This is the secret API key.
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();

app.use(cors())
app.use(express.json());

const path = require("path");

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
  }

app.get("/", (request, response) => {
    response.send("Într-un singur click, lumea gastronomiei vine la ușa voastră. Bine ați venit în lumea GourmetPassport!")
})

const calculateOrderAmount = (items) => {
    const totalAmount = items.reduce((accumulator, item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return accumulator + cartItemAmount;
    }, 0);

    return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items, shipping, description } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "ron",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
        description,
        shipping: {
            address: {
                line1: shipping.line1,
                line2: shipping.line2,
                country: shipping.country,
                state: shipping.state,
                city: shipping.city,
                postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
        },
        // receipt_email: customerEmail
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

// we have different port on localhost and on live
const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));