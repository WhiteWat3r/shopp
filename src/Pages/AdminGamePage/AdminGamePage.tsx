import { useParams } from 'react-router-dom';
import style from './AdminGamePage.module.scss';
import { IGame } from '../../services/gameTypes';
import { useAppSelector } from '../../services/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { config } from '../../utils/request';
import { finishPrice } from '../../utils/finishPrice';
import { categories } from '../../utils/constants';
import {
  useAddGameMutation,
  useFetchAllCardsQuery,
  useUpdateGameMutation,
} from '../../utils/gameApi';
import { toast } from 'react-toastify';

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
  categories: { id: number; description: string }[];
  categoryIds?: number[];
  preOrderStatus: boolean;
  dlcStatus: boolean;
  soonStatus: boolean;
  steamApi: number;
  imgUrl: string;
  posterFile: any;
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
  } = useForm<GameFormInput>({
    defaultValues: {},
  });

  const steamApi = getValues('steamApi');
  const img = watch('img', '');

  // console.log('poster', poster);

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
      setValue('categories', game.categories || undefined);
      setValue('preOrderStatus', game.preOrderStatus);
      setValue('dlcStatus', game.dlcStatus);
      setValue('soonStatus', game.soonStatus);
      setValue('steamApi', game.steamApi);
    } else {
      setValue('name', '');
      setValue('publisher', '');
      setValue('platform', '');
      setValue('language', '');
      setValue('releaseDate', '');
      setValue('info', '');
      setValue('availability', false);
      setValue('price', 0);
      setValue('discount', 0);
      setValue('finishPrice', 0);
      setValue('img', '');
      setValue('categories', []);
      setValue('preOrderStatus', false);
      setValue('dlcStatus', false); /////////
      setValue('soonStatus', false);
    }
  }, [game, setValue]);

  // console.log(game);

  const onSubmit = async () => {
    const gameData = getValues();
   






    const categoryIds = gameData.categories.map((category) => category.id);
    gameData.categoryIds = categoryIds;






    console.log('gameData.posterFile', gameData.posterFile[0]);
    
    if (gameData.posterFile){
      gameData.img = gameData.posterFile[0]
    }





    // const formData = new FormData();

    // formData.append('name', gameData.name);
    // formData.append('publisher', gameData.publisher);
    // formData.append('platform', gameData.platform);
    // formData.append('language', gameData.language);
    // formData.append('releaseDate', gameData.releaseDate);
    // formData.append('info', gameData.info);
    // formData.append('availability', String(gameData.availability));
    // formData.append('price', gameData.price);
    // formData.append('discount', gameData.discount);
    // formData.append('finishPrice', finishPrice(gameData.price, gameData.discount));
    // formData.append('img', gameData.img);
    // formData.append('categoryIds', gameData.categoryIds);
    // formData.append('preOrderStatus', gameData.preOrderStatus);
    // formData.append('dlcStatus', gameData.dlcStatus);
    // formData.append('soonStatus', gameData.soonStatus);
    // formData.append('steamApi', gameData.steamApi);









    console.log(gameData);

    try {
      if (game) {
        const response = await updateGame(gameData);
        console.log('response', response);
        await gamesInfo.refetch();
      } else {
        await createGame(gameData);
        await gamesInfo.refetch();
      }
      toast.success('Игра успешно создана или обновлена!');
    } catch (error) {
      console.error('Error updating/creating game', error);
      toast.error('Произошла ошибка при создании или обновлении игры.');
    }
  };

  const handleCheckboxChange = (id: number) => {
    const currentCategories = getValues().categories;
    const isChecked = currentCategories.some((category) => category.id === id);

    let updatedCategories;

    if (isChecked) {
      updatedCategories = currentCategories.filter((category) => category.id !== id);
    } else {
      const selectedCategory = categories.find((category) => category.id === id);
      updatedCategories = [...currentCategories, selectedCategory];
    }

    setValue('categories', updatedCategories);
    const currentCategoriessssss = getValues().categories;
    console.log('currentCategoriessssss', currentCategoriessssss);
  };

  const handleLoadFromSteam = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/proxy/steamApi/appdetails?appids=${steamApi}`,
      );

      const data = await response.json();

      console.log(data);

      console.log(data[steamApi].data.name);

      setValue('name', data[steamApi].data.name);
      setValue('publisher', data[steamApi].data.publishers[0]);
      setValue('platform', 'Steam');

      const language = data[steamApi].data.supported_languages.includes('Russian')
        ? 'Русский'
        : 'Английский';
      console.log(language);
      setValue('language', language);

      setValue('releaseDate', data[steamApi].data.release_date.date);
      setValue('info', data[steamApi].data.short_description);
      setValue('availability', true);

      setValue('price', Math.floor(data[steamApi].data.price_overview?.initial / 100));

      setValue('discount', 0);
      setValue('finishPrice', 0);

      setValue('imgUrl', data[steamApi].data.header_image);
      setValue('img', data[steamApi].data.header_image);

      console.log(data[steamApi].data.categories);

      setValue('categories', data[steamApi].data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const setSteamAPI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue('steamApi', value);
  };

  const defaultCategories = getValues('categories');
  // console.log('defaultCategories', defaultCategories);

  console.log('game', game);
  const steamApiValue = watch('steamApi');


  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  }


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

            <li className={style.game__checboxBlock}>
              <label htmlFor="">Начальная цена</label>
              <input
                {...register('price')}
                id={'price'}
                type="text"
                className={style.game__smallInput}
              />
            </li>
            <li className={style.game__checboxBlock}>
              <label htmlFor="">Скидка %</label>
              <input
                {...register('discount')}
                id={'discount'}
                type="text"
                className={style.game__smallInput}
              />
            </li>
            <li className={style.game__checboxBlock}>
              <label htmlFor="">Итог</label>
              <input
                {...register('finishPrice')}
                id={'finishPrice'}
                type="text"
                className={style.game__smallInput}
              />
            </li>
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
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  {category.description}
                </label>
              </li>
            ))}
          </ul>

          <div className={style.game__checboxBlock}>
            <label htmlFor="">Это DLC</label>
            <input {...register('dlcStatus')} type="checkbox" className={style.game__checkbox} />
          </div>
        </div>

        <div className={style.game__posterblock}>
          <img
            className={style.game__poster}
            src={img}
            alt=""
          />
          <div>
            <label htmlFor="imgUrl">Постер (ссылка)</label>
            <input {...register('imgUrl')} id="imgUrl" type="text" className={style.game__input} />
            {/* <button className={style.addDesired} type='button'>Загрузить постер</button> */}
          </div>
        </div>



        <div className={style.game__checboxBlock}>
          <label  htmlFor="posterFile">Постер из файла</label>
          <input {...register('posterFile')} type="file" id='posterFile' onChange={selectFile}/>
        </div>

        <button type="submit" className={style.addDesired}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
