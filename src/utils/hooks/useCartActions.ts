import { MouseEvent } from 'react';
import { useAddItemMutation, useDeleteItemMutation } from '../../api/basketApi';
import { useNavigate } from 'react-router-dom';

export interface IhandleCartAction {
  (gameId: number, isAdd: boolean, e?: MouseEvent<HTMLInputElement, MouseEvent>): Promise<void>
}

interface ICartActions {
  handleCartAction: IhandleCartAction;
}

export const useCartActions = (isAuthenticated: boolean): ICartActions => {
  const [addItem] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const navigate = useNavigate();

  const handleCartAction = async (gameId: number, isAdd: boolean, e?: MouseEvent<HTMLInputElement, MouseEvent>) => {
    e && e.preventDefault();
    try {
      if (isAuthenticated) {
        isAdd ? await addItem({ gameId }) : deleteItem({ gameId });
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleCartAction };
};
