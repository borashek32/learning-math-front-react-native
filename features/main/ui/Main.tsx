import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import { BaseLayout } from '../../../common/components/layouts/BaseLayout'
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../../common/constants/paths'
import { useMeQuery } from '../../auth/auth.api'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../auth/auth.slice'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectIsLoggedIn } from '../../auth/auth.selectors'

export const Main = ({ navigation }) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useMeQuery()
  // const user = dispatch(setUserInfo(data))
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)
  console.log('main me', data)
  // console.log('main isLoggedIn', isLoggedIn)
  // console.log('main user selector', user)  

  const { t } = useTranslation('translation')

  // useEffect(() => {
  //   if (data) {
  //     const user1 = dispatch(setUserInfo(data))
  //     navigation.navigate(PATHS.HOME)
  //   }
  // }, [data])

  return (
    <>
      {isLoading && <Loader />}
      <BaseLayout>
        <View>
          <Button
            title={t('auth.links.register')}
            onPress={() => navigation.push(PATHS.REGISTER)}
          />
          <Button
            title={t('auth.links.login')}
            onPress={() => navigation.push(PATHS.LOGIN)}
          />
        </View>
      </BaseLayout>
    </>
  )
}
