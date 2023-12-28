import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.freecurrencyapi.com/v1'
  }),
  endpoints(builder) {
    return {
      getExchangeRates: builder.query({
        query({ base, currency, date }) {
          const params = (date) ? {
            apikey: 'fca_live_2ok88y7AkqUG5XYlnoHbljkyKgzLXeOiJOsLb6FF',
            base_currency: base,
            currencies: currency,
            date
          } : {
            apikey: 'fca_live_2ok88y7AkqUG5XYlnoHbljkyKgzLXeOiJOsLb6FF',
            base_currency: base,
            currencies: currency,
          }

          return {
            url: (date) ? '/historical' : '/latest',
            method: 'GET',
            params
          };
        }
      })
    };
  }
});

export { currencyApi };
export const { useGetExchangeRatesQuery } = currencyApi;
