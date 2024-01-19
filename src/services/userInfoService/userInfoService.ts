import { useEffect } from 'react';
import { useGetFavoriteInfoQuery } from '../../api/favoriteApi';
import { setBasket, setFavorites, setUser } from '../slices/user';
import { useAppDispatch, useAppSelector } from '../store';
import { useGetBasketInfoQuery } from '../../api/basketApi';
import { useAuthCheckQuery } from '../../api/authApi';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const useLoadUserInfo = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((store) => store.user?.isAuthenticated);

console.log('перерисовка хука');

const token = getCookie('accessToken')



const userData = useAuthCheckQuery('',   
{ skip: !token }
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

  console.log('грузит юзер дату');
  
}, [userData]);



  const favoritesInfo = useGetFavoriteInfoQuery('', { skip: !isAuthenticated });
  useEffect(() => {
    if (favoritesInfo?.data) {
      dispatch(setFavorites(favoritesInfo?.data?.favorites));
    }
    console.log('грузит избранное');

  }, [favoritesInfo]);




  const basketInfo = useGetBasketInfoQuery('', { skip: !isAuthenticated });
  useEffect(() => {
    if (basketInfo?.data) {
        console.log('вот тут точно грузит корзину баля');
        
      dispatch(setBasket(basketInfo?.data?.basket));
    }
    console.log('грузит корзину');

  }, [basketInfo]);







  const userEmail = useAppSelector((store) => store.user?.user?.email);

  
  useEffect(() => {
    if (userEmail) {
        userData.refetch()

      basketInfo.refetch()
      favoritesInfo.refetch()
    }

}, [userEmail])

};
