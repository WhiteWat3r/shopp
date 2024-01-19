import { Link } from 'react-router-dom';
import style from './AdminHeader.module.scss';
import { useAppSelector } from '../../services/store';

export const AdminHeader = () => {
  const allGames = useAppSelector((store) => store.games?.gamesList);




  return (
    <header className={style.header}>
      <ul className={style.header__links}>
        <Link to="/admin/games">
          <li className={style.header__link}>Игры</li>
        </Link>
        {allGames && <Link to={`/admin/game/${allGames[allGames.length - 1]?.id + 1}`}>
          <li className={style.header__link}>Создать игру</li>
        </Link>} 
        <li className={style.header__link}>Розыгрыши</li>
        <li className={style.header__link}>Слайдер</li>
        <Link to="/">
          <li className={style.header__link}>Магазин</li>
        </Link>
      </ul>
    </header>
  );
};
