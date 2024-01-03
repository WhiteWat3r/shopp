import style from './DescriptionTab.module.scss';
import globus from '../../assets/globus.png';
import { ITab } from './DescriptionTabTypes';

function DescriptionTab({ game }: ITab) {
  return (
    <div className={style.descriptionTab}>
      <p className={style.info}> {game.info}</p>

      <div className={style.region}>
        <img className={style.globus} src={globus} alt="" />
        <p className={style.regions}>
          Регионы активации: Россия, Украина, Республика Беларусь, Казахстан, Армения, Азербайджан,
          Киргизстан, Республика Молдова, Таджикистан, Туркменистан, Узбекистан.
        </p>
      </div>
    </div>
  );
}

export default DescriptionTab;
