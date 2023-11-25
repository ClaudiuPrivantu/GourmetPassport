import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/slice/authSlice';
import styles from "./Navbar.module.scss"
import { GiCook } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <GiCook size={150} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Panou general
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              Toate produsele
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Adaugă produs
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Comenzi
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar