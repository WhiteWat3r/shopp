import { Button } from '../../UI/Button/Button';
import { useAppSelector } from '../../services/store';
import { config } from '../../utils/request';
import { PopularItem } from '../PopularItem/PopularItem';
import style from './Popular.module.scss';

export const Popular = () => {
  const allGames = useAppSelector((store) => store.games.gamesList);

  const popularGames = allGames?.slice(0, 3);
  console.log(popularGames);


  return (
    <section className={style.popular}>
      <h2 className={style.popular__header}>Популярное</h2>
      <ul className={style.popular__container}>
        {popularGames && popularGames.map((game) => <PopularItem game={game} />)}
      </ul>
    </section>
  );
};
