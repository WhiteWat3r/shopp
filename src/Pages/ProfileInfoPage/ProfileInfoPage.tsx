import { useForm } from 'react-hook-form';
import { Input } from '../../UI/Input/Input';
import { useAppSelector } from '../../services/store';
import style from './ProfileInfoPage.module.scss';
import { config } from '../../utils/config';
import { useEffect } from 'react';
import { Button } from '../../UI/Button/Button';
import { useUpdateUserInfoMutation } from '../../api/authApi';

export const ProfileInfoPage = () => {
  const user = useAppSelector((store) => store.user?.user);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const { register, setValue, watch, getValues, handleSubmit } = useForm();

  // console.log(user);
  useEffect(() => {
    if (user?.nickname) {
      setValue('nickname', user.nickname);
    }
    if (user?.photo) {
      setValue('photo', `${config.baseUrl}/${user?.photo}`);
    } else {
      setValue(
        'photo',
        'http://i1.wp.com/media.gq-magazine.co.uk/photos/5d13a3982881ccd08d0a9199/master/pass/The-Mechanic-GQ-13Feb17_rex_b.jpg',
      );
    }
  }, [user]);

  const photo = watch('photo');

  const setAvatar = () => {
    const newAvatar = getValues('newAvatar');
    setValue('photo', newAvatar);
  };

  const onSubmit = () => {
    let photo = getValues('newAvatar');
    let nickname = getValues('nickname');
    console.log('photo', photo);
    console.log('nickname', nickname);
    const response = updateUserInfo({ nickname, photo });
    console.log(response);
  };

  return (
    <div className={style.info}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.info__form}>
        <div className={style.info__block}>
        <div className={style.info__avatarBlock}>
          <div className={style.info__imageContainer}>
            <img className={style.info__img} src={photo} alt="Аватар" />
          </div>

          <div>
            <Input
              type={'text'}
              mode={'primary'}
              id={'photo'}
              labelText={'Ссылка на фотографию'}
              validation={{ ...register('newAvatar') }}
            />

            <div className={style.info__buttonContainer}>
              <Button type={'button'} mode="primary" isDisabled={false} onClick={setAvatar}>
                Выбрать
              </Button>
            </div>
          </div>
          

        </div>
        <Input
            type={'text'}
            mode={'primary'}
            id={'nickname'}
            validation={{ ...register('nickname') }}
            labelText={'Никнейм'}
          />
</div>
        <div className={style.info__submitButtonContainer}>
          <Button type={'submit'} mode="secondary" isDisabled={false}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
