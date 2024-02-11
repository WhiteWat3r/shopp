import { createSlice } from '@reduxjs/toolkit';
import { IGame, IUser } from '../../types/gameTypes';

interface IUserState {
  user: IUser;
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
    dialog: {
      id: 0,
      messages: [],
      users: []
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
        dialog: {
          id: 0,
          messages: [],
          users: []
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
    setChatHistory: (state, action) => {
      state.user.dialog = action.payload;
    },
  },
});

export const { setUser, clearUser, setBasket, setFavorites, setChatHistory} = userSlice.actions;
