import { useState } from 'react';
import style from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { useAuthLoginMutation, useAuthRegisterMutation } from '../../api/authApi';
import { setCookie } from '../../utils/cookie';
import { setUser } from '../../services/slices/user';
import { Button } from '../../UI/Button/Button';
import { Input } from '../../UI/Input/Input';
import { useForm } from 'react-hook-form';

type AuthForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const [isRegistrationPage, setIsRegistrationPage] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const [login] = useAuthLoginMutation();
  const [registration] = useAuthRegisterMutation();

  const [erorAuth, setErrorAuth] = useState<any>('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // getValues,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<AuthForm>({
    mode: 'onBlur',
  });

  const loginData = watch();
  // console.log(loginData);

  const onSubmit = async (
    // data: AuthForm
    ) => {
    // console.log(data);

    // console.log(loginData);

    try {
      let response;

      if (!isRegistrationPage) {
        response = await login(loginData);
      } else {
        response = await registration(loginData);
      }

      if ('data' in response && response.data) {
        // console.log(response.data);
        setCookie('accessToken', response.data.token, { path: '/' });
        dispatch(setUser(response.data.user));
        navigate('/profile', { replace: true });
      } else {
        setErrorAuth(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(errors);
  // console.log('erorAuth', erorAuth);

  return (
    <section className={style.section}>
      <form className={style.login} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.login__header}>
          <h1 className={style.login__name}>{isRegistrationPage ? 'Регистрация' : 'Вход'}</h1>
        </div>

        <Input
          type={'text'}
          validation={{
            ...register('email', { required: 'Это обязательноe поле', pattern: /^\S+@\S+$/i }),
          }}
          mode={'primary'}
          id={'email'}
        />

        <p className={style.login__danger}>
          {errors.email?.type === 'pattern' ? 'Неверный формат почты' : errors.email?.message}
        </p>

        <Input
          type={passwordShown ? 'text' : 'password'}
          validation={{ ...register('password', { required: 'Это обязательноe поле' }) }}
          mode={'primary'}
          id={'password'}
          visible={passwordShown}
          onButtonClick={() => setPasswordShown(!passwordShown)}
        />
        <p className={style.login__danger}>{errors.password?.message}</p>

        <div className={style.login__buttons}>
          <div className={style.login__buttonContainer}>
            <Button
              mode={'primary'}
              type={'submit'}
              isDisabled={!isValid}
              onClick={() => setErrorAuth('')}>
              {isRegistrationPage ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </div>
          <Link to={'/'} className={style.login__link}>
            Забыли пароль?
          </Link>
        </div>
        <p className={style.login__danger}>
          {erorAuth?.error?.data?.message === 'Пользователь не найден' &&
            'Неверные почта или пароль'}
        </p>
      </form>
      <Link
        to={'/login'}
        onClick={() => {
          setIsRegistrationPage(!isRegistrationPage);
          setValue('email', '');
          setValue('password', '');
          clearErrors(['email', 'password']);
        }}
        className={style.login__link}>
        {isRegistrationPage
          ? 'Уже зарегистрированы? Войти'
          : 'Еще нет аккаунта? Зарегистрироваться'}
      </Link>
    </section>
  );
}

export default LoginPage;
