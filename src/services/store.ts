import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';
import { gameApi } from '../utils/gameApi';
import { gamesSlice } from './slices/game';
import { basketApi } from '../utils/basketApi';
import { steamApi } from '../utils/steamAPI';
import { publishersApi } from '../utils/publisersApi';


export const rootReducer = combineReducers({
  user: userReducer,
  [gameApi.reducerPath] : gameApi.reducer,
  [basketApi.reducerPath] : basketApi.reducer,
  [steamApi.reducerPath]: steamApi.reducer,
  [publishersApi.reducerPath]: publishersApi.reducer,
  games: gamesSlice.reducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    gameApi.middleware,
    basketApi.middleware,
    steamApi.middleware,
    publishersApi.middleware
  )
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;