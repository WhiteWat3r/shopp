import { ITab } from '../DescriptionTab/DescriptionTabTypes';
import style from './RequirementsTab.module.scss';

export const RequirementsTab = ({ game }: ITab) => {


console.log(game?.pcRequirements);


  return (
    <div className={style.requirements}>
      {game?.pcRequirements ? (      <ul className={style.requirements__container}>
 {Object.entries(game?.pcRequirements)?.map(([key, value], index) => (
          <li key={index} className={style.requirements__item}>
            {/* <p className={style.requirements__name}>{russianRequirements[index]}</p> */}
            <p className={style.requirements__name}>{key}</p>

            <p className={style.requirements__value}>{value}</p>
          </li>
        ))}

        
      </ul>) : (<span className={style.requirements__empty}>К сожалению, системные требования еще не указаны.</span>)}

    </div>
  );
};
