import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CharacterType } from './rickMorty.types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rickandmortyapi.com/api',
});

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery,
  tagTypes: [],
  endpoints: build => {
    return {
      getAvatars: build.query<{ results: CharacterType[] }, void>({
        query: () => 'character',
      }),
    };
  },
});

export const { useGetAvatarsQuery } = rickMortyApi;
