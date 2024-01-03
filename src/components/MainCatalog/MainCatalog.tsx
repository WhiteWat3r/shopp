import styles from './MainCatalog.module.scss';
import CatalogItem from '../CatalogItem/Catalogitem';
import { useAppSelector } from '../../services/store';
import { IGame } from '../../services/gameTypes';

function MainCatalog() {

const cards = useAppSelector((store) => store.games?.gamesList)

const onClick = () => {
  // dispatch(refreshToken())
}

  return (
    <>
     {cards ? (<div className={styles.mainCatalog}>
      <ul className={styles.tabs}>
        <li className={styles.tabItem}>
          <a className={styles.link} onClick={onClick}>Популярные</a>
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
      <ul>
        {cards.map((card: IGame) => (
            <CatalogItem key={card.id} card={card}/>
        ))}
      </ul>
    </div>) : (<p> LDasdasdasdasd</p>)}
    </>
  );
}

export default MainCatalog;
