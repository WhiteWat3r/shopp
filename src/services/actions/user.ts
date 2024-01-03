export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const REFRESH_BASKET = 'REFRESH_BASKET'



export const loginRequestStart = () => {
  return {
    type: AUTH_REQUEST,
  };
};

export const loginSuccess = (userData: any) => {
  return {
    type: AUTH_SUCCESS,
    payload: userData
  };
};

export const loginFailure = () => {
  return {
    type: AUTH_FAILURE,
  };
};

export const updateToken = (user: any) => {
    return {
      type: UPDATE_TOKEN,
      payload: user
    };
  };
  
export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
      };
}

export const refreshBasket = (basket: any) => {
  return {
    type: REFRESH_BASKET,
    payload: basket
  };
};