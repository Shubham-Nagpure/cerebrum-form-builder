import { combineReducers } from '@reduxjs/toolkit';
import baseApi from '../services/api/baseQuery';

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer
});

export default appReducer;
