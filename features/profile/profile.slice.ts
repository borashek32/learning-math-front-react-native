import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ScoreState {
  score: number
  totalUserScore: number
}

const initialState: ScoreState = {
  score: 0,
  totalUserScore: 0
} as ScoreState

const profileSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setUserScore(state, action: PayloadAction<number>) {
      state.score = action.payload
    },
    setTotalUserScore(state, action: PayloadAction<number>) {
      state.totalUserScore = action.payload
    }
  },
})

export const { setUserScore, setTotalUserScore } = profileSlice.actions
export const profileReducer = profileSlice.reducer