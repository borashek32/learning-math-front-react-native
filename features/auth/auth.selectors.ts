import { RootState } from "../../common/providers/model/store"

const selectUserId = (state: RootState) => state.profile.user.id

export {
  selectUserId
}