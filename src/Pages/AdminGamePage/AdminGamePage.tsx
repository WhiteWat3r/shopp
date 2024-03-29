import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './AdminGamePage.module.scss';
import { ICategorAndGenreType, IGame } from '../../types/gameTypes';
import { useAppSelector } from '../../services/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { config } from '../../utils/config';
import { finishPrice } from '../../utils/finishPrice';
import { categories } from '../../utils/constants';
import { genres } from '../../utils/constants';

import {
  useAddGameMutation,
  useFetchAllCardsQuery,
  useUpdateGameMutation,
} from '../../api/gameApi';
import { toast } from 'react-hot-toast';
import { formatAndCheckDate } from '../../utils/formatAndCheckDate';
import { Input } from '../../UI/Input/Input';
import { GameRequirements } from '../../components/GameRequirmentsChange/GameRequirmentsChange';
import { MinimumRequirements } from '../../components/GameRequirmentsChange/GameRequirementsTypes';
import { Button } from '../../UI/Button/Button';

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
  // imgUrl: string;
  posterFile: any;
  genres: ICategorAndGenreType[];
  isFree: boolean;
  screenshots: string[];
  regions: string;
  pcRequirements: { [key: string]: string };
  quantity: number;
};

export const AdminGamePage = () => {


  const [screenLink, setScreenLink] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [minimumRequirements, setMinimumRequirements] = useState<MinimumRequirements>({});


  const gamesInfo = useFetchAllCardsQuery('');
  const [createGame] = useAddGameMutation();
  const [updateGame] = useUpdateGameMutation();

  const navigate = useNavigate();

  // console.log(minimumRequirements);

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

  // if (gameId === 'create') {

  // }

  const game = games.find((item: IGame) => {
    if (gameId !== undefined) {
      return item.id === parseInt(gameId);
    }
  });
  //peredelat'
  // console.log(game);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    // formState: { errors },
  } = useForm<GameFormInput>();

  const steamApi = getValues('steamApi');
  const img = watch('img', '');
  // const imgUrl = watch('imgUrl', '');

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
      setValue('img', `${config.baseUrl}/${game.img}`);
      setValue('quantity', game?.quantity);

      // setPosterLink(`${config.baseUrl}/${game.img}`);

      // setValue('imgUrl', game.imgUrl);

      setValue(
        'screenshots',
        game?.screenshots.map((screen) => `${config.baseUrl}/${screen}`),
      );

      setSelectedCategories(game.categories.map((category) => category.id));
      setValue('preOrderStatus', game.preOrderStatus);
      setValue('dlcStatus', game.dlcStatus);
      setValue('soonStatus', game.soonStatus);
      setValue('steamApi', game.steamApi);
      setSelectedGenres(game.genres.map((genre) => genre.id));
      setValue('isFree', game.isFree);
      setValue('regions', game.regions);
      setValue('pcRequirements', game.pcRequirements);
    } else {
      reset();
      setSelectedCategories([]);
      setSelectedGenres([]);
      setMinimumRequirements({});
    }
  }, [game, setValue, gameId]);

  const onSubmit = async () => {
    const gameData = getValues();

    gameData.releaseDate = formatAndCheckDate(gameData.releaseDate);
    gameData.categories = categories.filter((category) => selectedCategories.includes(category.id));
    gameData.genres = genres.filter((genre) => selectedGenres.includes(genre.id));
    gameData.pcRequirements = minimumRequirements;

    gameData.screenshots = gameData.screenshots.map((screen) => {
      if (screen.includes(config.baseUrl)) {
        return screen.replace(config.baseUrl, '').slice(1);
      }
      return screen;
    });

    if (gameData.img.includes(config.baseUrl)) {
      gameData.img = gameData.img.replace(config.baseUrl, '').slice(1);
    }

    // console.log(gameData.screenshots);

    // console.log(gameData);

    try {
      let response;

      if (game) {
        response = await updateGame({ game: gameData, id: gameId });
      } else {
        response = await createGame(gameData);
      }

      // console.log(response);

      if ('data' in response && response.data.success) {
        if (game) {
          toast.success('Карточка успешно обновлена');
        } else {
          toast.success('Карточка успешно создана');
          navigate(`/admin/game/${response.data.game.id}`);
        }
      } else {
        throw new Error(`Ошибка`);
      }

      await gamesInfo.refetch();
    } catch (error) {
      console.error('Ошибка', error);
      toast.error(`Ошибка}`);
    }
  };

  const handleLoadFromSteam = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/api/proxy/steamApi/appdetails?appids=${steamApi}`,
      );
      const data = await response.json();
      // console.log(data);

      setValue('name', data[steamApi].data.name);
      setValue('publisher', data[steamApi].data.publishers[0]);
      setValue('platform', 'Steam');
      setValue('regions', 'CIS');
      setValue('pcRequirements', data[steamApi].data.pc_requirements.minimum);

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
      // setValue('imgUrl', data[steamApi].data.header_image);
      setValue('img', data[steamApi].data.header_image);
      // setPosterLink(data[steamApi].data.header_image)

      setValue('quantity', 1);

      setValue('isFree', data[steamApi].data.is_free ? true : false);

      if (!data[steamApi].data.is_free) {
        if (data[steamApi].data.price_overview.currency === 'RUB') {
          setValue('price', Math.floor(data[steamApi].data.price_overview?.initial / 100));
        } else {
          setValue('price', Math.floor(data[steamApi].data.price_overview?.initial));
        }
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
  const pcRequirements = watch('pcRequirements');

  // console.log(pcRequirements);

  const handleSetScreenshot = () => {
    if (screenshots) {
      setValue('screenshots', [...screenshots, screenLink]);
      // console.log('здарова');
    } else {
      setValue('screenshots', [screenLink]);
      // console.log('здарова2');
    }
    // console.log('screenshots', screenshots);
  };


  const handleSetPoster = () => {
    const img = watch('img', '');

    // console.log('img', img);
    setValue('img', img);
  };

  const handleScreenLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScreenLink(e.target.value);
  };

  return (
    <div className={style.game}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.game__adminform}>
        <div className={style.game__header}>
          <Link className={style.game__link} to={`/game/${gameId}`}>
            На страницу товара в магазине
          </Link>
          <div className={style.game__buttonContainer}>
            <Button type={'submit'} mode={'secondary'} isDisabled={false}>
              Сохранить изменения
            </Button>
          </div>
        </div>
        <div className={style.game__name}>
          <Input
            type={'text'}
            mode={'primary'}
            validation={{ ...register('name') }}
            labelText={'Название товара'}
            id={'name'}
          />

          <div className={style.game__selectContainer}>
            <label htmlFor="platform">Платформа</label>
            <select {...register('platform')} id="platform" className={style.game__select}>
              <option value="EA App">EA App</option>
              <option value="Steam">Steam</option>
              <option value="Epic Games">Epic Games</option>
              <option value="GOG">GOG</option>
            </select>
          </div>

          <div className={style.game__selectContainer}>
            <label htmlFor="platform">Регионы</label>
            <select {...register('regions')} id="regions" className={style.game__select}>
              <option value="CIS">CIS</option>
              <option value="Region free">Region free</option>
              <option value="CIS(-Aze)">CIS(-Aze)</option>
              <option value="CIS(-Aze, -Geo)">CIS(-Aze, -Geo)</option>
              <option value="CIS(-Rus, -Bel)">CIS(-Rus, -Bel)</option>
            </select>
          </div>

          <Input
            type={'checkbox'}
            mode={'secondary'}
            validation={{ ...register('isFree') }}
            labelText={'Бесплатная'}
            id={'free'}
          />

          <div className={style.game__steamApi}>
            <Input
              type={'number'}
              mode={'primary'}
              validation={{ ...register('steamApi') }}
              labelText={'Steam Appid'}
              id={'steamApi'}
              onChange={setSteamAPI}
            />
            <div className={style.game__buttonContainer}>
              <Button
                type={'button'}
                mode={'primary'}
                isDisabled={!steamApiValue}
                onClick={handleLoadFromSteam}>
                Загрузить со Steam
              </Button>
            </div>
          </div>
        </div>

        <div className={style.game__block}>
          <div className={style.game__mainInfo}>
            <Input
              type={'text'}
              mode={'primary'}
              validation={{ ...register('publisher') }}
              labelText={'Издатель'}
              id={'publisher'}
            />

            <Input
              type={'text'}
              mode={'primary'}
              validation={{ ...register('language') }}
              labelText={'Язык'}
              id={'language'}
            />

            <Input
              type={'text'}
              mode={'primary'}
              validation={{ ...register('releaseDate') }}
              labelText={'Дата релиза'}
              id={'releaseDate'}
            />
          </div>

          <Input
            type={'checkbox'}
            mode={'secondary'}
            validation={{ ...register('dlcStatus') }}
            labelText={'Это DLC'}
            id={'dlcStatus'}
          />

          <Input
            type={'number'}
            mode={'tertiary'}
            validation={{ ...register('quantity') }}
            labelText={'Кол-во'}
            id={'quantity'}
          />

          <div className={style.game__section}>
            <Input
              type={'checkbox'}
              mode={'secondary'}
              validation={{ ...register('soonStatus') }}
              labelText={'Скоро'}
              id={'soon'}
            />

            <Input
              type={'checkbox'}
              mode={'secondary'}
              validation={{ ...register('availability') }}
              labelText={'Наличие'}
              id={'availability'}
            />

            <Input
              type={'checkbox'}
              mode={'secondary'}
              validation={{ ...register('preOrderStatus') }}
              labelText={'Предзаказ'}
              id={'preOrder'}
            />

            {!isFree && (
              <>
                <Input
                  type={'number'}
                  mode={'tertiary'}
                  validation={{ ...register('price') }}
                  labelText={'Начальная цена'}
                  id={'price'}
                />

                <Input
                  type={'number'}
                  mode={'tertiary'}
                  validation={{ ...register('discount') }}
                  labelText={'Скидка %'}
                  id={'discount'}
                />

                <Input
                  type={'number'}
                  mode={'tertiary'}
                  validation={{ ...register('finishPrice') }}
                  labelText={'Итог'}
                  id={'finishPrice'}
                />
              </>
            )}
          </div>
        </div>

        <div className={style.game__textBlock}>
          <label htmlFor="info">Описание</label>
          <textarea className={style.game__text} {...register('info')} name="info" id="info" />
        </div>

        <GameRequirements
          pcRequirements={pcRequirements}
          minimumRequirements={minimumRequirements}
          setMinimumRequirements={setMinimumRequirements}
        />

        {/* <div className={style.game__textBlock}>
          <p>Системки</p>
          <div dangerouslySetInnerHTML={{__html: pcRequirements}}></div>
        </div> */}

        <div className={style.game__categoriesBlock}>
          <ul className={style.game__categories}>
            {categories.map((category) => (
              <li key={category.id}>
                <Input
                  type={'checkbox'}
                  mode={'listItem'}
                  // validation={{ ...register('finishPrice') }}
                  labelText={category.translation}
                  id={'category'}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                />
              </li>
            ))}
          </ul>

          <ul className={style.game__categories}>
            {genres.map((genre) => (
              <li key={genre.id}>
                <Input
                  type={'checkbox'}
                  mode={'listItem'}
                  // validation={{ ...register('finishPrice') }}
                  labelText={genre.translation}
                  id={'genre'}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreToggle(genre.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={style.game__images}>
          <img className={style.game__poster} src={img} alt="" />

          <div className={style.game__screenList}>
            {screenshots?.map((screen, index) => (
              <li>
                <img src={screen} alt="Скриншот" key={index} className={style.game__screen} />
              </li>
            ))}
          </div>
        </div>

        <div className={style.game__inputLinks}>
          <Input
            type={'text'}
            mode={'primary'}
            validation={{ ...register('img') }}
            labelText={'Постер (ссылка)'}
            id={'img'}
          />

          <div className={style.game__setImageButton}>
            <Button type={'button'} mode={'primary'} isDisabled={false} onClick={handleSetPoster}>
              Выбрать Постер
            </Button>
          </div>

          <Input
            type={'text'}
            mode={'primary'}
            labelText={'Сссылка на скрин'}
            id={'screen'}
            onChange={handleScreenLinkChange}
          />
          <div className={style.game__setImageButton}>
            <Button
              type={'button'}
              mode={'primary'}
              isDisabled={false}
              onClick={handleSetScreenshot}>
              Выбрать скрин
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
