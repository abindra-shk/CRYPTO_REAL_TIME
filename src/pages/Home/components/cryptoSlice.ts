import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoState {
  cryptos: any[];
  isFetching: boolean;
}

const initialState: CryptoState = {
  cryptos: [],
  isFetching: false,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.cryptos = action.payload;
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    clearData: (state) => {
      state.cryptos = [];
    },
  },
});

export const { setData, clearData, setFetching } = cryptoSlice.actions;
export default cryptoSlice.reducer;
