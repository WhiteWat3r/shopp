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
import { useAppDispatch } from './services/store';
import { gameApi } from './api/gameApi';
import { useEffect } from 'react';
import { setGames } from './services/slices/game';
import { Toaster } from 'react-hot-toast';
import { MainContent } from './components/MainContent/MainContent';
import { CatalogPage } from './Pages/CatalogPage/CatalogPage';
import Loader from './components/Loader/Loader';
import { AdminGameListPage } from './components/AdminGameListPage/AdminGameListPage';
import { AdminGamePage } from './Pages/AdminGamePage/AdminGamePage';
import { ProtectedAdminRouteElement } from './components/ProtectedAdminRouteElement/ProtectedAdminRouteElement';
import { useLoadUserInfo } from './services/userInfoService/userInfoService';

function App() {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const isUserOnAdminPage = location.pathname.startsWith('/admin');

  const cardsData = gameApi.useFetchAllCardsQuery('');


  useEffect(() => {
    dispatch(setGames(cardsData.data));
  }, [cardsData]);


  useLoadUserInfo()

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
