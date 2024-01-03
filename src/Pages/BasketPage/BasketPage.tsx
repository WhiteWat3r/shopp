import style from './BasketPage.module.scss';

import Loader from '../../components/Loader/Loader';
import { IGame } from '../../services/gameTypes';
import { BasketItem } from '../../components/BasketItem/BasketItem';
import { PayWidget } from '../../components/PayWidget/PayWidget';
import { basketApi } from '../../utils/basketApi';
import { useEffect } from 'react';

function BasketPage() {
  const { data: basketInfo } = basketApi.useGetBasketInfoQuery('');

  console.log(basketInfo?.basket.basket_games);

  const basketGames = basketInfo?.basket.basket_games || [];
  // console.log(basketGames);

  const sortedGames = [...basketGames]?.sort((a, b) => b.id - a.id);

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
                ? sortedGames.map((game: IGame) => <BasketItem basketGame={game} key={game.id} />)
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
