import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi'; // Your API configuration
import cryptoSlice from '../pages/Home/components/cryptoSlice';

const rootReducer = combineReducers({
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  crypto: cryptoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
