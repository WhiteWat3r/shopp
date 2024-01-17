import style from './GameCard.module.scss';
import { config } from '../../utils/request';
import { IGameCard } from './GameCardTypes';
import { Button } from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { platformIcons } from '../FilterParameters/FilterParameters';
import { useAddItemMutation, useDeleteItemMutation } from '../../utils/basketApi';
import { useAppSelector } from '../../services/store';

import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';

export const GameCard = ({ game }: IGameCard) => {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const isOnBasket = useAppSelector((store) =>
    store.user?.user?.basket?.basket_games.find((basketItem) => basketItem.gameId === game.id),
  );

  console.log(isOnBasket);

  const platform = platformIcons.find((platform) => platform.platform === game?.platform?.name);

  // const handleAddToCart = async () => {
  //   await addItem({ gameId: game.id, quantity: 1 });
  // };

  const handleCartAction = async (e: MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const quantity = 1;

    if (!isOnBasket) {
      await addItem({ gameId: game.id, quantity });
    } else {
      await deleteItem({ gameId: game.id, quantity });
    }
  };

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
              <Button
                mode={'secondary'}
                isDisabled={false}
                onClick={handleCartAction}
                type="button">
                {isOnBasket ? <HiShoppingCart size={20} /> : <HiOutlineShoppingCart size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
