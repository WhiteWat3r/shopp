import style from './MainCatalog.module.scss';
import CatalogItem from '../CatalogItem/CatalogItem';
import { useAppSelector } from '../../services/store';
import { IGame } from '../../services/gameTypes';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

function MainCatalog() {
  const allGames = useAppSelector((store) => store.games?.gamesList);
  const searchedGames = useAppSelector((store) => store.games.searchedGames);

  const onClick = () => {
    // dispatch(refreshToken())
  };

  const games = searchedGames || allGames;

  return (
    <div className={style.catalog}>
      {games ? (
        <>
          {games.length !== 0 ? (
            <ul className={style.catalog__list}>
              {games
                // .slice(0, 9)
                .map((game: IGame) => (
                  <CatalogItem key={game.id} card={game} />
                ))}
            </ul>
          ) : (
            <p className={style.catalog__notFound}>Ничего не нашли (</p>
          )}
          {/* <Link className={styles.catalog__link} to={'/'}>
            Полный список
          </Link> */}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MainCatalog;
