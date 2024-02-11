import React from 'react'
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
    return (
        <section>
            <div className="container">
                <h2>Comanda a fost plasată cu succes!</h2>
                <p>Mulțumim pentru comandă!</p>
                <br />

                <button className="--btn --btn-primary">
                    <Link to="/order-history">Monitorizează statusul comenzii</Link>
                </button>
            </div>
        </section>
    );
};

export default CheckoutSuccess;