import { Link } from 'react-router-dom';
import { verticalMenuList } from '../../utils/constants';
import style from './VerticalMenu.module.scss';
import { IVerticalMenu } from './VerticalMenuTypes';

export const VerticalMenu = ({ closeMenu }: IVerticalMenu) => {
  return (
    <ul className={style.verticalMenu}>
      {verticalMenuList.map((link) => (
        <li key={link.id}>
          <Link to={link.link} className={style.verticalMenu__link} onClick={() => closeMenu()}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
