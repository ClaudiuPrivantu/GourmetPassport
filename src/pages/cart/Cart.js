import React from 'react'
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, DECREASE_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../components/card/Card';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Coșul de cumpărături</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Coșul dumneavoastră este momentan gol!</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continuați cumpărăturile</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Serie</th>
                  <th>Preparat</th>
                  <th>Preț</th>
                  <th>Cantitate</th>
                  <th>Total</th>
                  <th>Acțiune</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
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
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity)} LEI</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger"
              >
                Golește coșul de cumpărături
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continuați cumpărăturile</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Numărul de produse: ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`${cartTotalAmount} LEI`}</h3>
                  </div>
                  <p>Taxa de livrare este afișată la checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;