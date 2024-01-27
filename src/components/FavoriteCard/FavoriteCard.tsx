import style from './FavoriteCard.module.scss';
import { config } from '../../utils/config';
import { Button } from '../../UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useAddItemMutation, useDeleteItemMutation } from '../../api/basketApi';
import { useAppSelector } from '../../services/store';

import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import { finishPrice } from '../../utils/finishPrice';
import { LikeButton } from '../../UI/LikeButton/LikeButton';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../../api/favoriteApi';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { IGameCard } from '../GameCard/GameCardTypes';

export const FavoriteCard = ({ game }: IGameCard) => {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);
  const navigate = useNavigate();

  const [addToFavorite] = useAddFavoriteMutation();
  const [removeFromFavorite] = useDeleteFavoriteMutation();

  const isOnBasket = useAppSelector((store) =>
    store.user?.user?.basket?.basket_games.find((basketItem) => basketItem.gameId === game.id),
  );

  const isFavorite = useAppSelector((store) =>
    store.user?.favorites?.games?.find((favorite) => favorite.id === game.id),
  );

  const toggleLike = async () => {
    if (isAuthenticated) {
      isFavorite
        ? await removeFromFavorite({ gameId: game.id })
        : await addToFavorite({ gameId: game.id });
    } else {
      navigate('/login');
    }
  };

  const handleCartAction = async (e: MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const quantity = 1;
    if (isAuthenticated) {
      isOnBasket
        ? await deleteItem({ gameId: game.id, quantity })
        : await addItem({ gameId: game.id, quantity });
    } else {
      navigate('/login');
    }
  };

  return (
    <li className={style.popularItem} key={game.id}>
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
            <span className={style.popularItem__discount}>{game.discount}%</span>
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
                {game.isFree ? 'Free' : `${finishPrice(game.price, game.discount)} ₽`}
              </span>
            </div>

            {/* {game.availability ? () : ()} */}
          </div>
          <div className={style.popularItem__block}>
            <div className={style.popularItem__likeButtonContainer}>
              <LikeButton
                onClick={toggleLike}
                type={'button'}
                active={!!isFavorite}
                isDisabled={false}>
                {isFavorite ? <IoMdHeart size={`100%`} /> : <IoIosHeartEmpty size={`100%`} />}
              </LikeButton>
            </div>
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
