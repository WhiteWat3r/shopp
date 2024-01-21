import style from './ProfilePage.module.scss';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileOrdersPage from '../ProfileOrdersPage/ProfileOrdersPage';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useAuthLogoutMutation } from '../../api/authApi';
import { deleteCookie } from '../../utils/cookie';
import { clearUser } from '../../services/slices/user';
import { FavoritesPage } from '../FavoritesPage/FavoritesPage';

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
          <div className={style.header}></div>
          <img
            src="http://i1.wp.com/media.gq-magazine.co.uk/photos/5d13a3982881ccd08d0a9199/master/pass/The-Mechanic-GQ-13Feb17_rex_b.jpg"
            alt=""
            className={style.image}
          />
          <h2 className={style.mail}>{user?.email}</h2>
          <nav className={style.navBlock}>
            <ul className={style.linkList}>
            <li>
                <NavLink to="/profile" className={style.link}>Инфо(in progress)</NavLink>
              </li>
              <li>
                <NavLink to="/profile/orders" className={style.link}>История заказов(in progress)</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link}>Партнерская программа(-)</NavLink>
              </li>

              <li>
                <NavLink to="/profile" className={style.link}>Обратная связь(-)</NavLink>
              </li>

              <li>
                <NavLink to="/profile/favorites" className={style.link} >Избранное</NavLink>
              </li>
              <li>
                <NavLink to="/basket" className={style.link} >Корзина</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={style.link} onClick={handleLogout}>Выход</NavLink>
              </li>
              {role === 'ADMIN' &&               <li>
                <NavLink to="/admin/games" className={style.link}>Админка</NavLink>
              </li>}
            </ul>
          </nav>
        </div>

        <>
          <Routes>
          {/* <Route path="/" element={<ProfileInfoPage />} /> */}

            <Route path="/orders" element={<ProfileOrdersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* <Route path="/settings" element={<ProfileOrdersPage />} /> */}
          </Routes>
        </>
  
    </section>
  );
}

export default ProfilePage;
