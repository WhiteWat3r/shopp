import style from './BasketPage.module.scss';

import Loader from '../../components/Loader/Loader';
import { IGame } from '../../services/gameTypes';
import { BasketItem } from '../../components/BasketItem/BasketItem';
import { PayWidget } from '../../components/PayWidget/PayWidget';
import { basketApi, useGetBasketInfoQuery } from '../../utils/basketApi';
import { useEffect } from 'react';
import { IBasketGame } from '../../services/basketTypes';
import { useAppSelector } from '../../services/store';

function BasketPage() {
  // const { data: basketInfo } = useGetBasketInfoQuery('');
  // console.log(basketInfo);
  
  const basket = useAppSelector(store=> store.user?.user?.basket)

console.log('basket', basket);






  console.log(basket?.basket_games);
 
  const basketGames = basket?.basket_games || [];
  // console.log(basketGames);

  const sortedGames = [...basketGames]?.sort((a, b) => b.id - a.id);

  console.log('sortedGames', sortedGames);

  return (
    <section className={style.section}>
      {!basketGames ? (
        <Loader />
      ) : (
        <div className={style.basket}>
          <div className={style.basket__items}>
            <h1 className={style.basket__header}>Корзина</h1>

            <ul className={style.basket__list + ' custom-scroll'}>
              {sortedGames.length > 0
                ? sortedGames.map((basketItem: IBasketGame) => (
                    <BasketItem basketGame={basketItem} key={basketItem.id} />
                  ))
                : 'Пока корзина пуста'}
            </ul>
          </div>
          <PayWidget />
        </div>
      )}
    </section>
  );
}

export default BasketPage;
