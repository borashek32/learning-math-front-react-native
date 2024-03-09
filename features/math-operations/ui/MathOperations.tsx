import React from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { PATHS } from '../../../common/constants/paths'
import { BlueButton } from '../../../common/components/buttons/BlueButton'

export const MathOperations = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <AppLayout title={t('mathOperations.title')}>
      <ScrollView>
        <BlueButton
          title={t('mathOperations.summ')}
          path={PATHS.SUMM}
        />
        <BlueButton
          title={t('mathOperations.diff')}
          path={PATHS.DIFF}
        />
        <BlueButton
          title={t('mathOperations.multiplication')}
          path={PATHS.MULT}
        />
        <BlueButton
          title={t('screens.equations')}
          path={PATHS.EQUATIONS}
        />
      </ScrollView>
    </AppLayout>
  )
}
