import style from './ProfilePage.module.scss';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileOrdersPage from '../ProfileOrdersPage/ProfileOrdersPage';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useAuthLogoutMutation } from '../../api/authApi';
import { deleteCookie } from '../../utils/cookie';
import { clearUser } from '../../services/slices/user';
import { FavoritesPage } from '../FavoritesPage/FavoritesPage';
import { profileMenu } from '../../utils/constants';
import { Button } from '../../UI/Button/Button';

function ProfilePage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

  const [logout] = useAuthLogoutMutation();

  const user = useAppSelector((store) => store.user.user);

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
  }

  const handleLogout = async () => {
    try {
      await logout('');
      deleteCookie('accessToken');
      dispatch(clearUser());
    } catch (err) {
      console.log(err);
    }
  };
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
            {profileMenu.map((link) => (
              <li key={link.id} className={style.profile__item}>
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.profile__link} ${style.profile__link_active}`
                      : style.profile__link
                  }>
                  {link.text}
                </NavLink>
              </li>
            ))}

            {user?.role === 'ADMIN' && (
              <li>
                <NavLink to="/admin/games" className={style.link}>
                  Админка
                </NavLink>
              </li>
            )}
          </ul>
          <div className={style.profile__buttonConatainer}>
            <Button type={'button'} mode={'secondary'} isDisabled={false} onClick={handleLogout}>
              Выход
            </Button>
          </div>
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
