import { useAppSelector } from '../../services/store';
import { formatAndCheckDate } from '../../utils/formatAndCheckDate';
import { GameCard } from '../GameCard/GameCard';
import style from './Novelty.module.scss';

export const Novelty = () => {
  const allGames = useAppSelector((store) => store.games.gamesList);

  const noveltyGames = allGames?.slice().sort((a, b) => {
    const dateA = a.releaseDate ? new Date(formatAndCheckDate(a.releaseDate)).getTime() : 0;
    const dateB = b.releaseDate ? new Date(formatAndCheckDate(b.releaseDate)).getTime() : 0;
    
    return dateB - dateA;
  }).slice(0, 12)
  




    // ?.map((game) => {
    //   if (game?.releaseDate) {
    //      new Date(formatAndCheckDate(game.releaseDate));
    //      return game
    //   }
    // })

    // .filter((date) => date !== null) 
    // .sort((a, b) => b.getTime() - a.getTime());

    
  console.log(noveltyGames);

  return (
    <section className={style.novelty}>
      <h2 className={style.novelty__header}>Новинки</h2>
      <ul className={style.novelty__container}>
        {noveltyGames && noveltyGames.map((game) => <GameCard game={game} key={game.id}/>)}
      </ul>
    </section>
  );
};
