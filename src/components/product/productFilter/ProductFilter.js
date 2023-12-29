import React, { useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_CONTINENT, FILTER_BY_COUNTRY, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice';

const ProductFilter = () => {
  const [continent, setContinent] = useState("Toate");
  const [country, setCountry] = useState("Toate");
  const products = useSelector(selectProducts);
  const [price, setPrice] = useState(400);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allContinents = [
    "Toate",
    ...new Set(products.map((product) => product.continent)),
  ];
  const allCountries = [
    "Toate",
    ...new Set(products.map((product) => product.country)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_COUNTRY({ products, country }));
  }, [dispatch, products, country]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cont) => {
    setContinent(cont);
    dispatch(FILTER_BY_CONTINENT({ products, continent: cont }));
  };

  const clearFilters = () => {
    setContinent("Toate");
    setCountry("Toate");
    setPrice(maxPrice);
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
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {allCountries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <h4>Preț</h4>
        <p>{`${price} LEI`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Șterge filtrele
        </button>
      </div>
    </div>
  );
}

export default ProductFilter