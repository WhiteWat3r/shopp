import style from './ProfilePage.module.scss';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileOrdersPage from '../ProfileOrdersPage/ProfileOrdersPage';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useAuthLogoutMutation } from '../../api/authApi';
import { deleteCookie } from '../../utils/cookie';
import { clearUser } from '../../services/slices/user';
import { FavoritesPage } from '../FavoritesPage/FavoritesPage';
import { profileMenu } from '../../utils/constants';
import { Button } from '../../UI/Button/Button';
import { ProfileInfoPage } from '../ProfileInfoPage/ProfileInfoPage';
import { FaPencilAlt } from 'react-icons/fa';
import { config } from '../../utils/config';
import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';
import { SupportPage } from '../SupportPage/SupportPage';

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

  const [logout] = useAuthLogoutMutation();

  const user = useAppSelector((store) => store.user.user);

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
  }
  // console.log(user?.orders);

  const handleLogout = async () => {
    try {
      await logout('');
      deleteCookie('accessToken');
      dispatch(clearUser());
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const tooglePopup = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={style.page}>
      <h1 className={style.page__header}>Личный кабинет</h1>
      <div className={style.page__container}>
        <div className={style.profile}>
          <span className={style.profile__header} />

          <div className={style.profile__imageContainer}>
            <img
              className={style.profile__image}
              src={
                user?.photo
                  ? `${config.baseUrl}/${user?.photo}`
                  : 'http://i1.wp.com/media.gq-magazine.co.uk/photos/5d13a3982881ccd08d0a9199/master/pass/The-Mechanic-GQ-13Feb17_rex_b.jpg'
              }
              alt="Аватар"
            />
            <Link to={'/profile/info'} className={style.profile__avatarOverlay}>
              <FaPencilAlt size={40} className={style.profile__pencil} />
            </Link>
          </div>

          <h2 className={style.profile__mail}>{user?.nickname ? user?.nickname : user?.email}</h2>
          <nav className={style.profile__navBlock}>
            <ul className={style.profile__linkList}>
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
                  <NavLink
                    to={'/admin/games'}
                    className={({ isActive }) =>
                      isActive
                        ? `${style.profile__link} ${style.profile__link_active}`
                        : style.profile__link
                    }>
                    Админ
                  </NavLink>
                </li>
              )}
            </ul>
            <div className={style.profile__buttonConatainer}>
              <Button type={'button'} mode={'secondary'} isDisabled={false} onClick={tooglePopup}>
                Выход
              </Button>
            </div>
          </nav>
        </div>

        <>
          <Routes>
            <Route path="/settings" element={<ProfileInfoPage />} />
            <Route path="/orders" element={<ProfileOrdersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </>

        {isModalOpen && (
          <Modal
            header={'Выход'}
            text={'Вы уверены, что хотите выйти?'}
            handleClose={tooglePopup}
            handleConfirm={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
