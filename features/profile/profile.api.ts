import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/components/baseUrl/baseUrl'
import { algByDecodingToken } from '../../common/utils/algByDecodingToken'
import { AvatarType, ScoreType } from './profile.api.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserType } from '../auth/auth.api.types'

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
      updateScore: build.mutation<{ data: ScoreType }, ScoreType>({
        query: (data: ScoreType) => {
          return {
            method: 'POST',
            url: '/update-user-score',
            body: {
              score: data.score,
              userId: data.userId,
              date: data.date
            },
          }
        },
      }),
      getTotalUserScore: build.query<ScoreType, string>({
        query: (userId: string) => {
          return {
            method: 'GET',
            url: `get-total-user-score/${userId}`,
          }
        }
      }),
      updateAvatar: build.mutation<UserType, AvatarType>({
        query: (data: AvatarType) => {
          return {
            method: 'POST',
            url: 'update-user-avatar',
            body: {
              userId: data.userId,
              avatarPath: data.avatarPath,
              avatarName: data.avatarName
            }
          }
        }
      }),
    }
  },
})

export const {
  useUpdateScoreMutation,
  useGetTotalUserScoreQuery,
  useUpdateAvatarMutation,
} = profileApi