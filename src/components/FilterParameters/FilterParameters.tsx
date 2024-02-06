import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FaSteam } from 'react-icons/fa';
import { SiEpicgames, SiGogdotcom, SiOrigin } from 'react-icons/si';
import classNames from 'classnames';
import style from './FilterParameters.module.scss';

import { SearchInput } from '../SearchInput/SearchInput';
import { Button } from '../../UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { filterAndSortArray } from '../../utils/filtering';
import { setSearchedGames } from '../../services/slices/game';
import { useFetchAllPublishersQuery } from '../../api/publisersApi';
import { ICategorAndGenreType, IPublisher } from '../../types/gameTypes';
import { genres } from '../../utils/constants';

export const platformIcons = [
  {
    id: 1,
    platform: 'Steam',
    icon: <FaSteam size={'100%'} />,
  },
  {
    id: 2,
    platform: 'EA App',
    icon: <SiOrigin size={'100%'} />,
  },
  {
    id: 3,
    platform: 'Epic Games',
    icon: <SiEpicgames size={'100%'} />,
  },
  {
    id: 4,
    platform: 'GOG',
    icon: <SiGogdotcom size={'100%'} />,
  },
];

export type FilterForm = {
  startCount: number | null;
  endCount: number | null;
  platforms: string[];
  name: string;
  publishers: string[];
  genres: string[];
};

export const FilterParameters = () => {
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((store) => store.games.gamesList);

  const sortOption = useAppSelector((store) => store.games.sortOption);

  const [publisherName, setPublisherName] = useState('');
  const [genreName, setGenreName] = useState('');

  const [allPublishers, setAllPublishers] = useState<IPublisher[]>([]);
  const [allGenres, setAllGenres] = useState<ICategorAndGenreType[]>(genres);

  const { register, watch, setValue, reset } = useForm<FilterForm>();

  const platforms = watch('platforms', []);
  const checkedPublishers = watch('publishers', []);
  const checkedGenres = watch('genres', []);
  const values = watch();

  // const name = watch('name');

  // console.log(name);
  const { data: publishersQuery } = useFetchAllPublishersQuery('');
  // console.log(publishersQuery);

  const handleTogglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setValue(
        'platforms',
        platforms.filter((item) => platform !== item),
      );
    } else {
      setValue('platforms', [...platforms, platform]);
    }
  };


  useEffect(() => {
    if (allGames) {
      const result = filterAndSortArray(allGames, values, sortOption);
      dispatch(setSearchedGames(result));
      console.log('filter');
    }
  }, [values, sortOption]);

  useEffect(() => {
    if (publishersQuery) {
      setAllPublishers(publishersQuery);
    }
  }, [publishersQuery]);

  const handleChangePublisherName = (e: ChangeEvent<HTMLInputElement>) => {
    setPublisherName(e.target.value);

    const updatedPublishers = publishersQuery.filter((publisher: IPublisher) =>
      publisher.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setAllPublishers(updatedPublishers);
  };

  const handleTogglePublishers = (publisher: IPublisher) => {
    if (checkedPublishers.includes(publisher.name)) {
      setValue(
        'publishers',
        checkedPublishers.filter((name) => publisher.name !== name),
      );
    } else {
      setValue('publishers', [...checkedPublishers, publisher.name]);
    }
  };

  const handleChangeGenreName = (e: ChangeEvent<HTMLInputElement>) => {
    setGenreName(e.target.value);
    console.log(e.target.value);

    const updatedGenres = genres.filter((genre: ICategorAndGenreType) =>
      genre.translation.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setAllGenres(updatedGenres);
  };

  const handleToggleGenres = (genre: ICategorAndGenreType) => {
    if (checkedGenres.includes(genre.description)) {
      setValue(
        'genres',
        checkedGenres.filter((checkedGenre) => checkedGenre !== genre.description),
      );
    } else {
      setValue('genres', [...checkedGenres, genre.description]);
    }
  };

  const handleClearFilters = () => {
    reset();

    setValue('startCount', null);
    setValue('endCount', null);
    setValue('name', '');
    setValue('platforms', []);
    setValue('publishers', []);
    setValue('genres', []);

    setPublisherName('');
    setAllPublishers(publishersQuery);
    setGenreName('');
    setAllGenres(genres);
  };

  return (
    <div className={style.controls}>
      <div className={style.controls__container}>
        <SearchInput placeholder="Поиск игры" validation={{ ...register('name') }} />

        <div className={style.controls__block}>
          <span className={style.controls__subtitle}>Цена</span>
          <div className={style.controls__cost}>
            <label>от</label>
            <input type={'number'} className={style.controls__input} {...register('startCount')} />
            <label>до</label>
            <input type={'number'} className={style.controls__input} {...register('endCount')} />
          </div>
        </div>

        <div className={style.controls__block}>
          <span className={style.controls__subtitle}>Платформа</span>

          <ul className={style.controls__platform}>
            {platformIcons.map((item) => (
              <li
                key={item.id}
                className={classNames(
                  style.controls__platformIcon,
                  values?.platforms?.includes(item.platform) && style.controls__platformIcon_active,
                )}
                onClick={() => handleTogglePlatform(item.platform)}>
                {item.icon}
              </li>
            ))}
          </ul>
        </div>
<div className={style.controls__list}>
        <div className={style.controls__block}>
          <span className={style.controls__subtitle}>Издатель</span>
          <input
            type="text"
            placeholder={'Поиск'}
            value={publisherName}
            onChange={handleChangePublisherName}
            className={style.controls__publisherSearch}
          />

          <ul className={style.controls__publishers + ' custom-scroll'}>
            {allPublishers && allPublishers.length > 0 ? (
              allPublishers.map((publisher) => (
                <li className={style.controls__publisher} key={publisher.id}>
                  <label className={style.controls__publisherName} htmlFor={publisher.name}>
                    {publisher.name}
                  </label>
                  <input
                    type="checkbox"
                    id={publisher.name}
                    onChange={() => handleTogglePublishers(publisher)}
                    checked={checkedPublishers.includes(publisher.name)}
                  />
                </li>
              ))
            ) : (
              <li className={style.controls__publisher}>Такой издатель не найден :(</li>
            )}
          </ul>
        </div>

        <div className={style.controls__block}>
          <span className={style.controls__subtitle}>Жанры</span>
          <input
            type="text"
            placeholder={'Поиск'}
            value={genreName}
            onChange={handleChangeGenreName}
            className={style.controls__publisherSearch}
          />

          <ul className={style.controls__publishers + ' custom-scroll'}>
            {allGenres && allGenres.length > 0 ? (
              allGenres.map((genre) => (
                <li className={style.controls__publisher} key={genre.id}>
                  <label className={style.controls__publisherName} htmlFor={genre.description}>
                    {genre.translation}
                  </label>
                  <input
                    type="checkbox"
                    id={genre.description}
                    onChange={() => handleToggleGenres(genre)}
                    checked={
                      checkedGenres.findIndex(
                        (checkedGenre) => checkedGenre === genre.description,
                      ) !== -1
                    }
                  />
                </li>
              ))
            ) : (
              <li className={style.controls__publisher}>Такой жанр не найден :(</li>
            )}
          </ul>
        </div>
        </div>
        <div className={style.controls__buttonContainer}>
          <Button
            isDisabled={false}
            type={'button'}
            mode={'secondary'}
            onClick={handleClearFilters}>
            Очистить
          </Button>
        </div>
      </div>
    </div>
  );
};
