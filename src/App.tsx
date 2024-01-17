import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import GamePage from './Pages/GamePage/GamePage';
import BasketPage from './Pages/BasketPage/BasketPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import { AdminPage } from './Pages/AdminGameListPage/AdminPage';
import { AdminHeader } from './components/AdminHeader/AdminHeader';
import { useAppDispatch, useAppSelector } from './services/store';
import { gameApi } from './utils/gameApi';
import { useEffect } from 'react';
import { setGames } from './services/slices/game';
import { Toaster } from 'react-hot-toast';
import { MainContent } from './components/MainContent/MainContent';
import { CatalogPage } from './Pages/CatalogPage/CatalogPage';
import Loader from './components/Loader/Loader';
import { useAuthCheckQuery } from './utils/authApi';
import { deleteCookie, getCookie, setCookie } from './utils/cookie';
import { clearUser, setBasket, setUser } from './services/slices/user';
import { AdminGameListPage } from './components/AdminGameListPage/AdminGameListPage';
import { AdminGamePage } from './Pages/AdminGamePage/AdminGamePage';
import { ProtectedAdminRouteElement } from './components/ProtectedAdminRouteElement/ProtectedAdminRouteElement';
import { useGetBasketInfoQuery } from './utils/basketApi';

function App() {
  const dispatch = useAppDispatch();


  const isAuthenticated = useAppSelector(store => store.user?.isAuthenticated)

  const  basketInfo  = useGetBasketInfoQuery('', {skip: !isAuthenticated});

  // basketInfo.basket - сохарянем в user/basket
  console.log('basketInfo в app', basketInfo);
  
  const userEmail = useAppSelector(store => store.user?.user?.email)



  useEffect(() => {



    if (basketInfo?.data) {
      dispatch(setBasket(basketInfo?.data?.basket))
    }

  }, [basketInfo])









  const location = useLocation();
  const isUserOnAdminPage = location.pathname.startsWith('/admin');


  const cardsData = gameApi.useFetchAllCardsQuery('');

  const token = getCookie('accessToken');
  // console.log('ТОКЕН', token);

  const userData = useAuthCheckQuery('', 
  // { skip: !token }
  );

  console.log('userData', userData);

  useEffect(() => {
    dispatch(setGames(cardsData.data));
  }, [cardsData]);





  useEffect(() => {
    if (userEmail) {
      basketInfo.refetch()
      cardsData.refetch()

    }


}, [userEmail])





  useEffect(() => {
    const updateUserAndToken = () => {
      if (userData.isSuccess) {
        // console.log('ЕСТЬ ЮЗЕР ДАТА, УДАЛЯЕТСЯ СТАРЫЙ ТОКЕН');
        // console.log(getCookie('accessToken'));

        deleteCookie('accessToken');

        if (userData.data && userData.data.user && userData.data.token) {

          dispatch(setUser(userData.data.user));
          // console.log('ЕСТЬ ЮЗЕР ДАТА, ДОБАВЛЯЕТСЯ НОВЫЙ ТОКЕН');
          setCookie('accessToken', userData.data.token, { path: '/' });
          // console.log(getCookie('accessToken'));
        }
      }
    };
    // console.log(document.cookie);

    // deleteCookie('accessToken');
    // console.log(document.cookie);

    updateUserAndToken();
  }, [userData]);

  // console.log(cardsData.data);

  return (
    <>
      {cardsData?.data ? (
        <>
          {isUserOnAdminPage ? <AdminHeader /> : <Header />}
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<ProtectedRouteElement anonymous element={<LoginPage />} />}
              />
              <Route
                path="/profile/*"
                element={<ProtectedRouteElement element={<ProfilePage />} />}
              />
              <Route path="/game/:gameId" element={<GamePage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/catalog" element={<CatalogPage />} />

              <Route path="*" element={<NotFoundPage />} />

              {/* Административные страницы */}
              <Route path="/admin/*" element={<ProtectedAdminRouteElement element={<Outlet />} />}>
                <Route index element={<AdminPage />} />
                <Route path="games" element={<AdminGameListPage />} />
                <Route path="game/:gameId" element={<AdminGamePage />} />
              </Route>
            </Routes>
          </MainContent>

          <Toaster />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
