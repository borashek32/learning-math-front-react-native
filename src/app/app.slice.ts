import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  isInitialized: boolean
}

const initialState: AppState = {
  isInitialized: false
} as AppState

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    }
  },
})

export const { setIsInitialized } = appSlice.actions
export const appReducer = appSlice.reducer