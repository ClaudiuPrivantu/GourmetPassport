import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss'
import spinnerImg from './../../../assets/loader.gif'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Card from '../../card/Card';
import StarsRating from 'react-star-rate';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const { document } = useFetchDocument("products", id)
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  useEffect(() => {
    setProduct(document)
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const getShortenedDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Detaliile preparatului</h2>
        <div>
          <Link to="/products">&larr; Înapoi la preparate</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "40%" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`${product.price} LEI`}</p>
                <p>
                  <b>Serie:</b> {product.id}
                </p>
                <p>
                  <b>Origine:</b> {`${product.continent} - ${product.country}`}
                </p>
                <p>
                  {showFullDescription ? (
                    <>
                      {product.desc}
                      <button
                        className="--btn --btn-link"
                        onClick={() => setShowFullDescription(false)}
                      >
                        Afișează mai puțin
                      </button>
                    </>
                  ) : (
                    <>
                      {getShortenedDescription(product.desc, 150)}
                      <button
                        className="--btn --btn-link"
                        onClick={() => setShowFullDescription(true)}
                      >
                        Afișează mai mult
                      </button>
                    </>
                  )}
                </p>


                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  Adaugă în coș
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Recenzii din partea clienților</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>Momentan nu sunt recenzii pentru acest preparat.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>Client: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails