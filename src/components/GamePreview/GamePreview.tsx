import { useAppSelector } from '../../services/store';
import { platformIcons } from '../FilterParameters/FilterParameters';
import styles from './GamePreview.module.scss';

function GamePreview() {
  const cards = useAppSelector((store) => store.games.gamesList);

  const currentGame = useAppSelector((store) => store.games?.currentGame);

  const game = currentGame ? currentGame : cards && cards[0];

  const platform = platformIcons.find((platform) => platform.platform === game?.platform?.name);

  // console.log(game);
  return (
    <>
      {game && (
        <div className={styles.preview}>
          <div className={styles.preview__container}>
            <div className={styles.preview__header}>
              <h1 className={styles.preview__name}>{game.name}</h1>
              <span className={styles.preview__platform}>{platform?.icon}</span>
            </div>
            {/* <img src={`http://localhost:5000/${game.img}`} alt="" className={styles.preview__poster} /> */}

            <ul className={styles.preview__categories}>
              <li className={styles.preview__item}>
                <p className={styles.preview__text}>
                  {game.categoriess ? game.categoriess[0] : 'Пусто'}
                </p>
              </li>
              <li className={styles.preview__item}>
                <p className={styles.preview__text}>
                  {game.categoriess ? game.categoriess[1] : 'Пусто'}
                </p>
              </li>
              <li className={styles.preview__item}>
                <p className={styles.preview__text}>
                  {game.categoriess ? game.categoriess[2] : 'Пусто'}
                </p>
              </li>
            </ul>
            <p className={styles.preview__description}>{game.info}</p>

            <ul className={styles.preview__screenshots}>
              {game?.screenshots &&
                game?.screenshots.slice(0, 3).map((screen, index) => (
                  <li key={index}>
                    <img
                      src={`http://localhost:5000/${screen}`}
                      alt=""
                      className={styles.preview__screenshot}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default GamePreview;
