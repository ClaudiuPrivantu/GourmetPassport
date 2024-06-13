import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/slice/authSlice';
import styles from "./ClientNavbar.module.scss"
import { NavLink } from 'react-router-dom';
import { GiCook } from 'react-icons/gi';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const ClientNavbar = () => {
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
            <NavLink to="/order-history" className={activeLink}>
              Comenzile mele
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ClientNavbar