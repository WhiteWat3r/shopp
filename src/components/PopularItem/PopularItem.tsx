import style from './PopularItem.module.scss';
import { config } from '../../utils/request';
import { iPopularItem } from './PopularItemTypes';
import { Button } from '../../UI/Button/Button';
import { categories, genres } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';

export const PopularItem = ({ game }: iPopularItem) => {
  const handleAddToCart = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    console.log('ку');
  };

  console.log(game.categories);

  const russianGenres = genres
    .filter((genre) =>
      game?.genres?.some((gameGenre) => genre.description === gameGenre.description),
    )
    .map((genre) => genre.translation)
    .slice(0, 3)
    .join(', ');

//   console.log('russianCategories', russianCategories);

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
            <p className={style.popularItem__genres}>{russianGenres}</p>
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
