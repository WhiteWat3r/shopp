import { MouseEvent } from 'react';
import { Button } from '../../UI/Button/Button';
import style from './QuantitySelectorButton.module.scss';
import { IQuantitySelectorButtonProps } from './QuantitySelectorButtonTypes';

export const QuantitySelectorButton = ({
  countInBasket,
  linkToLoad,
  handleCartAction,
  game,
}: IQuantitySelectorButtonProps) => {
  return (
    <>
      {countInBasket > 0 ? (
        <div className={style.buyButton__doubleButton}>
          <Button
            onClick={(e: MouseEvent<HTMLInputElement, MouseEvent>) =>
              handleCartAction(game.id, false, e)
            }
            type={'button'}
            mode={'primary'}
            isDisabled={false}>
            -
          </Button>
          <span className={style.buyButton__count}>{countInBasket}</span>
          <Button
            onClick={(e: MouseEvent<HTMLInputElement, MouseEvent>) =>
              handleCartAction(game.id, true, e)
            }
            type={'button'}
            mode={'primary'}
            isDisabled={countInBasket > 2}>
            +
          </Button>
        </div>
      ) : (
        <Button
          onClick={
            !game.isFree
              ? (e: MouseEvent<HTMLInputElement, MouseEvent>) => handleCartAction(game.id, true, e)
              : linkToLoad
          }
          type={'button'}
          mode={'primary'}
          isDisabled={!game.availability}>
          {game.price === 0 || game.isFree
            ? 'Скачать'
            : game.availability
            ? 'Купить'
            : 'Нет в наличии'}
        </Button>
      )}
    </>
  );
};
