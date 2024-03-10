import { useEffect, useState } from 'react'
import { useMeQuery } from '../../features/auth/auth.api'
import { useDispatch } from 'react-redux'
import { removeUserInfo, setUserInfo } from '../../features/auth/auth.slice'
import { useAppSelector } from './useAppSelector'
import { selectIsLoggedIn } from '../../features/auth/auth.selectors'

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
