import { useEffect } from 'react'
import { useMeQuery } from '../api/auth/auth.api'
import { useDispatch } from 'react-redux'
import { removeUserInfo, setUserInfo } from '../redux/slices/auth.slice'
import { useAppSelector } from './useAppSelector'
import { selectIsLoggedIn } from '../redux/selectors/auth.selectors'

export const useAuthentication = () => {
  const { data } = useMeQuery()
  const dispatch = useDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  
  useEffect(() => { 
    if (data) {
      dispatch(setUserInfo(data))
    } else {
      dispatch(removeUserInfo())
    }
  }, [data, dispatch])

  return isLoggedIn 
}
