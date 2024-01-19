import { CiHeart } from 'react-icons/ci';
import { LikeButton } from '../../UI/LikeButton/LikeButton';
import style from './SlideInfo.module.scss';
import { Button } from '../../UI/Button/Button';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { ISlideInfo } from './SlideInfoTypes';
import { useAppSelector } from '../../services/store';
import { useAddItemMutation } from '../../api/basketApi';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../../api/favoriteApi';
import { FaHeart } from 'react-icons/fa';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

export const SlideInfo = ({ slideInfo }: ISlideInfo) => {

  const [addItem] = useAddItemMutation();
  const [addToFavorite] = useAddFavoriteMutation();
  const [removeFromFavorite] = useDeleteFavoriteMutation();

  const handleAddToCart = async () => {
    await addItem({ gameId: slideInfo.id, quantity: 1 });
  };


  const isFavorite = useAppSelector((store) =>
    store.user?.favorites?.games?.find((favorite) => favorite.id === slideInfo.id),
  );
  const toggleLike = async () => {
    isFavorite ? await removeFromFavorite({ gameId:slideInfo.id  }) : await addToFavorite({ gameId: slideInfo.id});
  };

  return (
    <div className={style.info}>
      <h2 className={style.info__header}>{slideInfo.name}</h2>

      <p className={style.info__description}>{slideInfo.info}</p>

      <p className={style.info__genres}>{formatRussianGenres(slideInfo.genres)}</p>

      <div className={style.info__buttons}>
        <div className={style.info__likeButtonContainer}>
        <LikeButton
                    onClick={toggleLike}
                    type={'button'}
                    active={isFavorite}
                    isDisabled={false}>
                    {isFavorite ? <IoMdHeart  size={`100%`} /> : <IoIosHeartEmpty  size={`100%`} />}
                  </LikeButton>
        </div>
{/* 
        <div className={style.info__buttonContainer}>
          <Button onClick={handleAddToCart} type={'button'} mode={'primary'} isDisabled={false}>
            Купить
          </Button>
        </div> */}
      </div>
    </div>
  );
};
