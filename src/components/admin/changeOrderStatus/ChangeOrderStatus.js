import React, { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import { useNavigate } from 'react-router-dom';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader';
import Card from '../../card/Card';

const ChangeOrderStatus = ({ order, id }) => {
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const editOrder = (e, id) => {
        e.preventDefault();
        setIsLoading(true);

        const orderConfig = {
            userID: order.userID,
            userEmail: order.userEmail,
            orderDate: order.orderDate,
            orderTime: order.orderTime,
            orderAmount: order.orderAmount,
            orderStatus: status,
            cartItems: order.cartItems,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            editedAt: Timestamp.now().toDate(),
        };
        try {
            setDoc(doc(db, "orders", id), orderConfig);

            setIsLoading(false);
            toast.success("Statusul comenzii a fost actualizat cu succes!");
            navigate("/admin/orders");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.status}>
                <Card cardClass={styles.card}>
                    <h4>Actualizează statusul comenzii</h4>
                    <form onSubmit={(e) => editOrder(e, id)}>
                        <span>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" disabled>
                                    -- Alege un status --
                                </option>
                                <option value="Plasată">Plasată</option>
                                <option value="În procesare">În procesare</option>
                                <option value="Preluată">Preluată</option>
                                <option value="Livrată">Livrată</option>
                            </select>
                        </span>
                        <span>
                            <button type="submit" className="--btn --btn-primary">
                                Actualizează statusul
                            </button>
                        </span>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default ChangeOrderStatus;