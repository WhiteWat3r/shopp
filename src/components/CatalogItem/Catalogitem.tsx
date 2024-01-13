import styles from './CatalogItem.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICatalogItem } from './CatalogItemTypes';
import { setCurrentGame } from '../../services/slices/game';
import { config } from '../../utils/request';
import { formatRussianGenres } from '../../utils/fornatGenres';



function CatalogItem({ card } : ICatalogItem) {
  const dispatch = useDispatch();
  const onMouseEnter = () => {
    dispatch(setCurrentGame(card));
  };
  // console.log(card);
  
  return (
    <li>
      <Link to={`/game/${card.id}`}
        className={`${styles.cardItem} ${styles.hoverEffect}`}
        key={card.id}
        onMouseEnter={onMouseEnter}>
        <img className={styles.cardImage} src={`http://localhost:5000/${card.img}`} alt={card.name} />
        <div className={styles.cardInfo}>
          <h2 className={styles.cardHeader}>{card.name}</h2>
          <p className={styles.cardDescription}>
          {formatRussianGenres(card?.genres)}
          </p>
        </div>
        <div className={styles.priceBlock}>
          <div className={styles.cardDiscount}>-{card.discount}%</div>
          <span className={styles.cardPrice}>{card.price} P</span>
        </div>
      </Link>
    </li>
  );
}

export default CatalogItem;
