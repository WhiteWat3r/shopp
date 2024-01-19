import style from './MainCatalog.module.scss';

import { useAppSelector } from '../../services/store';
// import { IGame } from '../../types/gameTypes';
import Loader from '../Loader/Loader';

function MainCatalog() {
  const allGames = useAppSelector((store) => store.games?.gamesList);
  const searchedGames = useAppSelector((store) => store.games.searchedGames);

  const games = searchedGames || allGames;

  return (
    <div className={style.catalog}>



      {games ? (
        <>
          {/* {games.length !== 0 ? (
            <ul className={style.catalog__list}>
              {games
                // .slice(0, 9)
                .map((game: IGame) => (
                  <CatalogItem key={game.id} game={game} />
                ))}
            </ul>
          ) : (
            <p className={style.catalog__notFound}>Ничего не нашли (</p>
          )} */}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MainCatalog;
