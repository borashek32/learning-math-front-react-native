import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../../../features/auth/auth.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { profileApi } from '../../../features/profile/profile.api'
import { userInfoReducer } from '../../../features/auth/auth.slice'
import { profileReducer } from '../../../features/profile/profile.slice'
import { rickMortyApi } from '../../../features/profile/rickMorty/rickMorty.api'
import { appReducer } from '../../../app/app.slice'
 
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
    userInfo: userInfoReducer,
    profile: profileReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    profileApi.middleware,
    authApi.middleware,
    rickMortyApi.middleware,
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