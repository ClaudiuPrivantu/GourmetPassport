import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../firebase/config"
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "./../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'

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
      Coșul meu
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
)
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        }))
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("V-ați deconectat cu succes!")
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
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">
                    Admin
                  </button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Acasă
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contactează-ne
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home" style={{ color: "#F0A500" }}>
                  <FaUserCircle size={16} />
                  Bună, {displayName}
                </a>
                <NavLink to="/order-history" className={activeLink}>Comenzile mele</NavLink>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
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