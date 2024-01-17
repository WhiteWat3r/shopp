// import { addGamesFail, addGamesStart, addGamesSuccess } from '../services/actions/game';
// import { loginFailure, loginRequestStart, loginSuccess, logoutSuccess, refreshBasket, updateToken } from '../services/actions/user';
import { AppDispatch } from '../services/store';
import { setCookie } from './cookie';
import { authRequest, request } from './request';

// export const getGames = () => {
//   return (dispatch: AppDispatch) => {
//     dispatch(addGamesStart())
//     request('/game')
//       .then((data: any) => {
//         console.log(data);
//         dispatch(addGamesSuccess(data.rows))
//       })
//       .catch((err: any) => {
//         console.log(err);
//         dispatch(addGamesFail())
//       });
//   };
// };


export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    // dispatch(loginRequestStart())
    authRequest('/user/login', 'POST', {email, password})
      .then((data: any) => {
        console.log(data);
        // dispatch(loginSuccess(data.user))

        setCookie('accessToken', data.token);
      })
      .catch((error: any) => {
        console.log(error)
        // dispatch(loginFailure())
      });

  }
}



export const refreshToken = () => {
  return (dispatch: AppDispatch) => {
    authRequest('/user/auth', 'GET')
      .then((data: any) => {
        console.log(data);
        setCookie('accessToken', '', { expires: -1 });
        // dispatch(updateToken(data.user))
        setCookie('accessToken', data.token);
      })
      .catch((error: any) => {
        console.log(error)
      });

  }
}


export const logout = () => {
  return (dispatch: AppDispatch) => {
    authRequest('/user/logout', 'POST')
      .then(() => {
      
        setCookie('accessToken', '', { expires: -1 });
      
        // dispatch(logoutSuccess())
      })
      .catch((error: any) => {
        console.log(error)
      });

  }
}


export const addGameToCart = (gameId: number) => {
  return (dispatch: AppDispatch) => {
    authRequest('/cart/add-to-cart', 'POST', {gameId, quantity : 1})
    .then((res: any) => {
      // console.log(res);
      // dispatch(refreshBasket(res.basket))
    })
    .catch((error: any) => {
      console.log(error)
    });
  }
}