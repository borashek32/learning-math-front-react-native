import { RootState } from "../redux/providers/model/store"

const selectIsInitialized = (state: RootState) => state.app.isInitialized

export {
  selectIsInitialized
}