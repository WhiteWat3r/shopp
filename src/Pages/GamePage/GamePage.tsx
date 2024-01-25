import { Link, useNavigate, useParams } from 'react-router-dom';

import { FaCartArrowDown, FaRegCheckCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

import style from './GamePage.module.scss';
import Loader from '../../components/Loader/Loader.tsx';
import { useAppSelector } from '../../services/store';
import { ICategorAndGenreType } from '../../types/gameTypes.ts';
import { FaPenAlt } from 'react-icons/fa';
import { config } from '../../utils/config.ts';
import { finishPrice } from '../../utils/finishPrice.ts';
import { ScreenCarousel } from '../../components/ScreenCarousel/ScreenCarousel.tsx';
import { Button } from '../../UI/Button/Button.tsx';

import { IoPeopleOutline, IoPersonOutline, IoGameControllerOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiAchievement } from 'react-icons/gi';
import { PiVirtualRealityLight } from 'react-icons/pi';
import { CiCloudOn } from 'react-icons/ci';

import classNames from 'classnames';
import { genres } from '../../utils/constants.ts';
import { GameTab } from '../../components/GameTab/GameTab.tsx';
import { useFetchOneCardQuery } from '../../api/gameApi.ts';
import { LikeButton } from '../../UI/LikeButton/LikeButton.tsx';
import { platformIcons } from '../../components/FilterParameters/FilterParameters.tsx';
import { useAddItemMutation, useDeleteItemMutation } from '../../api/basketApi.ts';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../../api/favoriteApi.ts';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Similar } from '../../components/Similar/Similar.tsx';

export const GamePage = () => {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const [addToFavorite] = useAddFavoriteMutation();
  const [removeFromFavorite] = useDeleteFavoriteMutation();

  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

  const navigate = useNavigate();
  // const dispatch = useAppDispatch()

  const userRole = useAppSelector((store) => store.user?.user?.role);

  const { gameId } = useParams();

  const countInBasket = useAppSelector((store) => {
    const basketItem = store.user?.user?.basket?.basket_games.find((basketItem) => {
      return basketItem.gameId?.toString() === gameId;
    });

    return basketItem ? basketItem.quantity : 0;
  });

  const { data: game, status } = useFetchOneCardQuery(gameId);

  // console.log('status', status);

  const handleAddToCart = async () => {
    if (isAuthenticated) {
      await addItem({ gameId, quantity: 1 });
    } else {
      navigate('/login');
    }
  };

  const handleRemoveFromCart = async () => {
    if (isAuthenticated) {
      await deleteItem({ gameId, quantity: 1 });
    } else {
      navigate('/login');
    }
  };

  const formatGameCategories = game?.categories?.map(
    (category: ICategorAndGenreType) => category.description,
  );

  const russianGenres = genres
    .filter((genre) =>
      game?.genres?.some(
        (gameGenre: ICategorAndGenreType) => genre.description === gameGenre.description,
      ),
    )
    .map((genre) => genre.translation)
    .slice(0, 3)
    .join(', ');

  const platform = platformIcons.find((platform) => platform.platform === game?.platform?.name);

  const linkToLoad = () => {
    window.location.href = `https://store.steampowered.com/app/${game.steamApi}`;
  };

  const isFavorite = useAppSelector((store) =>
    store.user?.favorites?.games?.find((favorite) => favorite.id.toString() === gameId),
  );

  const toggleLike = async () => {
    isFavorite ? await removeFromFavorite({ gameId }) : await addToFavorite({ gameId });
  };

  console.log('рендер');



  return (
    <section className={style.section}>
      {status !== 'fulfilled' ? (
        <Loader />
      ) : (
        <div className={style.card}>
          <div className={style.card__header}>
            <h1 className={style.card__name}>{game.name}</h1>

            {userRole === 'ADMIN' && (
              <Link className={style.card__adminLink} to={`/admin/game/${game.id}`}>
                <FaPenAlt size={23} />
              </Link>
            )}
          </div>

          <div className={style.card__content}>
            <div className={style.card__imageContainer}>
              <img
                src={config.baseUrl + '/' + game.img}
                alt={'Постер'}
                className={style.card__poster}
              />
              {game.screenshots ? (
                <ScreenCarousel screenshots={game.screenshots} />
              ) : (
                <span className={style.card__absence}>Скриншотов пока нет</span>
              )}
            </div>

            <div className={style.card__info}>
              <div className={style.card__infoContainer}>
                {game.availability ? (
                  <p className={classNames(style.card__inStock, style.card__inStock_inStock)}>
                    Есть в наличии <FaRegCheckCircle />
                  </p>
                ) : (
                  <p className={classNames(style.card__inStock, style.card__inStock_outOfStock)}>
                    Нет в наличии <RxCross2 />
                  </p>
                )}

                <div className={style.card__priceBlock}>
                  <h3 className={style.card__cost}>
                    {!game.isFree && game.price !== 0
                      ? `${finishPrice(game.price, game.discount)} ₽`
                      : 'Бесплатная игра'}
                  </h3>

                  {game.discount !== 0 && !game.isFree && game.price !== 0 && (
                    <>
                      <p className={style.card__discount}>-{game.discount}%</p>/
                      <p className={style.card__oldPrice}>{game.price} ₽</p>
                    </>
                  )}
                </div>

                <div className={style.card__infoItem}>
                  <p className={style.card__parameter}>Активация: </p>
                  <Link to={`/catalog`} className={style.card__platform}>
                    {platform?.icon}{' '}
                  </Link>
                </div>

                <div className={style.card__infoItem}>
                  <p className={style.card__parameter}>Жанры: </p>
                  {russianGenres}
                </div>
                <div className={style.card__infoItem}>
                  <p className={style.card__parameter}>Язык: </p>
                  <p className={style.card__value}>{game.language}</p>
                </div>
                <div className={style.card__infoItem}>
                  <p className={style.card__parameter}>Издатель: </p>
                  <p className={style.card__value}>{game.publisher.name}</p>
                </div>
                <div className={style.card__infoItem}>
                  <p className={style.card__parameter}>Дата выхода: </p>
                  <p className={style.card__value}>{game.releaseDate}</p>
                </div>
              </div>
              {formatGameCategories && (
                <ul className={style.card__tags}>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Single-player') && style.card__tag_active,
                    )}>
                    <IoPersonOutline className={style.card__tagImage} />
                    <span className={style.card__tagText}>Для одного</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Multi-player') && style.card__tag_active,
                    )}>
                    <FaPeopleGroup className={style.card__tagImage} />
                    <span className={style.card__tagText}>Мультиплеер</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Co-op') && style.card__tag_active,
                    )}>
                    <IoPeopleOutline className={style.card__tagImage} />
                    <span className={style.card__tagText}>Кооператив</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes(
                        'Partial Controller Support' || 'Full controller support',
                      ) && style.card__tag_active,
                    )}>
                    <IoGameControllerOutline className={style.card__tagImage} />
                    <span className={style.card__tagText}>Контроллер</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('VR Support' || 'VR Supported') &&
                        style.card__tag_active,
                    )}>
                    <PiVirtualRealityLight className={style.card__tagImage} />
                    <span className={style.card__tagText}>VR</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Steam Achievements') && style.card__tag_active,
                    )}>
                    {' '}
                    <GiAchievement className={style.card__tagImage} />
                    <span className={style.card__tagText}>Достижения</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Cloud Gaming' || 'Cloud Gaming (NVIDIA)') &&
                        style.card__tag_active,
                    )}>
                    {' '}
                    <CiCloudOn className={style.card__tagImage} />
                    <span className={style.card__tagText}>Cloud Gaming</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('In-App Purchases') && style.card__tag_active,
                    )}>
                    <FaCartArrowDown className={style.card__tagImage} />
                    <span className={style.card__tagText}>Покупки</span>
                  </li>
                </ul>
              )}

              <div className={style.card__buttons}>
                <div className={style.card__likeButtonContainer}>
                  <LikeButton
                    onClick={toggleLike}
                    type={'button'}
                    active={!!isFavorite}
                    isDisabled={false}>
                    {isFavorite ? <IoMdHeart size={`100%`} /> : <IoIosHeartEmpty size={`100%`} />}
                  </LikeButton>
                </div>

                <div className={style.card__buttonContainer}>
                  {countInBasket > 0 ? (
                    <div className={style.card__doubleButton}>
                      <Button
                        onClick={handleRemoveFromCart}
                        type={'button'}
                        mode={'primary'}
                        isDisabled={false}>
                        -
                      </Button>
                      <span className={style.card__count}>{countInBasket}</span>
                      <Button
                        onClick={handleAddToCart}
                        type={'button'}
                        mode={'primary'}
                        isDisabled={countInBasket === 3}>
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={!game.isFree ? handleAddToCart : linkToLoad}
                      type={'button'}
                      mode={'primary'}
                      isDisabled={!game.availability}>
                      {game.price === 0 || game.isFree
                        ? 'Скачать'
                        : game.availability
                        ? 'Купить'
                        : 'Нет в наличии'}
                      {/* {game.availability ? 'Купить' : 'Нет в наличии'} */}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <GameTab game={game} />
        </div>
      )}
      <Similar mainGame={game} />
    </section>
  );
}

