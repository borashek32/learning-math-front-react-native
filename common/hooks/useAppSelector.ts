import { RootState } from './../providers/model/store'
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector