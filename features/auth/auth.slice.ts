import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from './auth.types'

interface UserInfoState {
  user: UserType | null
  isLoggedIn: boolean
}

const initialState: UserInfoState = {
  user: null,
  isLoggedIn: false
} as UserInfoState

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserType>) {
      state.user = action.payload
      state.isLoggedIn = true
    },
    removeUserInfo(state) {
      state.user = null
      state.isLoggedIn = false
    }
  },
})

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions
export const userInfoReducer = userInfoSlice.reducer