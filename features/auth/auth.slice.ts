import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from './auth.types'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserInfoState {
  user: UserType | null
}

const initialState: UserInfoState = {
  user: null,
} as UserInfoState

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserType>) {
      state.user = action.payload
      const userEmail = action.payload.email
      const userId = action.payload.id
      AsyncStorage.setItem('userEmail', userEmail)
      AsyncStorage.setItem('userId', userId)
    },
    removeUserInfo(state) {
      state.user = null
      AsyncStorage.removeItem('userEmail')
      AsyncStorage.removeItem('userId')
    }
  },
})

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions
export const userInfoReducer = userInfoSlice.reducer