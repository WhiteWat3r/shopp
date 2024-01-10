import { russianRequirements } from '../../utils/constants';
import { ITab } from '../DescriptionTab/DescriptionTabTypes';
import style from './RequirementsTab.module.scss';

export const RequirementsTab = ({ game }: ITab) => {
  const requirements: { [key: string]: string } = JSON.parse(game?.pcRequirements?.toString());

  return (
    <div className={style.requirements}>
      <ul className={style.requirements__container}>
        {Object.entries(requirements)?.map(([key, value], index) => (
          <li key={index} className={style.requirements__item}>
            <p className={style.requirements__name}>{russianRequirements[index]}</p>
            <p className={style.requirements__value}>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
