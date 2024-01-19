import style from './GameCard.module.scss';
import { config } from '../../utils/config';
import { IGameCard } from './GameCardTypes';
import { Button } from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { useAddItemMutation, useDeleteItemMutation } from '../../api/basketApi';
import { useAppSelector } from '../../services/store';

import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import { finishPrice } from '../../utils/finishPrice';
import { LikeButton } from '../../UI/LikeButton/LikeButton';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../../api/favoriteApi';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

export const GameCard = ({ game }: IGameCard) => {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const [addToFavorite] = useAddFavoriteMutation();
  const [removeFromFavorite] = useDeleteFavoriteMutation();

  const isOnBasket = useAppSelector((store) =>
    store.user?.user?.basket?.basket_games.find((basketItem) => basketItem.gameId === game.id),
  );

  const isFavorite = useAppSelector((store) =>
    store.user?.favorites?.games?.find((favorite) => favorite.id === game.id),
  );

  // console.log(isFavorite);

  const toggleLike = async () => {
    isFavorite
      ? await removeFromFavorite({ gameId: game.id })
      : await addToFavorite({ gameId: game.id });
  };
  // const platform = platformIcons.find((platform) => platform.platform === game?.platform?.name);

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
      <div className={style.popularItem__likeButtonContainer}>
        <LikeButton onClick={toggleLike} type={'button'} active={!!isFavorite} isDisabled={false}>
          {isFavorite ? <IoMdHeart size={`100%`} /> : <IoIosHeartEmpty size={`100%`} />}
        </LikeButton>
      </div>
      <Link to={`/game/${game.id}`} className={style.popularItem__link}>
        <div className={style.popularItem__imageContainer}>
          <img className={style.popularItem__img} src={config.baseUrl + '/' + game.img} alt="" />

          {!game.availability && (
            <span className={style.popularItem__outOfStock}>Нет в наличии</span>
          )}
        </div>
        {game.discount !== 0 && (
          <>
            <span className={style.popularItem__percent} />
            <span className={style.popularItem__discount}>-{game.discount}%</span>
          </>
        )}

        <div className={style.popularItem__info}>
          <div className={style.popularItem__block}>
            <h3 className={style.popularItem__name}>{game.name}</h3>

            <div className={style.popularItem__prices}>
              {game.discount !== 0 && (
                <span className={style.popularItem__oldPrice}>{game.price} ₽</span>
              )}

              <span className={style.popularItem__price}>
                {finishPrice(game.price, game.discount)} ₽
              </span>
            </div>

            {/* {game.availability ? () : ()} */}
          </div>
          <div className={style.popularItem__block}>
            <p className={style.popularItem__genres}>{formatRussianGenres(game?.genres)}</p>
            <div className={style.popularItem__buttonContainer}>
              <Button
                mode={'secondary'}
                isDisabled={!game.availability}
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
