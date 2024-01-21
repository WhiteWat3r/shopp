import { Link } from 'react-router-dom';
import { IGame } from '../../types/gameTypes';
import { config } from '../../utils/config';
import { finishPrice } from '../../utils/finishPrice';
import style from './SimilarGame.module.scss';

export const SimilarGame = ({ game }: { game: IGame }) => {
  return (
    <li className={style.similar}>
      {game && (
        <Link to={`/game/${game.id}`}  className={style.similar__link}>

          <img src={`${config.baseUrl}/${game.img}`} alt="Похожее" className={style.similar__img} />
          <div className={style.similar__info}>
            <p  className={style.similar__name}>{game.name}</p>
            <p className={style.similar__price}>{finishPrice(game.price, game.discount)} ₽</p>
          </div>
        </Link>
      )}
    </li>
  );
};
