import { useNavigate } from 'react-router-dom';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../../api/favoriteApi';

interface IFavoriteActions {
  toggleLike: (gameId: number) => Promise<void>;
}

export const useFavoriteActions = (
  isAuthenticated: boolean,
  isFavorite: boolean,
): IFavoriteActions => {
  const navigate = useNavigate();

  const [addToFavorite] = useAddFavoriteMutation();
  const [removeFromFavorite] = useDeleteFavoriteMutation();

  const toggleLike = async (gameId: number) => {
    try {
      if (isAuthenticated) {
        isFavorite ? await removeFromFavorite({ gameId }) : addToFavorite({ gameId });
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { toggleLike };
};
