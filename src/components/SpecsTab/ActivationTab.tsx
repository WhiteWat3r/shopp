import { ITab } from '../DescriptionTab/DescriptionTabTypes';
import style from './ActivationTab.module.scss';

export const ActivationTab = ({ game }: ITab) => {
  return (
    <div className={style.activation}>
      <p>
        1. Зарегистрировать аккаунт {game?.platform?.name}. 
      </p>
      <p>
        2. В меню "Мои игры" нажать кнопку "Активировать через {game?.platform?.name}..." и ввести ключ
      </p>
    </div>
  );
};
