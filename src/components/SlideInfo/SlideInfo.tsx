import { CiHeart } from 'react-icons/ci';
import { LikeButton } from '../../UI/LikeButton/LikeButton';
import style from './SlideInfo.module.scss';
import { Button } from '../../UI/Button/Button';
import { formatRussianGenres } from '../../utils/fornatGenres';
import { ISlideInfo } from './SlideInfoTypes';

export const SlideInfo = ({ slideInfo }: ISlideInfo) => {
  const handleAddToCart = () => {};

  return (
    <div className={style.info}>
      <h2 className={style.info__header}>{slideInfo.name}</h2>

      <p className={style.info__description}>{slideInfo.info}</p>

      <p className={style.info__genres}>{formatRussianGenres(slideInfo.genres)}</p>

      <div className={style.info__buttons}>
        <div className={style.info__likeButtonContainer}>
          <LikeButton onClick={handleAddToCart} type={'button'} active={false} isDisabled={false}>
          <CiHeart size={'100%'} />
          </LikeButton>
        </div>

        <div className={style.info__buttonContainer}>
          <Button onClick={handleAddToCart} type={'button'} mode={'primary'} isDisabled={false}>
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
};
