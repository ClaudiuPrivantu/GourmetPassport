import React, { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../../firebase/config'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Loader from '../../loader/Loader'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice'
import Search from '../../search/Search'
import Pagination from '../../pagination/Pagination'

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
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
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Sunteți sigur?",
      "Sunteți pe cale să ștergeți acest preparat.",
      "Da, sunt sigur",
      "Nu, nu sunt",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        // console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Preparatul a fost șters cu succes!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>Toate preparatele</h2>

        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> produse disponibile
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>Nu a fost găsit niciun produs.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Imagine</th>
                <th>Nume</th>
                <th>Origine</th>
                <th>Preț</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, country, continent } = product;
                return (

                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{`${continent} - ${country}`}</td>
                    <td>{`${price} LEI`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>

                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
}

export default ViewProducts