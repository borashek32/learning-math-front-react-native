import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ScoreState {
  score: number
}

const initialState: ScoreState = {
  score: 0
} as ScoreState

const profileSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setUserScore(state, action: PayloadAction<number>) {
      state.score = action.payload
    }
  },
})

export const { setUserScore } = profileSlice.actions
export const profileReducer = profileSlice.reducer