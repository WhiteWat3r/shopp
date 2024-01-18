import { createSlice } from '@reduxjs/toolkit';
import { IBasketGame } from '../basketTypes';
import { IGame } from '../gameTypes';

interface IUserState {
  user: {
    email: string;
    role: string;
    basket: {
      id: number;
      userId: number;
      basket_games: IBasketGame[];
    };
  };
  isAuthenticated: boolean;
  authProcess: boolean;
  favorites: {games : IGame[]};
}

const initialState: IUserState = {
  user: {},
  isAuthenticated: false,
  authProcess: false,
  favorites: {},
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
      state.user = {};
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
