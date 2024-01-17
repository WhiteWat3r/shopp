import style from './CatalogItem.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICatalogItem } from './CatalogItemTypes';
import { setCurrentGame } from '../../services/slices/game';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { finishPrice } from '../../utils/finishPrice';

export const CatalogItem = ({ card }: ICatalogItem) => {
  const dispatch = useDispatch();
  const onMouseEnter = () => {
    dispatch(setCurrentGame(card));
  };
  // console.log(card);

  return (
    <li>
      <Link
        to={`/game/${card.id}`}
        className={style.game}
        key={card.id}
        onMouseEnter={onMouseEnter}>
        <img
          className={style.game__image}
          src={`http://localhost:5000/${card.img}`}
          alt={card.name}
        />
        <div className={style.game__info}>
          <h2 className={style.game__name}>{card.name}</h2>
          <p className={style.game__description}>{formatRussianGenres(card?.genres)}</p>
        </div>
        <div className={style.game__discount}>-{card.discount}%</div>
        <div className={style.game__priceBlock}>
          <span className={style.game__oldPrice}>{card.price} ₽</span>
          <span className={style.game__price}>{finishPrice(card.price, card.discount)} ₽</span>
        </div>
      </Link>
    </li>
  );
}

