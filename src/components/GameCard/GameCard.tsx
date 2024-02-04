import { Link } from 'react-router-dom';

import style from './GameCard.module.scss';
import { config } from '../../utils/config';
import { IGameCard } from './GameCardTypes';
import { LikeButton } from '../../UI/LikeButton/LikeButton';

import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

import { useAppSelector } from '../../services/store';

import { formatRussianGenres } from '../../utils/fornatGenres';
import { finishPrice } from '../../utils/finishPrice';
import { useCartActions } from '../../utils/hooks/useCartActions';
import { useFavoriteActions } from '../../utils/hooks/useFavoriteActions';
import { QuantitySelectorButton } from '../QuantitySelectorButton/QuantitySelectorButton';

export const GameCard = ({ game }: IGameCard) => {
  const countInBasket = useAppSelector((store) => {
    const basketItem = store.user?.user?.basket?.basket_games.find(
      (basketItem) => basketItem.gameId === game?.id,
    );

    return basketItem ? basketItem.quantity : 0;
  });

  const linkToLoad = () => {
    window.location.href = `https://store.steampowered.com/app/${game.steamApi}`;
  };

  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

  const isFavorite = useAppSelector(
    (store) =>
      store.user?.favorites?.games?.findIndex((favorite) => favorite.id === game.id) !== -1,
  );

  const { handleCartAction } = useCartActions(isAuthenticated);
  const { toggleLike } = useFavoriteActions(isAuthenticated, isFavorite);

  // const onCartAction = async (e: MouseEvent<HTMLInputElement, MouseEvent>) => {
  //   e.preventDefault();
  //   await handleCartAction(game.id, isOnBasket ? false : true);
  // };

  return (
    <li className={style.popularItem} key={game.id}>
      <div className={style.popularItem__likeButtonContainer}>
        <LikeButton
          onClick={() => toggleLike(game.id)}
          type={'button'}
          active={!!isFavorite}
          isDisabled={false}>
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
                {game.isFree ? 'Free' : `${finishPrice(game.price, game.discount)} ₽`}
              </span>
            </div>
          </div>
          <div className={style.popularItem__block}>
            <p className={style.popularItem__genres}>{formatRussianGenres(game?.genres)}</p>
            <div className={style.popularItem__buttonContainer}>
              <QuantitySelectorButton {...{ countInBasket, linkToLoad, handleCartAction, game }} />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
