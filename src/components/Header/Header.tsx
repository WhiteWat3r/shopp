import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import logoImage from '../../assets/logo.png';
import { SearchInput } from '../SearchInput/SearchInput';

export const Header = () => {
  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
      <nav className={styles.header__nav}>
        <Link to="/">
          <img src={logoImage} alt="Логотип" className={styles.header__logo} />
        </Link>
        <ul className={styles.header__menu}>
          <li className={styles.header__item}>
            <NavLink to="/" className={styles.header__navLink}>
              Каталог
            </NavLink>
          </li>
          <li className={styles.header__item}>
            <NavLink to="/" className={styles.header__navLink}>
              О нас
            </NavLink>
          </li>
          <li className={styles.header__item}>
            <NavLink to="/" className={styles.header__navLink}>
              Поддержка
            </NavLink>
          </li>
          <li className={styles.header__item}>
            <NavLink to="/basket" className={styles.header__navLink}>
              Корзина
              {/* <img src={basketImg} alt="Корзина" /> */}
              {/* {basket.length > 0 && (
            <div className={styles.count}>
              <p>{basket.length}</p>
            </div>
          )} */}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.rightBar}>
        <SearchInput placeholder={'Искать товары'} />
        <NavLink to="/profile" className={styles.header__navLink}>
          {isAuthenticated ? 'Профиль' : 'Войти'}
          {/* <img src={profileImg} alt="Профиль" /> */}
        </NavLink>
      </div>
      </div>
    </header>
  );
};
