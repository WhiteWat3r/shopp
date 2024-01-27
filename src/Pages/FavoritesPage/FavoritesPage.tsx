import { FavoriteCard } from '../../components/FavoriteCard/FavoriteCard';
import { useAppSelector } from '../../services/store';
import style from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favorites = useAppSelector((store) => store.user?.favorites?.games);

  return (
    <ul className={style.favorites}>
      {favorites?.map((game) => (
        <FavoriteCard game={game} key={game.id} />
      ))}
    </ul>
  );
};
