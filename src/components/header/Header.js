import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../firebase/config"
import { toast } from 'react-toastify';

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Gourmet<span>Passport</span>
      </h2>
    </Link>
  </div>
)

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
)
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  //Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
        setDisplayName(user.displayName);
        // if (user.displayName == null) {
        //   const u1 = user.email.substring(0, user.email.indexOf("@"));
        //   const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        //   setDisplayName(uName);
        // } else {
        //   setDisplayName(user.displayName);
        // }
      } else {
        setDisplayName("");
      }
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const navigate = useNavigate()

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully")
        navigate("/")
      }).catch((error) => {
        toast.error(error.message)
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={
          showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
        }>
          <div className={
            showMenu
              ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
              : `${styles["nav-wrapper"]}`
          }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
              <a href="#">
                <FaUserCircle size={16}/>
                Hi, {displayName}
                </a>
              <NavLink to="/register" className={activeLink}>Register</NavLink>
              <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}>

          </HiOutlineMenuAlt3>
        </div>

      </div>
    </header>
  )
}

export default Header