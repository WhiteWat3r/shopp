import { useState } from 'react';
import style from './LoginPage.module.scss';
import Input from '@mui/joy/Input';
import { login } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  // console.log(email);
  // console.log(password);
  const navigate = useNavigate();

  const onClick = (e: any) => {
    e.preventDefault();

    try {
      dispatch(login(email, password));

      navigate('/profile', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.section}>
      <form className={style.login}>
        <div className={style.headerDiv}>
          <h1 className={style.header}>Вход</h1>
        </div>
        <Input autoComplete='true' color="neutral" disabled={false} size="lg" variant="soft" placeholder='Почта' className={style.input} onChange={(e) => setEmail(e.target.value)}/>
        <Input autoComplete='on' color="neutral" size="lg" variant="soft" placeholder='Пароль' className={style.input} onChange={(e) => setPassword(e.target.value)}/>
        <div className={style.submitBlock}>
          <button type="submit" className={style.formButton} onClick={onClick}>
            Войти
          </button>
          <a className={style.forgotPassword}>Забыли пароль?</a>
        </div>
      </form>
      <a className={style.registration}>Зарегистрироваться</a>
    </section>
  );
}

export default LoginPage;
