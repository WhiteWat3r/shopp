import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import style from './AdminGameList.module.scss';

export const AdminGameList = () => {
  const allGames = useAppSelector((store) => store.games.gamesList);

  const navigate = useNavigate();
  const createGame = () => {
    navigate(`/admin/game/${allGames[allGames.length - 1].id + 1}`);
  };
  return (
    <div className={style.gameList}>
      <button onClick={createGame}>Сoздать</button>
      <ul className={style.gameList__nav}>
        <li>Название</li>
        <li>Издатель</li>
        <li>Цена</li>
        <li>Цена со скидкой</li>
        <li>Платформа</li>
        <li>Наличие</li>
      </ul>
      <ul className={style.gameList__table}>
        {allGames &&
          allGames.map((item) => (
            <li className={style.gameList__item} key={item.id}>
              <Link to={`/admin/game/${item.id}`}>
                <p className={style.gameList__name}>{item.name}</p>
              </Link>
              <p>{item.publisher?.name}</p>
              <p>{item.price}</p>
              <p>{Math.round(item.price - (item.price * item.discount) / 100)}</p>
              <p>{item.platform?.name}</p>
              <p>+</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
