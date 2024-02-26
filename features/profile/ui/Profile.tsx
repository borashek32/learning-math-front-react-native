import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { styles } from './../../home/Home.styles'
import { PATHS } from '../../../common/constants/paths'
import { DevideLine } from '../../../common/components/devideLine/DevideLine'

export const Profile = () => {
  const { t } = useTranslation()

  return (
    <AppLayout title={t('screens.profile')}>
      <View style={styles.menuContainer}>
        <DefaultButton title={t('profile.yourScore')} path={PATHS.YOUR_SCORE} />
        <DevideLine />
        <DefaultButton title={t('screens.changeEmail')} path={PATHS.CHANGE_EMAIL} />
        <DefaultButton title={t('screens.changePassword')} path={PATHS.CHANGE_PASSWORD} />
        <DefaultButton title={t('buttons.logout')} path={PATHS.LOGOUT} />
      </View>
    </AppLayout>
  )
}
