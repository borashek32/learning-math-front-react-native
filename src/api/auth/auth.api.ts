import { 
  BaseQueryFn, 
  FetchArgs, 
  FetchBaseQueryError, 
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../redux/constants/baseUrl'
import { 
  ForgotPasswordType, 
  RegistedUserType, 
  RegisterType, 
  PasswordRecoveryType,
  UserType,
  NewPasswordType,
  NewEmailType,
  LogoutType,
} from './auth.api.types'
import { algByDecodingToken } from '../../utils/string/algByDecodingToken'
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  prepareHeaders: async (headers) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        algByDecodingToken(token)
      }
      return headers

    } catch (error) {
      console.log('Ошибка при чтении токена доступа:', error)
      return headers
    }
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const token = await AsyncStorage.getItem('accessToken')
  
    if (token) {
      const tokenString = token as string
      const decodedToken = await algByDecodingToken(tokenString)

      if (!decodedToken.isExpirationTimeLongerThanCurrent) {
        const refreshResult = await baseQuery({
            method: 'GET',
            url: `${baseURL}refresh`,
          },
          api,
          extraOptions
        )

        if (
          refreshResult.data &&
          typeof refreshResult.data === 'object' &&
          'accessToken' in refreshResult.data
        ) {
          await AsyncStorage.setItem('accessToken', refreshResult.data.accessToken as string)
        }
      }
    }
  }

  if ((api.endpoint === 'login' || api.endpoint === 'refresh') && result.data && typeof result.data === 'object' && 'accessToken' in result.data) {
    await AsyncStorage.setItem('accessToken', result.data.accessToken as string)
  }

  if (api.endpoint === 'me' && result.data && typeof result.data === 'object' && 'accessToken' in result.data) {
    await AsyncStorage.getItem('accessToken')
  }

  if (api.endpoint === 'logout'&& result.data&& typeof result.data === 'object') {
    await AsyncStorage.removeItem('accessToken')
  }

  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['me'],
  endpoints: build => {
    return {
      login: build.mutation<RegistedUserType, RegisterType>({
        query: ({ email, password, rememberMe }: RegisterType) => {
          return {
            method: 'POST',
            url: 'login',
            body: {
              email,
              password,
              rememberMe,
            },
          }
        },
        invalidatesTags: ['me'],
      }),
      signUp: build.mutation<RegistedUserType, RegisterType>({
        query: ({ email, password }: RegisterType) => {
          return {
            method: 'POST',
            url: 'registration',
            body: {
              email,
              password,
            },
          }
        },
      }),
      verify: build.query<string, string | undefined>({
        query: verificationLink => `verify/${verificationLink}`,
      }),
      logout: build.mutation<void, LogoutType>({
        query: (data: LogoutType) => {
          return {
            method: 'POST',
            url: 'logout',
            body: {
              refreshToken: data.refreshToken,
              accessToken: data.accessToken
            }
          }
        },  
        invalidatesTags: ['me'],
      }),
      emailSent: build.mutation<any, ForgotPasswordType>({
        query: ({ email }: ForgotPasswordType) => {
          return {
            url: 'forgot-password',
            method: 'POST',
            body: {
              email
            },
          }
        },
      }),
      saveNewPassword: build.mutation<any, PasswordRecoveryType>({
        query: ({ email, password }: PasswordRecoveryType) => {
          return {
            url: `save-new-password`,
            method: 'POST',
            body: {
              password,
              email
            }
          }
        },
      }),
      me: build.query<UserType | null, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'me',
          }
        },
        providesTags: ['me'],
      }),
      changePassword: build.mutation<UserType, NewPasswordType>({
        query: (data: NewPasswordType) => { 
          return {
            method: 'POST',
            url: 'change-password',
            body: {
              userId: data.userId,
              password: data.password,
              newPassword: data.newPassword,
            }
          }
        }
      }),
      changeEmail: build.mutation<UserType, NewEmailType>({
        query: (data: NewEmailType) => {
          return {
            method: 'POST',
            url: 'change-email',
            body: {
              userId: data.userId,
              newEmail: data.newEmail
            }
          }
        }
      })
    }
  },
})

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyQuery,
  useLogoutMutation,
  useEmailSentMutation,
  useSaveNewPasswordMutation,
  useMeQuery,
  useChangePasswordMutation,
  useChangeEmailMutation,
} = authApi