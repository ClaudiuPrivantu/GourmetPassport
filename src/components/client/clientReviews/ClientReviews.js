import React from 'react'
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { useSelector } from 'react-redux';
import { selectUserID } from '../../../redux/slice/authSlice';
import StarsRating from 'react-star-rate';
import styles from './ClientReviews.module.scss'
import Card from '../../card/Card';
import { selectProducts } from '../../../redux/slice/productSlice';

const ClientReviews = () => {
    const userID = useSelector(selectUserID);
    const products = useSelector(selectProducts);

    const { data } = useFetchCollection("reviews");
    const filteredReviews = data.filter((review) => review.userID === userID);

    return (
        <div className={styles.clientReviews}>
            <Card cardClass={styles.card}>
                <h1>Recenziile mele</h1>
                <div>
                    {filteredReviews.length === 0 ? (
                        <p>Momentan nu sunt recenzii pentru acest preparat.</p>
                    ) : (
                        <>
                            {filteredReviews.map((item, index) => {
                                const { rate, review, reviewDate, productID } = item;
                                const foundProduct = products.find((product) => product.id === productID);
                                return (
                                    <div key={index} className={styles.review}>
                                        {foundProduct && (
                                            <div className={styles.productInfo}>
                                                <div className={styles.img}>
                                                    <img src={foundProduct.imageURL} alt={foundProduct.name} />
                                                </div>
                                                <div className={styles.text}>
                                                    <h3>{foundProduct.name}</h3>
                                                    <p>
                                                        <b>Preț:</b> {`${foundProduct.price} LEI`}
                                                    </p>
                                                    <p>
                                                        <b>Origine:</b> {`${foundProduct.continent} - ${foundProduct.country}`}
                                                    </p>
                                                    <StarsRating value={rate} />
                                                    <h4>{review}</h4>
                                                    <p>
                                                        <b>Data recenziei:</b> {reviewDate}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default ClientReviews;
