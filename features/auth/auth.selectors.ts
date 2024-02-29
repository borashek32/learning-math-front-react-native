import { RootState } from "../../common/providers/model/store"

const selectUserEmail = (state: RootState) => state.userInfo.user.email
const selectUserId = (state: RootState) => state.userInfo.user.id
const selectIsLoggedIn = (state: RootState) => state.userInfo.isLoggedIn
const selectUser = (state: RootState) => state.userInfo.user

export {
  selectUserEmail,
  selectUserId,
  selectIsLoggedIn,
  selectUser
}