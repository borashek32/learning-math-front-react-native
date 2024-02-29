import { RootState } from "../../common/providers/model/store"

const selectUserScore = (state: RootState) => state.profile.score

export {
  selectUserScore
}