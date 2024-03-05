import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { styles } from '../../home/Home.styles'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUserId } from '../../auth/auth.selectors'
import { Score } from '../../../common/components/score/Score'
import { selectTotalUserScore } from '../profile.selectors'

export const YourScore = () => {
  const totalUserScore = useAppSelector(selectTotalUserScore)

  const { t } = useTranslation()

  return (
    <>
      <AppLayout title={t('profile.yourScore')}>
        <View style={styles.menuContainer}>
          {totalUserScore && <Score score={totalUserScore} />}
        </View>
      </AppLayout>
    </>
  )
}
