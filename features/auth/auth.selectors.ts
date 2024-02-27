import { RootState } from "../../common/providers/model/store"

const selectUserEmail = (state: RootState) => state.profile.user.email
const selectUserId = (state: RootState) => state.profile.user.id
const selectIsLoggedIn = (state: RootState) => state.profile.isLoggedIn
const selectUser = (state: RootState) => state.profile.user

export {
  selectUserEmail,
  selectUserId,
  selectIsLoggedIn,
  selectUser
}