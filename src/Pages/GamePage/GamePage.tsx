import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaRegCheckCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

import style from './GamePage.module.scss';
import Loader from '../../components/Loader/Loader.tsx';
import LastSaleItem from '../../components/LastSaleItem/LastSaleItem';
import { addGameToCart } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ICategorAndGenreType, IGame } from '../../services/gameTypes';
import { FaPenAlt } from 'react-icons/fa';
import { cards } from '../../data.ts';
import { config } from '../../utils/request.ts';
import { finishPrice } from '../../utils/finishPrice.ts';
import { ScreenCarousel } from '../../components/ScreenCarousel/ScreenCarousel.tsx';
import { checkPlatform } from '../../utils/checkPlatform.ts';
import { Button } from '../../UI/Button/Button.tsx';

import { IoPeopleOutline, IoPersonOutline, IoGameControllerOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiAchievement } from 'react-icons/gi';
import { PiVirtualRealityLight } from 'react-icons/pi';
import classNames from 'classnames';
import { genres } from '../../utils/constants.ts';
import { GameTab } from '../../components/GameTab/GameTab.tsx';
import { useFetchOneCardQuery } from '../../utils/gameApi.ts';

function GamePage() {
  const userRole = useAppSelector((store) => store.user?.user?.role);

  const dispatch = useAppDispatch();

  const { gameId } = useParams();

  const {
    data: game,
    isLoading: isLoadingGame,
    isError: isErrorOneCard,
  } = useFetchOneCardQuery(gameId);
  console.log(game);

  // console.log(loadGame(gameId));

  // const games = useAppSelector((store) => store.games.gamesList) || [];

  // const game = games.find((item: IGame) => {
  //     if (gameId !== undefined) {
  //       return item.id === parseInt(gameId);
  //     }
  //   }) || cards[0];

  // console.log(game, 'game');

  // console.log(game.screenshots);

  // const finishPrice = game.price - (game.price * game.discount) / 100;

  const handleAddToCart = () => {
    dispatch(addGameToCart(game.id));
  };

  const formatGameCategories = game?.categories?.map((category: ICategorAndGenreType) => category.description);

  const russianGenres = genres
    .filter((genre) =>
      game?.genres?.some((gameGenre: ICategorAndGenreType) => genre.description === gameGenre.description),
    )
    .map((genre) => genre.translation)
    .slice(0, 3)
    .join(', ');

  return (
    <section className={style.section}>
      {isLoadingGame ? (
        <Loader />
      ) : (
        <div className={style.card}>
          <div className={style.card__header}>
            <h1 className={style.name}>{game.name}</h1>

            {userRole === 'ADMIN' && (
              <Link className={style.card__adminLink} to={`/admin/game/${game.id}`}>
                <FaPenAlt size={23} />
              </Link>
            )}
          </div>

          <div className={style.card__content}>
            <div className={style.card__imageContainer}>
              <img src={config.baseUrl + '/' + game.img} alt={'Постер'} className={style.poster} />
              {game.screenshots ? (
                <ScreenCarousel screenshots={game.screenshots} />
              ) : (
                <span className={style.card__absence}>Скриншотов пока нет</span>
              )}
            </div>

            <div className={style.card__info}>
              {game.availability ? (
                <p className={style.card__inStock}>
                  Есть в наличии <FaRegCheckCircle />
                </p>
              ) : (
                <p className={style.card__inStock}>
                  Нет в наличии <RxCross2 />
                </p>
              )}

              <div className={style.priceBlock}>
                <h3 className={style.cost}>{finishPrice(game.price, game.discount)} ₽</h3>
                <p className={style.discount}>-{game.discount}%</p>/
                <p className={style.card__oldPrice}>{game.price} ₽</p>
              </div>

              <div className={style.infoItem}>
                <p className={style.card__parameter}>Активация: </p>
                <img
                  src={checkPlatform(game.platform.name)}
                  alt="Платформа активации"
                  className={style.logo}
                />
              </div>

              <div className={style.infoItem}>
                <p className={style.card__parameter}>Жанры: </p>
                {russianGenres}
              </div>
              <div className={style.infoItem}>
                <p className={style.card__parameter}>Язык: </p>
                <p className={style.card__value}>{game.language}</p>
              </div>
              <div className={style.infoItem}>
                <p className={style.card__parameter}>Издатель: </p>
                <p className={style.card__value}>{game.publisher.name}</p>
              </div>
              <div className={style.infoItem}>
                <p className={style.card__parameter}>Дата выхода: </p>
                <p className={style.card__value}>{game.releaseDate}</p>
              </div>

              {formatGameCategories && (
                <ul className={style.card__tags}>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Single-player') && style.card__tag_active,
                    )}>
                    <IoPersonOutline size={50} />
                    <span className={style.card__tagText}>Для одного</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Multi-player') && style.card__tag_active,
                    )}>
                    <FaPeopleGroup size={50} />
                    <span className={style.card__tagText}>Мультиплеер</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Co-op') && style.card__tag_active,
                    )}>
                    <IoPeopleOutline size={50} />
                    <span className={style.card__tagText}>Кооператив</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes(
                        'Partial Controller Support' || 'Full controller support',
                      ) && style.card__tag_active,
                    )}>
                    <IoGameControllerOutline size={50} />
                    <span className={style.card__tagText}>Контроллер</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('VR Support' || 'VR Supported') &&
                        style.card__tag_active,
                    )}>
                    <PiVirtualRealityLight size={50} />
                    <span className={style.card__tagText}>Поддержка VR</span>
                  </li>
                  <li
                    className={classNames(
                      style.card__tag,
                      formatGameCategories.includes('Steam Achievements') && style.card__tag_active,
                    )}>
                    {' '}
                    <GiAchievement size={50} />
                    <span className={style.card__tagText}>Достижения</span>
                  </li>
                </ul>
              )}

              <div className={style.buttons}>
                <div className={style.card__buttonContainer}>
                  <Button
                    onClick={handleAddToCart}
                    type={'button'}
                    mode={'primary'}
                    isDisabled={false}>
                    В желаемое
                  </Button>
                </div>

                <div className={style.card__buttonContainer}>
                  <Button
                    onClick={handleAddToCart}
                    type={'button'}
                    mode={'primary'}
                    isDisabled={false}>
                    Купить
                  </Button>
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
