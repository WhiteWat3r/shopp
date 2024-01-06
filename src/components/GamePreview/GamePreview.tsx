import { useAppSelector } from '../../services/store';
import styles from './GamePreview.module.scss';

function GamePreview() {
  
  const cards = useAppSelector((store) => store.games.gamesList);

  const currentGame = useAppSelector((store) => store.games?.currentGame);

  const game = currentGame ? currentGame : cards && cards[0];


  // console.log(game);
  return (
    <>
    {game && (    <div className={styles.GamePreview}>
      <h1 className={styles.header}>{game.name}</h1>
      <img src={`http://localhost:5000/${game.img}`} alt="" className={styles.poster} />
      <ul className={styles.categories}>
        <li className={styles.item}>
          <p className={styles.text}>{game.categoriess ? game.categoriess[0]: 'Пусто'}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.text}>{game.categoriess ? game.categoriess[1]: 'Пусто'}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.text}>{game.categoriess ? game.categoriess[2]: 'Пусто'}</p>
        </li>
      </ul>
      <p className={styles.description}>{game.info}</p>
      <img className={styles.screenshot} src={game.screenshots ? game.screenshots[0] : ""} alt="" />
      <img className={styles.screenshot} src={game.screenshots ? game.screenshots[1] : ""} alt="" />
    </div>)}
    </>
  );
}

export default GamePreview;
