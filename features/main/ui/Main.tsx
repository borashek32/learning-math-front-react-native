import React, { useEffect } from 'react'
import { Button } from 'react-native'
import { BaseLayout } from '../../../common/components/layouts/BaseLayout'
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../../common/constants/paths'
import { useMeQuery } from '../../auth/auth.api'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../auth/auth.slice'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { BlueButton } from '../../../common/components/buttons/BlueButton'

export const Main = ({ navigation }) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useMeQuery()

  const { t } = useTranslation('translation')

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data.user))
    }
  }, [data, dispatch])

  useEffect(() => {
    if (data) {
      navigation.navigate(PATHS.HOME)
    }
  }, [data, navigation])

  return (
    <>
      {isLoading && <Loader />}
      <BaseLayout>
        <BlueButton
          title={t('auth.links.register')}
          onPress={() => navigation.navigate(PATHS.REGISTER)}
        />
        <BlueButton
          title={t('auth.links.login')}
          onPress={() => navigation.push(PATHS.LOGIN)}
        />
      </BaseLayout>
    </>
  )
}
