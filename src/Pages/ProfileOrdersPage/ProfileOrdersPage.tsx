import { Order } from '../../components/Order/Order';
import { useAppSelector } from '../../services/store'
import style from './ProfileOrdersPage.module.scss'

function ProfileOrdersPage() {


  const orders = useAppSelector(store => store.user?.user?.orders)

  console.log(orders);
  

  return (
 
   
          <ul className={style.orders}>
             {orders ? orders.map(order => (
              <Order order={order} key={order.id}/>
             )) : 'Покупок пока нет. Каталог'} 
          </ul>
  )
}

export default ProfileOrdersPage
