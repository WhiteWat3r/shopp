import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';
import { gameApi } from '../utils/gameApi';
import { gamesSlice } from './slices/game';
import { basketApi } from '../utils/basketApi';
import { steamApi } from '../utils/steamAPI';
import { publishersApi } from '../utils/publisersApi';
import { authApi } from '../utils/authApi';
import { userSlice } from './slices/user';


export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [basketApi.reducerPath] : basketApi.reducer,
  [steamApi.reducerPath]: steamApi.reducer,
  [publishersApi.reducerPath]: publishersApi.reducer,
  user:  userSlice.reducer,
  games: gamesSlice.reducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    gameApi.middleware,
    basketApi.middleware,
    steamApi.middleware,
    publishersApi.middleware,
    authApi.middleware,
  )
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;