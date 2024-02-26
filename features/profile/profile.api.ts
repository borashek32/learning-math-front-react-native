import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/components/baseUrl/baseUrl'
import { algByDecodingToken } from '../../common/utils/algByDecodingToken'
import { ScoreType } from './profile.api.types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('accessToken')
  
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      algByDecodingToken(token)
    }
  
    return headers
  }
})

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: build => {
    return {
      updateScore: build.mutation<{ message: string }, ScoreType>({
        query: (data: ScoreType) => {
          return {
            method: 'POST',
            url: '/update-score',
            body: {
              score: data.score,
              userId: data.userId,
              date: data.date
            },
          }
        },
      }),
      getTotalUserScore: build.query<ScoreType, string>({
        query: (userId) => {
          console.log('api', userId)
          
          return {
            method: 'GET',
            url: `get-total-user-score/${userId}`,
          }
        }
      })
    }
  },
})

export const {
  useUpdateScoreMutation,
  useGetTotalUserScoreQuery
} = profileApi