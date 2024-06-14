import React from 'react'
import Card from '../../card/Card';
import { Link } from 'react-router-dom';
import styles from "./ProductItem.module.scss"
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../redux/slice/cartSlice';

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY(product));
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <h4>{shortenText(name, 30)}</h4>
          <p>{`${price} LEI`}</p>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 250)}</p>}

        <button
          className="--btn --btn-primary"
          onClick={() => addToCart(product)}
        >
          Adaugă în coș
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;