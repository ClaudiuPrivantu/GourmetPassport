import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer, AdminOnlyRoute, ProductDetails, ReviewProducts, Product, ClientReviews } from './components';
import { Home, Contact, Login, Register, Reset, Admin, Cart, CheckoutDetails, Checkout, CheckoutSuccess, OrderHistory, OrderDetails, NotFound, Client } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-details' element={<CheckoutDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/order-details/:id' element={<OrderDetails />} />
          <Route path='/review-product/:id' element={<ReviewProducts />} />
          <Route path='/client-account' element={<Client />} />
          <Route path='/client-reviews' element={<ClientReviews />} />
          <Route path='/products' element={<Product />} />
          <Route path='*' element={<NotFound />} />

          {/* the admin page is accessible only when the admin user is logged in */}
          <Route path='/admin/*' element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;