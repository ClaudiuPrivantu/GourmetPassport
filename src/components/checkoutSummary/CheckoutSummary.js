import React from 'react'
import styles from './CheckoutSummary.module.scss';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import Card from '../card/Card';

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    return (
        <div>
            <h3>Sumarul comenzii</h3>
            <div>
                {cartItems.lenght === 0 ? (
                    <>
                        <p>Coșul dumneavoastră este momentan gol!</p>
                        <button className="--btn">
                            <Link to="/#products">&larr; Continuați cumpărăturile</Link>
                        </button>
                    </>
                ) : (
                    <div>
                        <p>
                            {`Numărul de produse: ${cartTotalQuantity}`}
                        </p>
                        <div className={styles.text}>
                            <h4>Subtotal:</h4>
                            <h3>{`${cartTotalAmount} LEI`}</h3>
                        </div>
                        {cartItems.map((item, index) => {
                            const { id, name, price, cartQuantity } = item;
                            return (
                                <Card key={id} cardClass={styles.card}>
                                    <h4>Preparat: {name}</h4>
                                    <p>Cantitate: {cartQuantity}</p>
                                    <p>Preț unitar: {price} LEI</p>
                                    <p>Preț total: {price * cartQuantity} LEI</p>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutSummary;