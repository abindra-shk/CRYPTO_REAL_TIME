import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi'; // Your API configuration
import cryptoSlice from '../pages/Home/components/cryptoSlice';
import { cryptoNewsApi } from '../services/cryptoNewsApi';

const rootReducer = combineReducers({
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  crypto: cryptoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
