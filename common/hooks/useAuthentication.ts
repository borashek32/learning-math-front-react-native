import { useEffect, useState } from 'react'
import { useMeQuery } from '../../features/auth/auth.api'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../features/auth/auth.slice'

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const { data, isLoading, isError } = useMeQuery()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!isLoading && !isError) {
      setIsAuthenticated(data !== undefined && data !== null)
      dispatch(setUserInfo(data.user))
      setLoading(false)
    }
  }, [data, isLoading, isError, dispatch])

  return isAuthenticated && !loading
}
