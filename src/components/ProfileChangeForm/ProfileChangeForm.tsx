import { useForm } from 'react-hook-form';
import { useUpdateUserInfoMutation } from '../../api/authApi';
import { useAppSelector } from '../../services/store';
import style from './ProfileChangeForm.module.scss';
import { useEffect } from 'react';
import { Button } from '../../UI/Button/Button';
import { Input } from '../../UI/Input/Input';
import { config } from '../../utils/config';

export const ProfileChangeForm = () => {
  const user = useAppSelector((store) => store.user?.user);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const { register, setValue, watch, getValues, handleSubmit } = useForm();

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
    const response = updateUserInfo({ nickname, photo });
    console.log(response);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.profileForm}>
      <h2 className={style.profileForm__header}>Профиль</h2>
      <div className={style.profileForm__avatarBlock}>
        <div className={style.profileForm__imageContainer}>
          <img className={style.profileForm__img} src={photo} alt="Аватар" />
        </div>
        <Input
          type={'text'}
          mode={'profileInput'}
          id={'photo'}
          labelText={'Изменить фото'}
          validation={{ ...register('newAvatar') }}
          placeholder={'Ссылка на фотографию'}
        />

        <div className={style.profileForm__buttonContainer}>
          <Button type={'button'} mode="primary" isDisabled={false} onClick={setAvatar}>
            Выбрать
          </Button>
        </div>
      </div>
      <Input
        type={'text'}
        mode={'profileInput'}
        id={'nickname'}
        validation={{ ...register('nickname') }}
        labelText={'Изменить никнейм'}
        placeholder={'Никнейм'}
      />
      <div className={style.profileForm__submitButtonContainer}>
        <Button type={'submit'} mode="secondary" isDisabled={false}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
