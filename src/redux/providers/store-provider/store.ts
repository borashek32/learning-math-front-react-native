import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from '@api/auth/auth.api';
import { profileApi } from '@api/profile/profile.api';
import { rickMortyApi } from '@api/profile/rickMorty/rickMorty.api';
import { userInfoReducer } from '@redux/slices/auth.slice';
import { profileReducer } from '@redux/slices/profile.slice';
import { appReducer } from '@app/app.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
    userInfo: userInfoReducer,
    profile: profileReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      authApi.middleware,
      rickMortyApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
