import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../../../features/auth/auth.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { profileApi } from '../../../features/profile/profile.api'
import { userInfoReducer } from '../../../features/auth/auth.slice'
 
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    profile: userInfoReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    profileApi.middleware,
    authApi.middleware,
  ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>