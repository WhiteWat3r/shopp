import { useEffect } from 'react';
import { useGetFavoriteInfoQuery } from '../../api/favoriteApi';
import { clearUser, setBasket, setFavorites, setUser } from '../slices/user';
import { useAppDispatch, useAppSelector } from '../store';
import { useGetBasketInfoQuery } from '../../api/basketApi';
import { useAuthCheckQuery } from '../../api/authApi';
import {
  deleteCookie,
  getCookie,
  // getCookie,
  setCookie,
} from '../../utils/cookie';

export const useLoadUserInfo = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((store) => store.user?.isAuthenticated);

  // console.log('рендер');

  // const token = getCookie('accessToken');

  const userData = useAuthCheckQuery('', 
  // { skip: !token }
  );
  useEffect(() => {
    const updateUserAndToken = () => {
      if (userData.isSuccess) {
        deleteCookie('accessToken');
        if (userData.data && userData.data.user && userData.data.token) {
          dispatch(setUser(userData.data.user));
          setCookie('accessToken', userData.data.token, { path: '/' });
        }
      }
    };
    updateUserAndToken();
  }, [userData]);

  const favoritesInfo = useGetFavoriteInfoQuery('', { skip: !isAuthenticated });

  useEffect(() => {
    console.log(favoritesInfo?.data);

    if (favoritesInfo?.data) {
      dispatch(setFavorites(favoritesInfo?.data?.favorites));
    }
  }, [favoritesInfo]);

  const basketInfo = useGetBasketInfoQuery('', { skip: !isAuthenticated });
  useEffect(() => {
    if (basketInfo?.data) {
      dispatch(setBasket(basketInfo?.data?.basket));
    }
  }, [basketInfo]);

  const userEmail = useAppSelector((store) => store.user?.user?.email);

  useEffect(() => {
    if (isAuthenticated) {
      userData.refetch();
      basketInfo.refetch();
      favoritesInfo.refetch();
    } else {
      dispatch(clearUser());
    }
  }, [userEmail]);
};
