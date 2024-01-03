import { REFRESH_BASKET, AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT_SUCCESS, UPDATE_TOKEN } from '../actions/user';

const initialState = {
  user: null,
  isAuthenticated: false,
  authProcess: false
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        authProcess: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authProcess: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case AUTH_FAILURE:
      return {
        ...state,
        authProcess: false,
      };

      case UPDATE_TOKEN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        };
        case LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
        // case REFRESH_BASKET:
        // return {
        //   ...state,
        //   user: {...state.user, basket: action.payload}
        // };
    default:
      return state;
  }
};
