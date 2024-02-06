import { useAppSelector } from '../../services/store';
import { config } from '../../utils/config';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { platformIcons } from '../FilterParameters/FilterParameters';
import styles from './GamePreview.module.scss';

function GamePreview() {
  // const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  // const handleResize = () => {
  //   setCurrentWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // console.log(currentWidth);

  const cards = useAppSelector((store) => store.games.gamesList);
  const currentGame = useAppSelector((store) => store.games?.currentGame);
  const game = currentGame ? currentGame : cards && cards[0];
  const platform = platformIcons.find((platform) => platform.platform === game?.platform?.name);

  return (
    <>
      {game && (
        <div className={styles.preview}>
          <div className={styles.preview__container}>
            <div className={styles.preview__header}>
              <h1 className={styles.preview__name}>{game.name}</h1>
              <span className={styles.preview__platform}>{platform?.icon}</span>
            </div>

            {game?.genres.length > 0 && (
              <ul className={styles.preview__categories}>
                {formatRussianGenres(game?.genres)
                  .split(', ')
                  .map((genre, index) => (
                    <li className={styles.preview__item} key={index}>
                      <p className={styles.preview__text}>{genre}</p>
                    </li>
                  ))}
              </ul>
            )}
            <p className={styles.preview__description}>{game.info}</p>

            <ul className={styles.preview__screenshots}>
              {game?.screenshots &&
                game?.screenshots.slice(0, 3).map((screen, index) => (
                  <li key={index}>
                    <img
                      src={`${config.baseUrl}/${screen}`}
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
