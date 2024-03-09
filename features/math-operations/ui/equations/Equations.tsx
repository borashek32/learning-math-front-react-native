import React from 'react'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../common/components/layouts/AppLayout'
import { ScrollView } from 'react-native'
import { BlueButton } from '../../../../common/components/buttons/BlueButton'
import { PATHS } from '../../../../common/constants/paths'

export const Equations = () => {
  const { t } = useTranslation()

  return (
    <AppLayout title={t('screens.equations')}>
      <ScrollView>
        <BlueButton
          title={t('mathOperations.equationsWithX')}
          path={PATHS.EQUATIONS_X}
        />
        <BlueButton
          title={t('mathOperations.equationsWithXY')}
          path={PATHS.DIFF}
        />
      </ScrollView>
    </AppLayout>
  )
}