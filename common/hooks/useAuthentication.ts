import { useEffect, useState } from 'react'
import { useMeQuery } from '../../features/auth/auth.api'

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { data: userData, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (!isLoading && !isError && userData && userData.user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [userData, isLoading, isError])

  return isAuthenticated
}