import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import styles from './CheckoutForm.module.scss'
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from './../../assets/loader.gif';
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
    }, [stripe]);

    const saveOrder = () => {
        console.log("Order saved");
        navigate("/checkout-success");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const confirmPayment = await stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    // redirect to this url when the payment success
                    return_url: "http://localhost:3000/checkout-success",
                },
                redirect: "if_required",
            })
            .then((result) => {
                // ok - paymentIntent // bad - error
                if (result.error) {
                    toast.error(result.error.message);
                    setMessage(result.error.message);
                    return;
                }
                if (result.paymentIntent) {
                    if (result.paymentIntent.status === "succeeded") {
                        setIsLoading(false);
                        toast.success("Plata a fost realizată cu succes!");
                        saveOrder();
                    }
                }
            });

        setIsLoading(false);
    };

    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary />
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={`${styles.card} ${styles.pay}`}>
                            <h3>Plătește prin Stripe</h3>
                            <PaymentElement id={styles["payment-element"]} />
                            <button
                                disabled={isLoading || !stripe || !elements}
                                id="submit"
                                className={styles.button}
                            >
                                <span id="button-text">
                                    {isLoading ? (
                                        <img
                                            src={spinnerImg}
                                            alt="Loading..."
                                            style={{ width: "20px" }}
                                        />
                                    ) :
                                        "Plătește"
                                    }
                                </span>
                            </button>
                            {/* Show any error or success messages */}
                            {message && <div id={styles["payment-message"]}>{message}</div>}
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CheckoutForm;