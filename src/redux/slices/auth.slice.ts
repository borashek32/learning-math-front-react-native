import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../api/auth/auth.api.types";

interface UserInfoState {
  user: UserType
  isLoggedIn: boolean
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: { 
    user: null,
    isLoggedIn: false
   } as UserInfoState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUserInfo(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
});

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;