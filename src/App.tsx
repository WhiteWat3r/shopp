import { Route, Routes, ScrollRestoration, useLocation } from 'react-router-dom';
import './App.css';
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
import { gameApi } from './utils/gameApi';
import { useEffect } from 'react';
import { setGames } from './services/slices/game';
import { refreshToken } from './utils/api';
import { Toaster } from 'react-hot-toast';
import { AdminWrapper } from './components/AdminWrapper/AdminWrapper';
import { MainContent } from './components/MainContent/MainContent';

function App() {
  const location = useLocation();
  const isUserOnAdminPage = location.pathname.startsWith('/admin');

  // console.log(location.pathname);
  // console.log(isUserOnAdminPage);

  const dispatch = useAppDispatch();

  const { data: cardsData, error } = gameApi.useFetchAllCardsQuery('');
  console.log(cardsData);

  useEffect(() => {
    dispatch(setGames(cardsData));
  }, [cardsData]);

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <>
      {isUserOnAdminPage ? <AdminHeader /> : <Header />}
      <MainContent>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<ProtectedRouteElement anonymous element={<LoginPage />} />}
        />
        <Route path="/profile/*" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="*" element={<NotFoundPage />} />
      
        {/* Административные страницы */}
        <Route
          path="/admin/*"
          element={
            <AdminWrapper>
              <AdminPage />
            </AdminWrapper>
          }
        />
        
      </Routes>
            </MainContent>

      <Toaster />
    </>
  );
}

export default App;
