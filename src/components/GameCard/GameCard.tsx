import style from './GameCard.module.scss';
import { config } from '../../utils/request';
import { IGameCard } from './GameCardTypes';
import { Button } from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { platformIcons } from '../FilterParameters/FilterParameters';

export const GameCard = ({ game }: IGameCard) => {
  const handleAddToCart = (e: MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    // console.log('ку');
  };
  const platform = platformIcons.find(platform => platform.platform === game?.platform?.name)

  

  return (
    <li className={style.popularItem} key={game.id}>
      <Link to={`/game/${game.id}`} className={style.popularItem__link}>
        <img className={style.popularItem__img} src={config.baseUrl + '/' + game.img} alt="" />
        <span className={style.popularItem__percent} />

        <span className={style.popularItem__discount}>-{game.discount}%</span>

        <div className={style.popularItem__info}>
          <div className={style.popularItem__block}>
            <h3 className={style.popularItem__name}>{game.name}</h3>
            <div className={style.popularItem__prices}>
              <span className={style.popularItem__oldPrice}>{game.price} ₽</span>
              <span className={style.popularItem__price}>{game.price} ₽</span>
            </div>
          </div>
          <div className={style.popularItem__block}>
            <p className={style.popularItem__genres}>{formatRussianGenres(game?.genres)}</p>
            <div className={style.popularItem__buttonContainer}>
              <Button mode={'primary'} isDisabled={false} onClick={handleAddToCart}>
                В корзину
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
