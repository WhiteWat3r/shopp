import { useState } from 'react';
import style from './LoginPage.module.scss';
import Input from '@mui/joy/Input';
// import { login } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { useAuthLoginMutation, useAuthRegisterMutation } from '../../api/authApi';
import { setCookie } from '../../utils/cookie';
import { setUser } from '../../services/slices/user';

function LoginPage() {
  const [isRegistrationPage, setIsRegistrationPage] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useAuthLoginMutation();
  const [registration] = useAuthRegisterMutation();

  const dispatch = useAppDispatch();
  // console.log(email);
  // console.log(password);
  const navigate = useNavigate();

  const onClick = async (e: any) => {
    e.preventDefault();
    try {
      if (!isRegistrationPage) {
        const { data } = await login({ email, password });
        console.log(data);
        setCookie('accessToken', data.token, { path: '/' });
        dispatch(setUser(data.user));
      } else {
        const { data } = await registration({ email, password });
        console.log(data);
        setCookie('accessToken', data.token, { path: '/' });
        dispatch(setUser(data.user));
      }

      navigate('/profile', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.section}>
      <form className={style.login}>
        <div className={style.headerDiv}>
          <h1 className={style.header}>{isRegistrationPage ? 'Регистрация' : 'Вход'}</h1>
        </div>
        <Input
          autoComplete="true"
          color="neutral"
          disabled={false}
          size="lg"
          variant="soft"
          placeholder="Почта"
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          autoComplete="on"
          color="neutral"
          size="lg"
          variant="soft"
          placeholder="Пароль"
          className={style.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={style.submitBlock}>
          <button type="submit" className={style.formButton} onClick={onClick}>
            {isRegistrationPage ? 'Зарегистрироваться' : 'Войти'}
          </button>
          <button
            type="button"
            className={style.forgotPassword}
            >
            Забыли пароль?
          </button>
        </div>
      </form>
      <button type='button' onClick={() => setIsRegistrationPage(!isRegistrationPage)} className={style.registration}> {isRegistrationPage ? 'Войти' : 'Зарегистрироваться'}</button>
    </section>
  );
}

export default LoginPage;
