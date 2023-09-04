/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';
import baseApi from '../services/api/baseQuery';

const middleware: any[] = [];

middleware.push(baseApi.middleware);

const middlewares = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(middleware);

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
