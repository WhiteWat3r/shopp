import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import style from './PayForm.module.scss';
import { useAppSelector } from '../../services/store';
import { finishPrice } from '../../utils/finishPrice';

interface PayForm {
  name: string;
  number: number;
  expiration: Date;
  cvv: number;
}

export const PayForm = () => {
  const basketGames = useAppSelector((store) => store.user.user.basket?.basket_games);

  console.log(basketGames);

  const priceWithoutSale = basketGames?.reduce((acc, item) => {
    return acc + item.quantity * item.game.price;
  }, 0);

  const resultPrice = basketGames?.reduce((acc, item) => {
    return acc + item.quantity * finishPrice(item.game.price, item.game.discount);
  }, 0);

  const saleCount = basketGames?.reduce((acc, item) => {
    return (
      acc + item.quantity * (item.game.price - finishPrice(item.game.price, item.game.discount))
    );
  }, 0);

  // console.log(priceWithoutSale);
  // console.log(resultPrice);

  const { register, handleSubmit } = useForm<PayForm>({
    defaultValues: {},
  });

  const submit: SubmitHandler<PayForm> = (data) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<PayForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit, error)} className={style.payForm}>
      <input
        type="text"
        placeholder="Имя держателя карты"
        className={`${style.payForm__input} + ${style.payForm__holderName}`}
        // onChange={(e) => setCardHolderName(e.target.value)}
        {...register('name', { required: true })}
      />

      <input
        type="text"
        placeholder="Номер карты"
        className={`${style.payForm__input} + ${style.payForm__number}`}
        // onChange={(e) => setCardNumber(e.target.value)}
        {...register('number', { required: true })}
      />

      <div className={style.payForm__info}>
        <input
          type="text"
          placeholder="Срок"
          className={`${style.payForm__input} + ${style.payForm__expiration}`}
          // onChange={(e) => setCardExpiration(e.target.value)}
          {...register('expiration', { required: true })}
        />
        <input
          type="text"
          placeholder="CVV"
          className={`${style.payForm__input} + ${style.payForm__cvv}`}
          // onChange={(e) => setCardCvv(e.target.value)}
          {...register('cvv', { required: true })}
        />
      </div>
      <div className={style.payForm__result}>
        <p>Промежуточный итог:</p> <p>{priceWithoutSale}</p>
      </div>

      <div className={style.payForm__result}>
        <p>Скидка:</p> <p>{saleCount}</p>
      </div>
      <div className={style.payForm__result}>
        <p>Комиссия:</p> <p>0</p>
      </div>
      <div className={style.payForm__result}>
        <p>Итог:</p> <p>{resultPrice}</p>
      </div>

      <button type="submit" className={style.submitButton}>
        Оплатить
      </button>
    </form>
  );
};
