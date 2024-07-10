import React from 'react'
import { BaseLayout } from '../../../common/components/layouts/BaseLayout'
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../../common/constants/paths'
import { BlueButton } from '../../../common/components/buttons/BlueButton'

export const Main = ({ navigation }) => {
  const { t } = useTranslation('translation')

  return (
    <>
      <BaseLayout>
        <BlueButton
          title={t('screens.math')}
          onPress={() => navigation.navigate(PATHS.MATH_OPERATIONS)}
        />
        <BlueButton
          title={t('screens.instructions')}
          onPress={() => navigation.navigate(PATHS.INSTRUCTIONS)}
        />
        {/* <BlueButton
          title={t('auth.links.register')}
          onPress={() => navigation.navigate(PATHS.REGISTER)}
        />
        <BlueButton
          title={t('auth.links.login')}
          onPress={() => navigation.push(PATHS.LOGIN)}
        /> */}
      </BaseLayout>
    </>
  )
}
