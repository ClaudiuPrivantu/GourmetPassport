import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/slice/authSlice';
import styles from "./Navbar.module.scss"
import { MdAdminPanelSettings } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <MdAdminPanelSettings size={150} color="#fff" />
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
              Toate preparatele
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Adaugă un preparat
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