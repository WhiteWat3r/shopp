import { useAppSelector } from '../../services/store';
import { GameCard } from '../GameCard/GameCard';
import style from './Popular.module.scss';

export const Popular = () => {
  const allGames = useAppSelector((store) => store.games.gamesList);

  const popularGames = allGames?.slice(0, 4);
  console.log(popularGames);


  return (
    <section className={style.popular}>
      <h2 className={style.popular__header}>Популярное</h2>
      <ul className={style.popular__container}>
        {popularGames && popularGames.map((game) => <GameCard game={game} key={game.id}/>)}
      </ul>
    </section>
  );
};
