import React from 'react'
import styles from './ProductFilter.module.scss'

const ProductFilter = () => {
  return (
    <div className={styles.filter}>
      <h4>Continent</h4>
      <div className={styles.continent}>
            <button>All</button>
      </div>
      <h4>Țară de origine</h4>
      <div className={styles.country}>
        <select name="brand">
              <option value = "all">
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