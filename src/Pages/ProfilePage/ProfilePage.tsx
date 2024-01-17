import style from './ProfilePage.module.scss';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileOrdersPage from '../ProfileOrdersPage/ProfileOrdersPage';
import { logout } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useAuthLogoutMutation } from '../../utils/authApi';
import { deleteCookie } from '../../utils/cookie';
import { clearUser } from '../../services/slices/user';

function ProfilePage() {

const navigate = useNavigate()

const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((store)=> store.user.isAuthenticated)

  const [logout] = useAuthLogoutMutation()

  const user = useAppSelector((store)=> store.user.user)

  let role
  if (user) {
    role = user.role
  }
  if (!isAuthenticated) {
    navigate('/login', { replace: true });
  }


  const handleLogout = async () => {
    try {
      await logout('')
      deleteCookie('accessToken');
      dispatch(clearUser())
    } catch (err) {
      console.log(err);
        }

        console.log('Страница профиля');


  }
  return (
    <section className={style.section}>
      <div className={style.profile}>
        <div className={style.card}>
          <div className={style.header}></div>
          <img
            src="https://uhd.name/uploads/posts/2022-08/1661178261_25-uhd-name-p-dzheison-stetkhem-v-kepke-oboi-37.jpg"
            alt=""
            className={style.image}
          />
          <h2 className={style.mail}>{user?.email}</h2>
          <nav className={style.navBlock}>
            <ul className={style.linkList}>
              {role === 'ADMIN' &&               <li>
                <NavLink to="/admin" className={style.link}>Админка</NavLink>
              </li>}
              <li>
                <NavLink to="/profile" className={style.link}>История заказов</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link}>Партнерская программа</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link}>Желаемое</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link}>Настройки</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link}>Обратная связь</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link} onClick={handleLogout}>Выход</NavLink>
              </li>
              <li>
                <NavLink to="/basket" className={style.link} >Корзина</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.mainContent}>
          <Routes>
            <Route path="/" element={<ProfileOrdersPage />} />
            {/* <Route path="/settings" element={<ProfileOrdersPage />} /> */}
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
