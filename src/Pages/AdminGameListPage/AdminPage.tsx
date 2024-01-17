import { Route, Routes } from 'react-router-dom';
import { AdminGamePage } from '../AdminGamePage/AdminGamePage';
import { AdminGameListPage } from '../../components/AdminGameListPage/AdminGameListPage';
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { refreshToken } from '../../utils/api';
import { AdminWrapper } from '../../components/AdminWrapper/AdminWrapper';

export const AdminPage = () => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(refreshToken());
  // }, [dispatch]);

  return (
    <>
      {/* <AdminHeader/> */}
      {/* <AdminWrapper>
        <Routes>
          <Route path="/games" element={<AdminGameListPage />} />
          <Route path="/game/:gameId" element={<AdminGamePage />} />
        </Routes>
      </AdminWrapper> */}
      <>sadsad</>
    </>
  );
};
