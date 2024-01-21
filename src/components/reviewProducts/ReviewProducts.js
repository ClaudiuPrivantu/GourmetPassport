import React, { useEffect, useState } from 'react'
import styles from './ReviewProducts.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import { useSelector } from 'react-redux';
import { selectUserID, selectUserName } from '../../redux/slice/authSlice';
import spinnerImg from './../../assets/loader.gif'
import Card from '../card/Card';
import StarsRating from 'react-star-rate';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';

const ReviewProducts = () => {
    const [rate, setRate] = useState(0);
    const [review, setReview] = useState("");
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { document } = useFetchDocument("products", id);
    const userID = useSelector(selectUserID);
    const userName = useSelector(selectUserName);
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(document);
    }, [document]);

    const submitReview = (e) => {
        e.preventDefault();

        const today = new Date();
        const date = today.toDateString();
        const reviewConfig = {
            userID,
            userName,
            productID: id,
            rate,
            review,
            reviewDate: date,
            createdAt: Timestamp.now().toDate(),
        };
        try {
            addDoc(collection(db, "reviews"), reviewConfig);
            toast.success("Review-ul a fost salvat cu succes!");
            setRate(0);
            setReview("");
            navigate('/order-history');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section>
            <div className={`container ${styles.review}`}>
                <h2>Oferă un Review pentru acest preparat</h2>
                {product === null ? (
                    <img src={spinnerImg} alt="Loading..." style={{ width: "100px" }} />
                ) : (
                    <>
                        <p>
                            <b>Nume preparat: </b> {product.name}
                        </p>
                        <img
                            src={product.imageURL}
                            alt={product.name}
                            style={{ width: "100px" }}
                        />
                    </>
                )}

                <Card cardClass={styles.card}>
                    <form onSubmit={(e) => submitReview(e)}>
                        <label>Rating:</label>
                        <StarsRating
                            value={rate}
                            onChange={(rate) => {
                                setRate(rate);
                            }}
                        />
                        <label>Review</label>
                        <textarea
                            value={review}
                            required
                            onChange={(e) => setReview(e.target.value)}
                            cols="30"
                            rows="10"
                        ></textarea>
                        <button type="submit" className="--btn --btn-primary">
                            Review preparat
                        </button>
                    </form>
                </Card>
            </div>
        </section>
    );
}

export default ReviewProducts