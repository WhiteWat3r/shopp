import { timeFormat } from '../../utils/formatAndCheckDate';
import style from './Order.module.scss';
import { IOrderProps } from './OrderTypes';
import { GrGamepad } from 'react-icons/gr';
import { IOrderGame } from '../../types/gameTypes';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbListDetails } from 'react-icons/tb';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

export const Order = ({ order }: IOrderProps) => {
  console.log('order', order);

  const { russianDate, time } = timeFormat(order?.orderDate);

  const countGamesInOrder = order?.order_basket_games?.reduce(
    (summ: number, item: IOrderGame) => summ + item.quantity,
    0,
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  console.log(countGamesInOrder);

  const namesGames = order?.order_basket_games?.map((game: IOrderGame) => game?.game?.name);

  console.log(isDetailsOpen);

  return (
    <li className={style.order}>
      <div className={style.order__main}>
        <div>
          <p className={style.order__number}>№{order.id}</p>

          <IoMdCheckmarkCircle className={style.order__checkMark} />
        </div>

        <h3 className={style.order__name}>{namesGames.join(', ')}</h3>

        <p className={style.order__date}>
          {russianDate} {time}
        </p>
        <span className={style.order__countGames}>
          {countGamesInOrder}

          <GrGamepad className={style.order__gamePad} />
        </span>

        <p className={style.order__price}>{order?.totalAmount} ₽</p>

        <button
          className={style.order__detailsButton}
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
          {isDetailsOpen ? <IoClose size={30} /> : <TbListDetails size={30} />}
        </button>
      </div>
      {isDetailsOpen && (
        <div className={style.order__details}>
          <ul className={style.order__info}>
            {order?.order_basket_games?.map((game: IOrderGame) => (
              <li className={style.order__game} key={game.game.id}>
                <Link className={style.order__link} to={`/game/${game.game.id}`}>
                  {game?.game?.name} {game?.quantity > 1 && `(${game?.quantity}):`}
                </Link>

                <div className={style.order__keys}>
                  {game?.gameKeys?.map((key) => (
                    <span className={style.order__key}>{key.key}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
