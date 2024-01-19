import classNames from 'classnames';
import style from './Sort.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../services/store';
import { sortOptions } from '../../utils/constants';
import { setSortSettings } from '../../services/slices/game';

export const Sort = () => {
  const [sortOption, setSortOption] = useState('inStock');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSortSettings(sortOption));
  }, [sortOption]);

  return (
    <ul className={style.sort}>
      {sortOptions.map((option) => (
        <li key={option.id}>
          <button
            onClick={() => setSortOption(option.name)}
            className={classNames(
              style.sort__button,
              sortOption === option.name && style.sort__button_active,
            )}
            key={option.id}>
            {option.text}
          </button>
        </li>
      ))}
    </ul>
  );
};
