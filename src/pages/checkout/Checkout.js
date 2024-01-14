import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectBillingAddress, selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { selectEmail } from '../../redux/slice/authSlice';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
    const [message, setMessage] = useState("Se inițializează comanda...");
    const [clientSecret, setClientSecret] = useState("");

    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartTotalAmount);
    const customerEmail = useSelector(selectEmail);

    const shippingAddress = useSelector(selectShippingAddress);
    const billingAddress = useSelector(selectBillingAddress);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch, cartItems]);

    const description = `Plată GourmetPassport: Email client: ${customerEmail}, Sumă: ${totalAmount}`;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads

        // For the localhost we will use the link above:
        // http://localhost:4242/create-payment-intent

        // For the onlinehost/deployed app we will use the link provided by the host site, one with https:
        // https://
        fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartItems,
                userEmail: customerEmail,
                shipping: shippingAddress,
                billing: billingAddress,
                description,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.json().then((json) => Promise.reject(json));
            })
            .then((data) => {
                setClientSecret(data.clientSecret);
            })
            .catch((error) => {
                setMessage("Nu s-a putut inițializa comanda!");
                toast.error("Ceva nu a mers bine!");
            });
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <section>
                <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
            </section>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
};

export default Checkout;