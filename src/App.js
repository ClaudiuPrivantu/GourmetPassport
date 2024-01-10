import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer, AdminOnlyRoute, ProductDetails } from './components';
import { Home, Contact, Login, Register, Reset, Admin, Cart } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutDetails from './pages/checkout/CheckoutDetails';

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