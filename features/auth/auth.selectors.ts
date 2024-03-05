import { RootState } from "../../common/providers/model/store"
import { UserType } from "./auth.api.types"

const selectUserEmail = (state: RootState) => state.userInfo.user?.email
const selectUserId = (state: RootState) => state.userInfo.user?.id
const selectIsLoggedIn = (state: RootState) => state.userInfo.isLoggedIn
const selectUser = (state: RootState): UserType => state.userInfo?.user

export {
  selectUserEmail,
  selectUserId,
  selectIsLoggedIn,
  selectUser
}