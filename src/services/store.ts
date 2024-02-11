import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';
import { gameApi } from '../api/gameApi';
import { gamesSlice } from './slices/game';
import { basketApi } from '../api/basketApi';
import { steamApi } from '../api/steamAPI';
import { publishersApi } from '../api/publisersApi';
import { authApi } from '../api/authApi';
import { userSlice } from './slices/user';
import { favoriteApi } from '../api/favoriteApi';
import { supportApi } from '../api/supportApi';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [basketApi.reducerPath]: basketApi.reducer,
  [steamApi.reducerPath]: steamApi.reducer,
  [publishersApi.reducerPath]: publishersApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [supportApi.reducerPath]: supportApi.reducer,

  user: userSlice.reducer,
  games: gamesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      gameApi.middleware,
      basketApi.middleware,
      steamApi.middleware,
      publishersApi.middleware,
      authApi.middleware,
      favoriteApi.middleware,
      supportApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
