import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import styles from './OrderDetails.module.scss'
import spinnerImg from './../../assets/loader.gif'

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const { document } = useFetchDocument("orders", id);

    useEffect(() => {
        setOrder(document);
    }, [document]);

    return (
        <section>
            <div className={`container ${styles.table}`}>
                <h2>Detaliile comenzii</h2>
                <div>
                    <Link to="/order-history">&larr; Înapoi la comenzile mele</Link>
                </div>
                <br />
                {order === null ? (
                    <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
                ) : (
                    <>
                        <p>
                            <b>ID: </b> {order.id}
                        </p>
                        <p>
                            <b>Valoare: </b> {`${order.orderAmount} LEI`}
                        </p>
                        <p>
                            <b>Status comandă: </b> {order.orderStatus}
                        </p>
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Preparat</th>
                                    <th>Preț</th>
                                    <th>Cantitate</th>
                                    <th>Total</th>
                                    <th>Acțiune</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cartItems.map((cart, index) => {
                                    const { id, name, price, imageURL, cartQuantity } = cart;
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <b>{index + 1}</b>
                                            </td>
                                            <td>
                                                <p>
                                                    <b>{name}</b>
                                                </p>
                                                <img
                                                    src={imageURL}
                                                    alt={name}
                                                    style={{ width: "100px" }}
                                                />
                                            </td>
                                            <td>{price}</td>
                                            <td>{cartQuantity}</td>
                                            <td>{(price * cartQuantity)} LEI</td>
                                            <td className={styles.icons}>
                                                <button className="--btn --btn-primary">
                                                    <Link to={`/review-product/${id}`}>
                                                        Review preparat
                                                    </Link>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </section>
    );
};

export default OrderDetails;  