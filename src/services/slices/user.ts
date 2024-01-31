import { createSlice } from '@reduxjs/toolkit';
import { IBasketGame } from '../../types/basketTypes';
import { IGame, IOrder } from '../../types/gameTypes';

interface IUserState {
  user: {
    email: string;
    role: string;
    nickname: string;
    photo: string;
    basket: {
      id: number;
      userId: number;
      basket_games: IBasketGame[];
    };
    orders: IOrder[];
  };
  isAuthenticated: boolean;
  authProcess: boolean;
  favorites: { games: IGame[] };
}

const initialState: IUserState = {
  user: {
    email: '',
    nickname: '',
    photo: '',
    role: '',
    basket: {
      id: 0,
      userId: 0,
      basket_games: [],
    },
    orders: [],
  },
  isAuthenticated: false,
  authProcess: false,
  favorites: { games: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = {
        email: '',
        nickname: '',
        photo: '',
        role: '',
        basket: {
          id: 0,
          userId: 0,
          basket_games: [],
        },
        orders: [],
      };
      state.favorites = { games: [] },
      state.isAuthenticated = false;
    },
    setBasket: (state, action) => {
      state.user.basket = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setUser, clearUser, setBasket, setFavorites } = userSlice.actions;
