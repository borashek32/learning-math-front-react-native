import { RootState } from "./../common/providers/model/store"

const selectIsInitialized = (state: RootState) => state.app.isInitialized

export {
  selectIsInitialized
}