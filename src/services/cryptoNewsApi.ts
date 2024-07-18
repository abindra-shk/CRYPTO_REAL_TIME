import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-rapidapi-key': '4614529fa9mshc66ee9fbcca50b9p1c14d7jsnf94af5f4ed32',
  'x-rapidapi-host': ' real-time-news-data.p.rapidapi.com',
};

const baseUrl = 'https://real-time-news-data.p.rapidapi.com/search';
const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });
console.log('Request URL:', URL);
console.log('Request Headers:', cryptoNewsHeaders);

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ crypto }) =>
        createRequest(
          `?query=${crypto}&limit=500&time_published=anytime&country=US&lang=en`
          //   `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
