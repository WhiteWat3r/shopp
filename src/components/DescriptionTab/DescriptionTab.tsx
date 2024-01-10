import style from './DescriptionTab.module.scss';
import globus from '../../assets/globus.png';
import { ITab } from './DescriptionTabTypes';
import { formatRegionString } from '../../utils/regions';

export const DescriptionTab = ({ game }: ITab) => {
  // console.log(formatRegionString(game.regions));

  return (
    <div className={style.description}>
      <p className={style.description__info}>{game.info}</p>

      {game.dlcStatus && (
        <span className={style.description__dlc}>
          Это дополнение к игре. Для активации требуется наличие оригинальной игры
        </span>
      )}

      <div className={style.description__region}>
        <img className={style.description__globus} src={globus} alt="Регионы активации" />
        <p className={style.description__regions}>Региона активации: {formatRegionString(game?.regions)}</p>
      </div>
    </div>
  );
}

