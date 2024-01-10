import React, { useState } from 'react'
import styles from './CheckoutDetails.module.scss'
import Card from '../../components/card/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';

const initialAddressState = {
    name: "",
    street_name: "",
    street_number: "",
    country: "România",
    state: "",
    city: "",
    postal_code: "",
    phone: "",
};

const CheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState({
        ...initialAddressState,
    });
    const [billingAddress, setBillingAddress] = useState({
        ...initialAddressState,
    });

    const countries = [
        "România",
        "Ungaria",
        "Serbia",
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShipping = (e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        });
    };

    const handleBilling = (e) => {
        const { name, value } = e.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(shippingAddress);
        // console.log(billingAddress);
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
        dispatch(SAVE_BILLING_ADDRESS(billingAddress));
        navigate("/checkout");
    };

    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Detaliile comenzii</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <h3>Adresa de livrare</h3>
                            <label>Nume client:</label>
                            <input
                                type="text"
                                placeholder="Nume client"
                                required
                                name="name"
                                value={shippingAddress.name}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Numele străzii:</label>
                            <input
                                type="text"
                                placeholder="Numele străzii"
                                required
                                name="street_name"
                                value={shippingAddress.street_name}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Numărul străzii:</label>
                            <input
                                type="text"
                                placeholder="Numărul străzii"
                                required
                                name="street_number"
                                value={shippingAddress.street_number}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Țară:</label>
                            <select
                                className={styles.select}
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    handleShipping({
                                        target: {
                                            name: "country",
                                            value: e.target.value,
                                        },
                                    })
                                }>
                                {countries.map((country, index) => {
                                    return (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    );
                                })}
                            </select>
                            <label>Județ:</label>
                            <input
                                type="text"
                                placeholder="Județ"
                                required
                                name="state"
                                value={shippingAddress.state}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Oraș:</label>
                            <input
                                type="text"
                                placeholder="Oraș"
                                required
                                name="city"
                                value={shippingAddress.city}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Cod poștal:</label>
                            <input
                                type="text"
                                placeholder="Cod poștal"
                                required
                                name="postal_code"
                                value={shippingAddress.postal_code}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Număr de telefon:</label>
                            <input
                                type="text"
                                placeholder="Număr de telefon"
                                required
                                name="phone"
                                value={shippingAddress.phone}
                                onChange={(e) => handleShipping(e)}
                            />
                        </Card>
                        {/* BILLING ADDRESS */}
                        <Card cardClass={styles.card}>
                            <h3>Adresa de facturare</h3>
                            <label>Nume:</label>
                            <input
                                type="text"
                                placeholder="Nume"
                                required
                                name="name"
                                value={billingAddress.name}
                                onChange={(e) => handleBilling(e)}
                            />
                            <label>Numele străzii:</label>
                            <input
                                type="text"
                                placeholder="Numele străzii"
                                required
                                name="street_name"
                                value={billingAddress.street_name}
                                onChange={(e) => handleBilling(e)}
                            />
                            <label>Numărul străzii:</label>
                            <input
                                type="text"
                                placeholder="Numărul străzii"
                                required
                                name="street_number"
                                value={billingAddress.street_number}
                                onChange={(e) => handleBilling(e)}
                            />
                            <label>Țară:</label>
                            <select
                                className={styles.select}
                                value={billingAddress.country}
                                onChange={(e) =>
                                    handleBilling({
                                        target: {
                                            name: "country",
                                            value: e.target.value,
                                        },
                                    })
                                }>
                                {countries.map((country, index) => {
                                    return (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    );
                                })}
                            </select>
                            <label>Județ:</label>
                            <input
                                type="text"
                                placeholder="Județ"
                                required
                                name="state"
                                value={billingAddress.state}
                                onChange={(e) => handleBilling(e)}
                            />
                            <label>Oraș:</label>
                            <input
                                type="text"
                                placeholder="Oraș"
                                required
                                name="city"
                                value={billingAddress.city}
                                onChange={(e) => handleBilling(e)}
                            />
                            <label>Cod poștal:</label>
                            <input
                                type="text"
                                placeholder="Cod poștal"
                                required
                                name="postal_code"
                                value={billingAddress.postal_code}
                                onChange={(e) => handleBilling(e)}
                            />
                            <label>Număr de telefon:</label>
                            <input
                                type="text"
                                placeholder="Număr de telefon"
                                required
                                name="phone"
                                value={billingAddress.phone}
                                onChange={(e) => handleBilling(e)}
                            />
                            <button type="submit" className="--btn --btn-primary">
                                Continuă către plată
                            </button>
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary />
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CheckoutDetails;