import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';
import Card from '../../card/Card';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={styles["product-list"]} id="product">
      <Card cardClass={styles.card}>
        <div className={styles.top}>
          <div className={styles.icons}>
            <BsGrid3X3GapFill
              size={22}
              color="orangered"
              onClick={() => setGrid(true)}
            />

            <BsListUl size={24} color="rgb(117, 90, 137)" onClick={() => setGrid(false)} />

            <p>
              <b>{filteredProducts.length}</b> preparate găsite
            </p>
          </div>
          {/* Search Icon */}
          <div>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {/* Sort Products */}
          <div className={styles.sort}>
            <label>Sortează după:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Recente</option>
              <option value="lowest-price">Preț crescător</option>
              <option value="highest-price">Preț descrescător</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>

        <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {products.lenght === 0 ? (
            <p>Nu a fost găsit niciun preparat.</p>
          ) : (
            <>
              {currentProducts.map((product) => {
                return (
                  <div key={product.id}>
                    <ProductItem {...product} grid={grid} product={product} />
                  </div>
                );
              })}
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </Card>
    </div>
  );
};

export default ProductList;