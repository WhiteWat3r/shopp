import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { MainContent } from './components/MainContent/MainContent';
import HomePage from './Pages/HomePage/HomePage';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import GamePage from './Pages/GamePage/GamePage';
import BasketPage from './Pages/BasketPage/BasketPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import { AdminPage } from './Pages/AdminPage/AdminPage';
import { AdminHeader } from './components/AdminHeader/AdminHeader';
import { useAppDispatch } from './services/store';
import { gameApi } from './utils/gameApi';
import { useEffect } from 'react';
import { setGames } from './services/slices/game';
import { refreshToken } from './utils/api';
import { ToastContainer } from 'react-toastify';

function App() {

  const location = useLocation();
  const isUserOnAdminPage = location.pathname.startsWith('/admin');

  console.log(location.pathname);
  console.log(isUserOnAdminPage);


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
      {isUserOnAdminPage ?  <AdminHeader/> :<Header />}
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
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainContent>
      <ToastContainer position="bottom-left" autoClose={5000} />

    </>
  );
}

export default App;
