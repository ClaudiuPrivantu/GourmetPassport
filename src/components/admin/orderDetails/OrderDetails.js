import React, { useEffect, useState } from 'react'
import styles from './OrderDetails.module.scss'
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import spinnerImg from './../../../assets/loader.gif'

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const { document } = useFetchDocument("orders", id);

    useEffect(() => {
        setOrder(document);
    }, [document]);

    return (
        <>
            <div className={styles.table}>
                <h2>Detaliile comenzii</h2>
                <div>
                    <Link to="/admin/orders">&larr; Înapoi la comenzi</Link>
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
                            <b>Nume client: </b> {order.shippingAddress.name}
                        </p>
                        <p>
                            <b>Adresa de livrare: </b>
                            {order.shippingAddress.line1}, {order.shippingAddress.line2}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
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
                                            <td>{price} LEI</td>
                                            <td>{cartQuantity}</td>
                                            <td>{(price * cartQuantity)} LEI</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );
}

export default OrderDetails