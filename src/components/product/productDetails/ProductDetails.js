import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import styles from './ProductDetails.module.scss'
import spinnerImg from './../../../assets/loader.gif'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    } else {
      toast.error("Preparatul nu a fost găsit!");
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Detaliile preparatului</h2>
        <div>
          <Link to="/#products">&larr; Înapoi la preparate</Link>
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
                <p>{product.desc}</p>
                <p>
                  <b>Serie:</b> {product.id}
                </p>
                <p>
                  <b>Origine:</b> {`${product.continent} - ${product.country}`}
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
      </div>
    </section>
  );
};

export default ProductDetails