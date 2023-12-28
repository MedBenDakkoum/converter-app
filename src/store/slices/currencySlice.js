import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currencySlice',
  initialState: {
    fromCurrency: 'USD',
    toCurrency: 'USD',
    amount: '',
    exchangeRatesDate: {
      year: '',
      month: '',
      day: ''
    }
  },
  reducers: {
    setFromCurrency(state, action) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state, action) {
      state.toCurrency = action.payload;
    },
    swapCurrencies(state) {
      const toCurrency = state.toCurrency;
      state.toCurrency = state.fromCurrency;
      state.fromCurrency = toCurrency;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setExchangeRatesDate(state, action) {
      if (action.payload.property === 'date') {
        state.exchangeRatesDate.year = action.payload.value.slice(0, 4);
        state.exchangeRatesDate.month = action.payload.value.slice(5, 7);
        state.exchangeRatesDate.day = action.payload.value.slice(8, 10);
      } else {
        state.exchangeRatesDate[action.payload.property] = action.payload.value;
      }
    },
  }
});

export const currencyReducer = currencySlice.reducer;
export const { setFromCurrency, setToCurrency, swapCurrencies, setAmount, setExchangeRatesDate } = currencySlice.actions;
