import { useNavigate } from 'react-router-dom';
import style from './AdminGameListPage.module.scss';
import { useAppSelector } from '../../services/store';
import { AdminGameList } from '../AdminGameList/AdminGameList';



export const AdminGameListPage = () => {

  const allGames = useAppSelector((store) => store.games.gamesList);




  // const createGame = () => {
  //   navigate(`/admin/game/${allGames[allGames.length - 1].id + 1}`);
  // };
  return (
    <div className={style.gameList}>
      {/* <button onClick={createGame}>Сoздать</button> */}
      <ul className={style.gameList__nav}>
        <li style={{textAlign: 'center'}}>id</li>
        <li>Название</li>
        <li>Издатель</li>
        <li>Цена</li>
        <li>Цена со скидкой</li>
        <li>Платформа</li>
        <li>Наличие</li>
      </ul>
      <AdminGameList allGames={allGames}/>
    </div>
  );
};
