import { RootState } from "../../common/providers/model/store"

const selectUserEmail = (state: RootState) => state.profile.user.email
const selectUserId = (state: RootState) => state.profile.user.id

export {
  selectUserEmail,
  selectUserId
}