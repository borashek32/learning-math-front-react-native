import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { PATHS } from '../../../common/constants/paths'
import { useTranslation } from 'react-i18next'
import { styles } from './../Home.styles'
import { DevideLine } from '../../../common/components/devideLine/DevideLine'

export const Home = () => {
  const { t } = useTranslation('translation')

  return (
    <AppLayout>
      <>
        <View style={styles.menuContainer}>
          <DefaultButton title={t('nav.items.mathOperations')} path={PATHS.MATH_OPERATIONS}/>
          <DefaultButton title={t('nav.items.instructions')} path={PATHS.INSTRUCTIONS}/>
          <DevideLine />
          <DefaultButton title={t('screens.profile')} path={PATHS.PROFILE} />
          <DefaultButton title={t('buttons.logout')} path={PATHS.LOGOUT} />
        </View>
        <StatusBar style="auto" />
      </>
    </AppLayout>
  )
}