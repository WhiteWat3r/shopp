import styles from './MainCatalog.module.scss';
import CatalogItem from '../CatalogItem/Catalogitem';
import { useAppSelector } from '../../services/store';
import { IGame } from '../../services/gameTypes';
import { Link } from 'react-router-dom';

function MainCatalog() {

const cards = useAppSelector((store) => store.games?.gamesList)

const onClick = () => {
  // dispatch(refreshToken())
}

  return (
    <div className={styles.catalog}>
     {cards ? (
      <>
      <ul className={styles.tabs}>
        <li className={styles.tabItem}>
          <a className={styles.link}>Популярные</a>
        </li>
        <li className={styles.tabItem}>
          <a className={styles.link}>Ожидаемые</a>
        </li>
        <li className={styles.tabItem}>
          <a className={styles.link}>Скидки</a>
        </li>
        <li className={styles.tabItem}>
          <a className={styles.link}>Новые</a>
        </li>
        <li className={styles.tabItem}>
          <a className={styles.link}>Лучшие по оценкам</a>
        </li>
      </ul>
      <ul className={styles.catalog__list}>
        {cards.slice(0, 9).map((card: IGame) => (
            <CatalogItem key={card.id} card={card}/>
        ))}
      </ul>
      <Link className={styles.catalog__link} to={'/'}>Полный список</Link>
      </>
    ) : (<p> Грузим мужики</p>)}
    </div>
  );
}

export default MainCatalog;
