import { useParams } from 'react-router-dom';
import style from './AdminGamePage.module.scss';
import { ICategorAndGenreType, IGame } from '../../services/gameTypes';
import { useAppSelector } from '../../services/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { config } from '../../utils/request';
import { finishPrice } from '../../utils/finishPrice';
import { categories } from '../../utils/constants';
import { genres } from '../../utils/constants';

import {
  useAddGameMutation,
  useFetchAllCardsQuery,
  useUpdateGameMutation,
} from '../../utils/gameApi';
import { toast } from 'react-hot-toast';
import { formatAndCheckDate } from '../../utils/formatAndCheckDate';

type GameFormInput = {
  name: string;
  field2: string;
  publisher: string;
  platform: string;
  language: string;
  releaseDate: string;
  info: string;
  price: number;
  discount: number;
  finishPrice: number;
  img: any;
  availability: boolean;
  categories: ICategorAndGenreType[];
  categoryIds?: number[];
  preOrderStatus: boolean;
  dlcStatus: boolean;
  soonStatus: boolean;
  steamApi: number;
  imgUrl: string;
  posterFile: any;
  genres: ICategorAndGenreType[];
  isFree: boolean;
  screenshots: string[];
};

export const AdminGamePage = () => {
  const gamesInfo = useFetchAllCardsQuery('');
  const [createGame] = useAddGameMutation();
  const [updateGame] = useUpdateGameMutation();

  const [screenLink, setScreenLink] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };
  const games = useAppSelector((store) => store.games.gamesList) || [];

  const { gameId } = useParams();

  const game = games.find((item: IGame) => {
    if (gameId !== undefined) {
      return item.id === parseInt(gameId);
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    // formState: { errors },
  } = useForm<GameFormInput>();

  const steamApi = getValues('steamApi');
  const img = watch('img', '');
  const imgUrl = watch('imgUrl', '');

  useEffect(() => {
    if (game) {
      setValue('name', game.name);
      setValue('publisher', game.publisher.name);
      setValue('platform', game.platform.name);
      setValue('language', game.language);
      setValue('releaseDate', game.releaseDate);
      setValue('info', game.info);
      setValue('availability', true);
      setValue('price', game.price);
      setValue('discount', game.discount);
      setValue('finishPrice', finishPrice(game.price, game.discount));
      setValue('img', `http://localhost:5000/${game.img}`);
      setValue('imgUrl', game.imgUrl);
      setValue('screenshots', game?.screenshots);
      setSelectedCategories(game.categories.map((category) => category.id));
      setValue('preOrderStatus', game.preOrderStatus);
      setValue('dlcStatus', game.dlcStatus);
      setValue('soonStatus', game.soonStatus);
      setValue('steamApi', game.steamApi);
      setSelectedGenres(game.genres.map((genre) => genre.id));
      setValue('isFree', game.isFree);
    }
  }, [game, setValue]);

  const onSubmit = async () => {
    const gameData = getValues();

    const formatDate = formatAndCheckDate(gameData.releaseDate);
    gameData.releaseDate = formatDate;
    gameData.categories = categories.filter((category) => selectedCategories.includes(category.id));
    gameData.genres = genres.filter((genre) => selectedGenres.includes(genre.id));
    try {
      if (game) {
        const response = await updateGame({ game: gameData, id: gameId });
        console.log('response', response);
        toast.success('Карточка успешно обновлена');
      } else {
        await createGame(gameData);
        toast.success('Карточка успешно создана');
      }
      await gamesInfo.refetch();
    } catch (error) {
      console.error('Error updating/creating game', error);
      toast.error(`Ошибка, ${error}`);
    }
  };

  const handleLoadFromSteam = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/api/proxy/steamApi/appdetails?appids=${steamApi}`,
      );
      const data = await response.json();
      console.log(data);

      setValue('name', data[steamApi].data.name);
      setValue('publisher', data[steamApi].data.publishers[0]);
      setValue('platform', 'Steam');

      const language = data[steamApi].data.supported_languages.includes('Russian')
        ? 'Русский'
        : 'Английский';
      setValue('language', language);
      setValue('releaseDate', data[steamApi].data.release_date.date);
      setValue('info', data[steamApi].data.short_description);
      setValue('availability', true);
      setValue('preOrderStatus', data[steamApi].data.release_date.coming_soon);
      setValue(
        'screenshots',
        data[steamApi].data.screenshots
          .slice(0, 6)
          .map((screen: { path_full: string }) => screen.path_full),
      );
      setValue('imgUrl', data[steamApi].data.header_image);
      setValue('img', data[steamApi].data.header_image);
      setValue('isFree', data[steamApi].data.is_free ? true : false);
      if (!data[steamApi].data.is_free) {
        setValue('price', Math.floor(data[steamApi].data.price_overview?.initial / 100));
      } else {
        setValue('price', 0);
      }
      setValue('discount', 0);
      setValue('finishPrice', 0);
      setSelectedCategories(
        data[steamApi].data.categories.map((category: ICategorAndGenreType) => category.id),
      );
      setValue('dlcStatus', data[steamApi].data.type === 'dlc' ? true : false);

      const transformedGenres = data[steamApi].data.genres.map((genre: ICategorAndGenreType) => ({
        id: Number(genre.id),
        description: genre.description,
      }));
      setSelectedGenres(transformedGenres.map((genre: ICategorAndGenreType) => genre.id));
    } catch (error) {
      console.log(error);
    }
  };

  const setSteamAPI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue('steamApi', value);
  };

  const steamApiValue = watch('steamApi');
  const isFree = watch('isFree');
  const screenshots = watch('screenshots');

  const handleSetScreenshot = () => {
    if (screenshots) {
      setValue('screenshots', [...screenshots, screenLink]);
      console.log('здарова');
    } else {
      setValue('screenshots', [screenLink]);
      console.log('здарова2');
    }
    console.log('screenshots', screenshots);
  };

  return (
    <div className={style.game}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.game__adminform}>
        <div className={style.game__header}>
          <div className={style.game__parameter}>
            <label htmlFor="name">Название товара</label>
            <input {...register('name')} id="name" className={style.game__input} />
          </div>
          <div className={style.game__checboxBlock}>
            <label htmlFor="platform">Платформа</label>
            <select {...register('platform')} id="platform" className={style.game__select}>
              <option value="EA App">EA App</option>
              <option value="Steam">Steam</option>
              <option value="Epic Games">Epic Games</option>
              <option value="GOG">GOG</option>
            </select>
          </div>
          <div className={style.game__checboxBlock}>
            <label htmlFor="checkbox">Бесплатная</label>
            <input {...register('isFree')} type="checkbox" className={style.game__checkbox} />
          </div>
          <div className={style.game__steamApi}>
            <label htmlFor="steamApi">Steam API</label>
            <input
              {...register('steamApi')}
              type="number"
              id="steamApi"
              className={style.game__input}
              onChange={setSteamAPI}
            />
            <button
              className={style.addDesired}
              type="button"
              onClick={handleLoadFromSteam}
              disabled={!steamApiValue}>
              Загрузить со Steam
            </button>
          </div>
        </div>

        <div className={style.game__block}>
          <div>
            <div className={style.game__parameter}>
              <label htmlFor="publisher">Издатель</label>
              <input
                {...register('publisher')}
                type="text"
                id="publisher"
                className={style.game__input}
              />
            </div>

            <div className={style.game__parameter}>
              <label htmlFor="language">Язык</label>
              <input
                {...register('language')}
                type="text"
                id="language"
                className={style.game__input}
              />
            </div>
            <div className={style.game__parameter}>
              <label htmlFor="releaseDate">Дата релиза</label>
              <input
                {...register('releaseDate')}
                type="text"
                id="releaseDate"
                className={style.game__input}
              />
            </div>
          </div>

          <ul className={style.game__section}>
            <li className={style.game__checboxBlock}>
              <label htmlFor="">Скоро</label>
              <input {...register('soonStatus')} type="checkbox" className={style.game__checkbox} />
            </li>
            <li className={style.game__checboxBlock}>
              <label htmlFor="checkbox">Наличие</label>
              <input
                {...register('availability')}
                type="checkbox"
                className={style.game__checkbox}
              />
            </li>
            <li className={style.game__checboxBlock}>
              <label htmlFor="">Предзаказ</label>
              <input
                {...register('preOrderStatus')}
                type="checkbox"
                className={style.game__checkbox}
              />
            </li>

            {!isFree && (
              <>
                <li className={style.game__checboxBlock}>
                  <label htmlFor="">Начальная цена</label>
                  <input
                    {...register('price')}
                    id={'price'}
                    type="number"
                    className={style.game__smallInput}
                  />
                </li>
                <li className={style.game__checboxBlock}>
                  <label htmlFor="">Скидка %</label>
                  <input
                    {...register('discount')}
                    id={'discount'}
                    type="number"
                    className={style.game__smallInput}
                  />
                </li>
                <li className={style.game__checboxBlock}>
                  <label htmlFor="">Итог</label>
                  <input
                    {...register('finishPrice')}
                    id={'finishPrice'}
                    type="number"
                    className={style.game__smallInput}
                  />
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={style.game__textBlock}>
          <label htmlFor="info">Описание</label>
          <textarea
            className={style.game__text}
            {...register('info')}
            name="info"
            id="info"
          />
        </div>

        <div className={style.game__categoriesBlock}>
          <ul className={style.game__categories}>
            {categories.map((category) => (
              <li key={category.id}>
                <label>
                  <input
                    // className={style.game__checkbox}
                    type="checkbox"
                    // {...register(`categories.${category.id}`)}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  {category.translation}
                </label>
              </li>
            ))}
          </ul>

          <ul className={style.game__categories}>
            {genres.map((genre) => (
              <li key={genre.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
                  />
                  {genre.translation}
                </label>
              </li>
            ))}
          </ul>

          <div className={style.game__checboxBlock}>
            <label htmlFor="dlcStatus">Это DLC</label>
            <input
              {...register('dlcStatus')}
              id="dlcStatus"
              type="checkbox"
              className={style.game__checkbox}
            />
          </div>
        </div>

        <div className={style.game__posterblock}>
          {img ? (
            <img className={style.game__poster} src={img} alt="" />
          ) : (
            <img className={style.game__poster} src={imgUrl} alt="" />
          )}
          <div>
            <label htmlFor="imgUrl">Постер (ссылка)</label>
            <input {...register('imgUrl')} id="imgUrl" type="text" className={style.game__input} />
            {/* <button className={style.addDesired} type='button'>Загрузить постер</button> */}
          </div>
        </div>
        {/* 
        <div className={style.game__checboxBlock}>
          <label htmlFor="posterFile">Постер из файла</label>
          <input {...register('posterFile')} type="file" id="posterFile" onChange={selectFile} />
        </div> */}

        {screenshots?.map((screen, index) => (
          <img src={screen} alt="Скриншот" key={index} />
        ))}

        <div className={style.game__setScreenshots}>
          <label htmlFor={'screen'}>Сссылка на скрин</label>
          <input
            id={'screen'}
            type={'text'}
            className={style.game__smallInput}
            value={screenLink}
            onChange={(e) => setScreenLink(e.target.value)}
          />
          <button onClick={handleSetScreenshot} type={'button'}>
            Выбрать скрин
          </button>
        </div>

        <button type="submit" className={style.addDesired}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
