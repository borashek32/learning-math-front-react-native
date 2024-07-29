import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@redux/providers/store-provider/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
