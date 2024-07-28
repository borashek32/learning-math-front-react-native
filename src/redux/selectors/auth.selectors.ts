import { RootState } from "../../redux/providers/model/store"
import { UserType } from "../../api/auth/auth.api.types"

const selectUserEmail = (state: RootState) => state.userInfo.user?.email
const selectUserId = (state: RootState) => state.userInfo.user?._id
const selectIsLoggedIn = (state: RootState) => state.userInfo.isLoggedIn
const selectUser = (state: RootState): UserType => state.userInfo.user
const selectUserAvatarPath = (state: RootState) => state.userInfo.user?.avatarPath

export {
  selectUserEmail,
  selectUserId,
  selectIsLoggedIn,
  selectUser,
  selectUserAvatarPath
}