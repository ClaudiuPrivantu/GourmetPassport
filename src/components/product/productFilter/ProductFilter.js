import React, { useState } from 'react'
import styles from './ProductFilter.module.scss'
import { selectProducts } from '../../../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_CONTINENT } from '../../../redux/slice/filterSlice';

const ProductFilter = () => {
  const [continent, setContinent] = useState("Toate");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const allContinents = [
    "Toate",
    ...new Set(products.map((product) => product.continent)),
  ];

  const filterProducts = (cont) => {
    setContinent(cont);
    dispatch(FILTER_BY_CONTINENT({ products, continent: cont }));
  };

  return (
    <div className={styles.filter}>
      <h4>Continent</h4>
      <div className={styles.continent}>
        {allContinents.map((cont, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${continent}` === cont ? `${styles.active}` : null}
              onClick={() => filterProducts(cont)}
            >
              &#8250; {cont}
            </button>
          );
        })}
      </div>
      <h4>Țară de origine</h4>
      <div className={styles.country}>
        <select name="brand">
          <option value="all">
            All
          </option>
        </select>
        <h4>Preț</h4>
        <p>1500</p>
        <div className={styles.price}>
          <input
            type="range"
            name="price"
            min={100}
            max={1000}
          />
        </div>
        <br />
        <button className="--btn --btn-danger">
          Șterge filtrele
        </button>
      </div>
    </div>
  );
}

export default ProductFilter