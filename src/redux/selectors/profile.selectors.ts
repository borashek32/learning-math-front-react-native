import { RootState } from "../providers/store-provider/store";

// local in separate component
const selectUserScore = (state: RootState) => state.profile.score; 
// from db
const selectTotalUserScore = (state: RootState) => state.profile.totalUserScore;

export {
  selectUserScore,
  selectTotalUserScore
};