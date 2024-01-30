import { Link } from 'react-router-dom';
import { Order } from '../../components/Order/Order';
import { useAppSelector } from '../../services/store';
import style from './ProfileOrdersPage.module.scss';

function ProfileOrdersPage() {
  const orders = useAppSelector((store) => store.user?.user?.orders);

  console.log(orders);

  return (
    <ul className={style.orders + ' custom-scroll'}>
      {orders.length > 0
        ? orders.map((order) => <Order order={order} key={order.id} />)
        : <span>Покупок пока нет. <Link to={'/catalog'}>Каталог</Link></span>}
    </ul>
  );
}

export default ProfileOrdersPage;
