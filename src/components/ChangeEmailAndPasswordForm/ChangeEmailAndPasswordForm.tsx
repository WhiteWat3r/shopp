import { useForm } from 'react-hook-form';
import { Input } from '../../UI/Input/Input';
import style from './ChangeEmailAndPasswordForm.module.scss';
import { Button } from '../../UI/Button/Button';
import { IChangeEmailAndPasswordFormProps } from './ChangeEmailAndPasswordFormTypes';
import { useAppSelector } from '../../services/store';
import { useUpdateEmailMutation, useUpdatePasswordMutation } from '../../api/authApi';
import { useState } from 'react';

export const ChangeEmailAndPasswordForm = ({ type }: IChangeEmailAndPasswordFormProps) => {
  const user = useAppSelector((store) => store.user?.user);

  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const [updateEmail] = useUpdateEmailMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const onSubmit = async () => {
    setChangeError('');
    setChangeSuccess('');

    try {
      if (type === 'password') {
        const oldPassword = getValues('oldPassword');
        const newPassword = getValues('newPassword');

        const response: any = await updatePassword({
          oldPassword,
          newPassword,
        });

        if ('error' in response) {
          setChangeError(response.error.data.message);
        } else {
          setChangeSuccess(response.data.message);
        }
      } else {
        const newEmail = getValues('newEmail');
        const response: any = await updateEmail({ newEmail });

        if ('error' in response) {
          setChangeError(response.error.data.message);
        } else {
          setChangeSuccess(response.data.message);
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  //   console.log('changeError', changeError);

  //   console.log(getValues());
  //   console.log('errors', errors);

  return (
    <form className={style.changeForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={style.changeForm__header}>{type === 'password' ? 'Пароль' : 'Email'}</h2>

      {type === 'password' ? (
        <Input
          validation={{ ...register('oldPassword') }}
          placeholder={'Старый пароль'}
          mode={'profileInput'}
          type={'password'}
          id={'oldPassword'}
        />
      ) : (
        <span className={style.changeForm__currentEmail}>Текущий email: {user.email}</span>
      )}

      {type === 'password' ? (
        <>
          <Input
            validation={{ ...register('newPassword', { required: 'Введите пароль' }) }}
            placeholder={'Новый пароль'}
            mode={'profileInput'}
            type={'password'}
            id={'newPassword'}
          />

          <Input
            validation={{
              ...register('confirmationNewPassword', {
                required: 'Введите пароль',
                validate: (value) => value === watch('newPassword') || 'Пароли не совпадают',
              }),
            }}
            placeholder={'Подтверждение нового пароля'}
            mode={'profileInput'}
            type={'password'}
            id={'confirmationNewPassword'}
          />
        </>
      ) : (
        <>
          <Input
            validation={{ ...register('newEmail', { required: 'Введите email' }) }}
            placeholder={'Новый email'}
            mode={'profileInput'}
            type={'text'}
            id={'newEmail'}
          />

          <Input
            validation={{
              ...register('confirmationNewEmail', {
                required: 'Введите email',
                validate: (value) => value === watch('newEmail'),
              }),
            }}
            placeholder={'Подтверждение нового email'}
            mode={'profileInput'}
            type={'text'}
            id={'confirmationNewEmail'}
          />
        </>
      )}

      <div className={style.changeForm__buttonContainer}>
        <Button type={'submit'} mode="secondary" isDisabled={!isValid}>
          Сохранить
        </Button>
      </div>
      {errors.confirmationNewPassword && <p style={{ color: 'red' }}>Пароли не совпадают</p>}
      {errors.confirmationNewEmail && (
        <p style={{ color: 'red' }}>Адреса электронной почты не совпадают</p>
      )}
      {changeError && <p style={{ color: 'red' }}>{changeError}</p>}
      {changeSuccess && <p style={{ color: 'green' }}>{changeSuccess}</p>}
    </form>
  );
};
