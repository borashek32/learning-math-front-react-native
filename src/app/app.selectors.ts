import { RootState } from '@redux/providers/store-provider/store';

const selectIsInitialized = (state: RootState) => state.app.isInitialized;

export { selectIsInitialized };
