import style from './CatalogItem.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICatalogItem } from './CatalogItemTypes';
import { setCurrentGame } from '../../services/slices/game';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { finishPrice } from '../../utils/finishPrice';
import { config } from '../../utils/config';
import { platformIcons } from '../FilterParameters/FilterParameters';

export const CatalogItem = ({ game }: ICatalogItem) => {
  const dispatch = useDispatch();
  const onMouseEnter = () => {
    dispatch(setCurrentGame(game));
  };
  // console.log(card);

  const platform = platformIcons.find((platform) => platform.platform === game?.platform?.name);

  return (
    <li>
      <Link
        to={`/game/${game.id}`}
        className={style.game}
        key={game.id}
        onMouseEnter={onMouseEnter}>
        <img className={style.game__image} src={config.baseUrl + '/' + game.img} alt={game.name} />
        <div className={style.game__info}>
            <h2 className={style.game__name}>{game.name}</h2>
            <span className={style.game__icon}>{platform?.icon}</span>

          <p className={style.game__description}>{formatRussianGenres(game?.genres)}</p>
        </div>


        {game.discount !== 0 && <div className={style.game__discount}>-{game.discount}%</div>}


        <div className={style.game__priceBlock}>


        {!game.isFree && game.discount !==0 && game.price !== 0 && <span className={style.game__oldPrice}>{game.price} ₽</span>}

          <span className={style.game__price}>{ !game.isFree && game.price !== 0 ? `${finishPrice(game.price, game.discount)} ₽`: 'Free' }</span>

        </div>



      </Link>
    </li>
  );
};
