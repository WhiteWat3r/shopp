import { Link } from 'react-router-dom';
import style from './AdminGameItem.module.scss';
import { IAdminGameItem } from './AdminGameItemTypes';

export const AdminGameItem = ({ item }: IAdminGameItem) => {
  return (
    <li className={style.item} key={item.id}>
      <p className={style.item__id}>{item.id}</p>
      <Link to={`/admin/game/${item.id}`} className={style.item__link}>
        <p>{item.name}</p>
      </Link>
      <p>{item.publisher?.name}</p>
      <p>{item.price}</p>
      <p>{Math.round(item.price - (item.price * item.discount) / 100)}</p>
      <p>{item.platform?.name}</p>
      <p>{item.availability ? '+' : '-'}</p>
    </li>
  );
};
