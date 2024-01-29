import { Link } from 'react-router-dom';
import style from './AdminHeader.module.scss';
import { useAppSelector } from '../../services/store';
import { adminLinks } from '../../utils/constants';

export const AdminHeader = () => {
  const allGames = useAppSelector((store) => store.games?.gamesList);

  return (
    <header className={style.header}>
      <ul className={style.header__links}>
        {adminLinks.map((link) => (
          <li key={link.id}>
            <Link to={link.link} className={style.header__link}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
