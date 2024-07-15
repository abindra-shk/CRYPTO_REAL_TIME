import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-key": "4a81aab5ecmshe499c309127b633p16f7c2jsn604327459f6d",
  "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
};

const baseUrl = "https://real-time-news-data.p.rapidapi.com/search";
const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });
console.log("Request URL:", URL);
console.log("Request Headers:", cryptoNewsHeaders);


export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
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
