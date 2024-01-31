import { AiFillDelete } from 'react-icons/ai';
import style from './BasketItem.module.scss';
import { IBasketItem } from './BasketItemTypes';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';
import {
  useAddItemMutation,
  useDeleteItemMutation,
  useDeletePositionMutation,
} from '../../api/basketApi';
import { config } from '../../utils/config';

export const BasketItem = ({ basketGame }: IBasketItem) => {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [deletePosition] = useDeletePositionMutation();
  // console.log(basketGame);

  const game = basketGame.game;
  const gameId = game?.id;

  // console.log(basketItem);

  const handleAddToCart = async () => {
    await addItem({ gameId, quantity: 1 });
  };

  const handleDeleteFromCart = async () => {
    await deleteItem({ gameId, quantity: 1 });
  };

  const handleDeletePosition = async () => {
    await deletePosition({ gameId });
  };

  // const startPrice = 0;

  const priceWithoutDiscount = basketGame?.quantity * basketGame?.game?.price;

  const finishPrice = Math.round(
    priceWithoutDiscount - (priceWithoutDiscount * basketGame.game?.discount) / 100,
  );

  // console.log(finishPrice);
  // console.log(game);

  return (
    <li className={style.game}>
      {game && (
        <>
          {/* <Link to={`/game/${game.id}`} className={style.game__link}> */}
          <Link to={`/game/${game.id}`} className={style.game__imageContainer}>
            <img
              className={style.game__image}
              src={`${config.baseUrl}/${game.img}`}
              alt="Постер игры"
            />
            {/* <Link to="/activation/steam">
      <img
        className={style.game__activation}
        src="https://geekville.ru/wp-content/uploads/2018/10/steam_logo_art_2000.0.jpg"
        alt="Платформа активации"
      />
    </Link> */}
          </Link>
          <div className={style.game__info}>
            <h3 className={style.game__name}>{game.name}</h3>
            {/* <span className={style.game__categories}>{formatRussianGenres(game?.genres)}</span> */}
            {/* <span className={style.game__language}>{game?.language}</span> */}
            <span className={style.game__platform}>PC, {game.platform.name}</span>

            <span className={style.game__regions}>
              {/* Регионы активации: {formatRegionString(game?.regions)} */}
              Имеются региональные ограничения!
            </span>
          </div>

          <div className={style.game__quantity}>




            <button className={style.game__quantityBtn} onClick={handleDeleteFromCart} disabled={basketGame.quantity < 2}>
<FaMinus />
            </button>

            <p className={style.count}>{basketGame.quantity}</p>

            <button className={style.game__quantityBtn} onClick={handleAddToCart} disabled={basketGame.quantity > 2}>
              <FaPlus />
            </button>




          </div>
          <p className={style.game__startPrice}>{priceWithoutDiscount} ₽</p>

          <p className={style.game__price}>{finishPrice} ₽</p>
          <button className={style.game__deleteBtn} onClick={handleDeletePosition}>
            <AiFillDelete size={'auto'} />
          </button>
        </>
      )}
    </li>
  );
};
