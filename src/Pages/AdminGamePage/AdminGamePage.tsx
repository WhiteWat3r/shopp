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
};

export const AdminGamePage = () => {
  const gamesInfo = useFetchAllCardsQuery('');
  const [createGame] = useAddGameMutation();
  const [updateGame] = useUpdateGameMutation();

  // const [steamApi, setSteamApi] = useState('');

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
      setValue('releaseDate',  game.releaseDate);
      setValue('info', game.info);
      setValue('availability', true);
      setValue('price', game.price);
      setValue('discount', game.discount);
      setValue('finishPrice', finishPrice(game.price, game.discount));
      setValue('img', `http://localhost:5000/${game.img}`);
      setValue('imgUrl', game.imgUrl);
      setValue('categories', game.categories);
      setValue('preOrderStatus', game.preOrderStatus);
      setValue('dlcStatus', game.dlcStatus);
      setValue('soonStatus', game.soonStatus);
      setValue('steamApi', game.steamApi);
      setValue('genres', game.genres || undefined);
      setValue('isFree', game.isFree);
    }
  }, [game, setValue]);

  const onSubmit = async () => {
    const gameData = getValues();

    console.log('gameData.releaseDate', gameData.releaseDate);
    console.log('gameData.releaseDate', typeof gameData.releaseDate);

    const formatDate = formatAndCheckDate(gameData.releaseDate)
    console.log('formatDate', formatDate);
    gameData.releaseDate = formatDate
    console.log(gameData);

    try {
      if (game) {
        const response = await updateGame({game: gameData, id: gameId});
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

  const handleCheckboxChange = (type: keyof GameFormInput, id: number) => {
    const currentValues = getValues()[type];
    const isChecked = currentValues.some((item: ICategorAndGenreType) => item.id === id);
  
    let updatedValues;
  
    if (isChecked) {
      updatedValues = currentValues.filter((item: ICategorAndGenreType) => item.id !== id);
    } else {
      const selectedItem = type === 'categories' ? categories.find((item) => item.id === id) : genres.find((item) => item.id === id);
      updatedValues = [...currentValues, selectedItem];
    }
  
    if (updatedValues) {
      setValue(type, updatedValues);
    }
  };

  const handleLoadFromSteam = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/proxy/steamApi/appdetails?appids=${steamApi}`,
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
      console.log(typeof data[steamApi].data.release_date.date);
      console.log( data[steamApi].data.release_date.date);
      setValue('releaseDate', data[steamApi].data.release_date.date);
      setValue('info', data[steamApi].data.short_description);
      setValue('availability', true);
      setValue('preOrderStatus', data[steamApi].data.release_date.coming_soon);

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

      setValue('categories', data[steamApi].data.categories);
      setValue('dlcStatus', data[steamApi].data.type === 'dlc' ? true : false);
      const transformedGenres = data[steamApi].data.genres.map((genre: ICategorAndGenreType) => ({
        id: Number(genre.id),
        description: genre.description,
      }));

      setValue('genres', transformedGenres);
    } catch (error) {
      console.log(error);
    }
  };

  const setSteamAPI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue('steamApi', value);
  };

  const defaultCategories = getValues('categories');
  const defaultGenres = getValues('genres');

  const steamApiValue = watch('steamApi');
  const isFree = watch('isFree');

  return (
    <div className={style.game}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.game__adminform}>
        {/* <h1 className={style.game__name}>Название товара</h1> */}

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
              <option value="EpicGames">Epic Games</option>
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
            cols={30}
            rows={10}
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
                    defaultChecked={
                      defaultCategories &&
                      defaultCategories.some((defaultCategory) => {
                        if (defaultCategory?.id) {
                          // console.log(defaultCategory.id, category.id);

                          return defaultCategory.id === category.id;
                        }
                      })
                    }
                    onChange={() => handleCheckboxChange('categories', category.id)}
                  />
                  {category.description}
                </label>
              </li>
            ))}
          </ul>

          <ul className={style.game__categories}>
            {genres.map((genre) => (
              <li key={genre.id}>
                <label>
                  <input
                    // className={style.game__checkbox}
                    type="checkbox"
                    // {...register(`categories.${category.id}`)}
                    defaultChecked={
                      defaultGenres &&
                      defaultGenres.some((defaultGenre) => {
                        if (defaultGenre?.id) {
                          // console.log(defaultGenre.id, genre.id);

                          return defaultGenre.id === genre.id;
                        }
                      })
                    }
                    onChange={() => handleCheckboxChange('genres', genre.id)}
                  />
                  {genre.description}
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
          {img ? <img className={style.game__poster} src={img} alt="" /> : <img className={style.game__poster} src={imgUrl} alt="" />}
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

        <button type="submit" className={style.addDesired}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
