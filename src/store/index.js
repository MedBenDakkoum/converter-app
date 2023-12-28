import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  currencyReducer, setFromCurrency, setToCurrency, swapCurrencies, setAmount, setExchangeRatesDate
} from './slices/currencySlice';
import {
  notificationsReducer, showNotification, startNotificationFading, removeNotification
} from './slices/notificationsSlice';
import {
  historyReducer, addConversion, toggleSelectedConversion, toggleAllSelectedConversions, deleteSelectedConversions
} from './slices/historySlice';
import { currencyApi, useGetExchangeRatesQuery } from './apis/currencyApi';

const rootReducer = combineReducers({
  currencyReducer,
  notificationsReducer,
  historyReducer,
  [currencyApi.reducerPath]: currencyApi.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['historyReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(currencyApi.middleware);
  }
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export {
  store, setFromCurrency, setToCurrency, swapCurrencies, setAmount, setExchangeRatesDate,
  showNotification, startNotificationFading, removeNotification,
  addConversion, toggleSelectedConversion, toggleAllSelectedConversions, deleteSelectedConversions, useGetExchangeRatesQuery
};
