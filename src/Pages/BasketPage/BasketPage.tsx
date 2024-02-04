import style from './BasketPage.module.scss';

import { BasketItem } from '../../components/BasketItem/BasketItem';
import { PayWidget } from '../../components/PayWidget/PayWidget';
import { IBasketGame } from '../../types/basketTypes';
import { useEffect } from 'react';
import { useClearAllBasketMutation, useGetBasketInfoQuery } from '../../api/basketApi';
import { Button } from '../../UI/Button/Button';

export const BasketPage = () => {
  // const { data: basketInfo } = useGetBasketInfoQuery('');
  // console.log(basketInfo);

  const {
    data: basketInfo,
    // status,
    refetch,
  } = useGetBasketInfoQuery('');
  const [clearAllBasket] = useClearAllBasketMutation();

  
  console.log(basketInfo);

  useEffect(() => {
    refetch();
  }, []);

  const basket = basketInfo?.basket;
  const basketGames = basket?.basket_games || [];
  const sortedGames = [...basketGames]?.sort((a, b) => b.id - a.id);

  const handleClearBasket = () => {
    clearAllBasket('');
  };

  return (
    <section className={style.section}>
      {/* {status === 'fulfilled' ? ( */}
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
          {sortedGames.length > 0 && (
            <div className={style.basket__buttonContainer}>
              <Button
                type={'button'}
                mode={'secondary'}
                isDisabled={false}
                onClick={handleClearBasket}>
                Очистить корзину
              </Button>
            </div>
          )}
        </div>
        <PayWidget />
      </div>
      {/* ) : (
        <Loader />
      )} */}
    </section>
  );
};
