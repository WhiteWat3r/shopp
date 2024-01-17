import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaCartArrowDown, FaRegCheckCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

import style from './GamePage.module.scss';
import Loader from '../../components/Loader/Loader.tsx';
import LastSaleItem from '../../components/LastSaleItem/LastSaleItem';
import { addGameToCart } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ICategorAndGenreType, IGame } from '../../services/gameTypes';
import { FaPenAlt } from 'react-icons/fa';
import { config } from '../../utils/request.ts';
import { finishPrice } from '../../utils/finishPrice.ts';
import { ScreenCarousel } from '../../components/ScreenCarousel/ScreenCarousel.tsx';
import { checkPlatform } from '../../utils/checkPlatform.ts';
import { Button } from '../../UI/Button/Button.tsx';

import { IoPeopleOutline, IoPersonOutline, IoGameControllerOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiAchievement } from 'react-icons/gi';
import { PiVirtualRealityLight } from 'react-icons/pi';
import { CiCloudOn, CiHeart } from 'react-icons/ci';

import classNames from 'classnames';
import { genres } from '../../utils/constants.ts';
import { GameTab } from '../../components/GameTab/GameTab.tsx';
import { useFetchOneCardQuery } from '../../utils/gameApi.ts';
import { LikeButton } from '../../UI/LikeButton/LikeButton.tsx';
import { platformIcons } from '../../components/FilterParameters/FilterParameters.tsx';
import { useAddItemMutation, useDeleteItemMutation } from '../../utils/basketApi.ts';

function GamePage() {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const userRole = useAppSelector((store) => store.user?.user?.role);

  const dispatch = useAppDispatch();

  const { gameId } = useParams();

  const countInBasket = useAppSelector((store) => {
    const basketItem = store.user?.user?.basket?.basket_games.find((basketItem) => {
      return basketItem.gameId?.toString() === gameId;
    });

    return basketItem ? basketItem.quantity : 0;
  });

  console.log(countInBasket);

  const {
    data: game,
    isLoading: isLoadingGame,
    isError: isErrorOneCard,
  } = useFetchOneCardQuery(gameId);
  // console.log(game);

  const handleAddToCart = async () => {
    await addItem({ gameId, quantity: 1 });
  };


  const handleRemoveFromCart = async () => {
    await deleteItem({ gameId, quantity: 1 });
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

  return (
    <section className={style.section}>
      {isLoadingGame ? (
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
                  <p className={style.card__inStock}>
                    Есть в наличии <FaRegCheckCircle />
                  </p>
                ) : (
                  <p className={style.card__inStock}>
                    Нет в наличии <RxCross2 />
                  </p>
                )}

                <div className={style.card__priceBlock}>
                  <h3 className={style.card__cost}>{finishPrice(game.price, game.discount)} ₽</h3>
                  <p className={style.card__discount}>-{game.discount}%</p>/
                  <p className={style.card__oldPrice}>{game.price} ₽</p>
                </div>

                <div className={style.card__infoItem}>
                  <p className={style.card__parameter}>Активация: </p>

                  <span className={style.card__platform}>{platform?.icon} </span>
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
                    onClick={handleAddToCart}
                    type={'button'}
                    active={false}
                    isDisabled={false}>
                    <CiHeart size={'100%'} />
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
                    </Button></div>
                  ) : (
                    <Button
                      onClick={handleAddToCart}
                      type={'button'}
                      mode={'primary'}
                      isDisabled={false}>
                      Купить
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <GameTab game={game} />
        </div>
      )}
      <div className={style.similar}>
        <h3 className={style.similar__header}>Похожие игры</h3>
        <ul className={style.similar__list}>
          <LastSaleItem />
        </ul>
      </div>
    </section>
  );
}

export default GamePage;
