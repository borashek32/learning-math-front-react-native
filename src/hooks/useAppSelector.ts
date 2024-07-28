import { RootState } from '../providers/store-provider/store'
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector