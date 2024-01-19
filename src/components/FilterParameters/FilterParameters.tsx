import { useForm } from 'react-hook-form';
import style from './FilterParameters.module.scss';
import { FaSteam } from 'react-icons/fa';
import { SiEpicgames, SiGogdotcom, SiOrigin } from 'react-icons/si';
import { ChangeEvent, HtmlHTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SearchInput } from '../SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { filterAndSortArray } from '../../utils/filtering';
import { setSearchedGames } from '../../services/slices/game';
import { useFetchAllPublishersQuery } from '../../api/publisersApi';
import { IPublisher } from '../../types/gameTypes';

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
  startCount: number;
  endCount: number;
  platforms: string[];
  name: string;
  publishers: string[];
};

export const FilterParameters = () => {
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((store) => store.games.gamesList);

  const sortOption = useAppSelector((store) => store.games.sortOption);

  const [publisherName, setPublisherName] = useState('');
  const [allPublishers, setAllPublishers] = useState<IPublisher[]>([]);

  const { getValues, register, handleSubmit, watch, setValue } = useForm<FilterForm>();

  const platforms = watch('platforms', []);
  const checkedPublishers = watch('publishers', []);

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

  const values = watch();


//при каждом изменении values изменять и стор

console.log(values);







  useEffect(() => {
    
    if (allGames) {
      const result = filterAndSortArray(allGames, values, sortOption);
      dispatch(setSearchedGames(result));
      console.log('сработал');
      
    }
  }, [values, sortOption]);









  useEffect(() => {
    if (publishersQuery) {
      console.log('работаем братья');

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

  const handleTogglePublishers = (publisherName: string) => {
    if (checkedPublishers.includes(publisherName)) {
      setValue(
        'publishers',
        checkedPublishers.filter((name) => publisherName !== name),
      );
    } else {
      setValue('publishers', [...checkedPublishers, publisherName]);
    }
  };

  return (
    <div className={style.controls}>
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
                    onChange={() => handleTogglePublishers(publisher.name)}
                  />
                </li>
              ))
            ) : (
              <li className={style.controls__publisher}>Такой издатель не найден :(</li>
            )}
          </ul>
        </div>
        <div className={style.controls__block}>
          {/* <span className={style.controls__subtitle}>Категории</span> */}
        </div>
      </div>
    </div>
  );
};
