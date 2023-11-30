import React, { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast } from 'react-toastify'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const ViewProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(allProducts);
        setProducts(allProducts);
      });

    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };

  return (
    <div>ViewProducts</div>
  )
}

export default ViewProducts