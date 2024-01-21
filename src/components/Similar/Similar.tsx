import { useAppSelector } from '../../services/store';
import { IGame } from '../../types/gameTypes';
import { SimilarGame } from '../SimilarGame/SimilarGame';
import style from './Similar.module.scss';

export const Similar = ({ mainGame }: { mainGame: IGame }) => {

    const similarGames = useAppSelector((store) => store.games?.gamesList)
    ?.filter((game) => game.name !== mainGame?.name && game.genres.some(
      (gameGenre) => gameGenre.description === mainGame?.genres[0].description
    ));
  
  const shuffledSimilarGames = similarGames
    ? [...similarGames].sort(() => Math.random() - 0.5).slice(0, 4)
    : [];
//   console.log(shuffledSimilarGames);

  return (
    <div className={style.similarContainer}>
      <h3 className={style.similarContainer__header}>Похожие игры</h3>
      <ul className={style.similarContainer__list}>
        {shuffledSimilarGames?.map((game) => (
          <SimilarGame game={game} key={game.id}/>
        ))}
      </ul>
    </div>
  );
};
