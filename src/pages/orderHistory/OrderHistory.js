import React, { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection';

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  console.log(data);


  return (
    <div>OrderHistory</div>
  );
};

export default OrderHistory;