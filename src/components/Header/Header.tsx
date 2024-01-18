import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import logoImage from '../../assets/logo.png';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { MdOutlineContactSupport } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { VerticalMenu } from '../VerticalMenu/VerticalMenu';
import { SlMagnifier } from 'react-icons/sl';

export const Header = () => {
  // console.log(window.innerWidth);
  const isUserOnCatalog = location.pathname.startsWith('/catalog');

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
              <Link to="/">
                <img src={'logoImage'} alt="Логотип" className={styles.header__logo} />
              </Link>
              <ul className={styles.header__menu}>
                <li className={styles.header__item}>
                  <NavLink to="/catalog" className={styles.header__navLink}>
                    <IoMdMenu size={20} />
                    Каталог
                  </NavLink>
                </li>
                <li className={styles.header__item}>
                  <NavLink to="/" className={styles.header__navLink}>
                    О нас(-)
                  </NavLink>
                </li>
                <li className={styles.header__item}>
                  <NavLink to="/" className={styles.header__navLink}>
                    <MdOutlineContactSupport size={20} />
                    Поддержка(-)
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* {isUserOnCatalog ? (
              // <SlMagnifier className={styles.header__magnifier} size={15} />
              ''
            ) : (
              <input className={styles.header__search} placeholder={'Поиск игры'} />
            )} */}

            <ul className={styles.rightBar}>
            <li className={styles.header__item}>
                    <NavLink to="/catalog" className={styles.header__navLink}>
                      Поиск(?)
                      <SlMagnifier className={styles.header__magnifier} size={15} />
                    </NavLink>
                  </li>
              {isAuthenticated && (
                <>
                  <li className={styles.header__item}>
                    <NavLink to="/basket" className={styles.header__navLink}>
                      Корзина
                      <CiShoppingCart size={20} />
                    </NavLink>
                  </li>
                  <li className={styles.header__item}>
                    <NavLink to="/profile/favorites" className={styles.header__navLink}>
                      Избранное
                      <CiHeart size={20} />
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/profile" className={styles.header__navLink}>
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
            <Link to="/">
              <img src={'logoImage'} alt="Логотип" className={styles.header__logo} />
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
