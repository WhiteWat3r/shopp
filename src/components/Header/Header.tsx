import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import logoImage from '../../assets/logov2.svg';
import { CiHeart, CiHome, CiShoppingCart } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { MdOutlineContactSupport } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { VerticalMenu } from '../VerticalMenu/VerticalMenu';

export const Header = () => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

  const handleResize = () => {
    setCurrentWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangeVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {currentWidth > 960 ? (
          <>
            <nav className={styles.header__nav}>
              <Link to="/" className={styles.header__logoContainer}>
                <img src={logoImage} alt="Логотип" className={styles.header__logo} />
              </Link>
              <ul className={styles.header__menu}>
                <li className={styles.header__item}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>
                    <CiHome size={18} />
                    Главная
                  </NavLink>
                </li>
                <li className={styles.header__item}>
                  <NavLink
                    to="/catalog"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>
                    <IoMdMenu size={20} />
                    Каталог
                  </NavLink>
                </li>
                <li className={styles.header__item}>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>
                    О нас(-)
                  </NavLink>
                </li>
                <li className={styles.header__item}>
                  <NavLink
                    to="/support"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>
                    <MdOutlineContactSupport size={20} />
                    Поддержка(-)
                  </NavLink>
                </li>
              </ul>
            </nav>

            <ul className={styles.rightBar}>
              {isAuthenticated && (
                <>
                  <li className={styles.header__item}>
                  <NavLink
                    to="/basket"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>                      Корзина
                      <CiShoppingCart size={20} />
                    </NavLink>
                  </li>
                  <li className={styles.header__item}>
                  <NavLink
                    to="/profile/favorites"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>
                      Избранное
                      <CiHeart size={20} />
                    </NavLink>
                  </li>
                </>
              )}
              <li>
              <NavLink
                    to="/profile/info"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.header__navLink} ${styles.header__navLink_active}`
                        : styles.header__navLink
                    }>
                  {isAuthenticated ? 'Профиль' : 'Войти'}
                  <IoPersonOutline size={15} />
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <button className={styles.header__menuButton} onClick={handleChangeVisible}>
              <IoMdMenu size={30} />
            </button>
            <Link to="/" className={styles.header__logoContainer}>
              <img src={logoImage} alt="Логотип" className={styles.header__logo} />
            </Link>
            <NavLink to="/profile" className={styles.header__navLink}>
              <IoPersonOutline size={30} />
            </NavLink>
          </>
        )}
      </div>
      {isMenuVisible && currentWidth < 960 && <VerticalMenu closeMenu={closeMenu} />}
    </header>
  );
};
