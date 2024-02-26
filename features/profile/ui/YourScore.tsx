import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { styles } from '../../home/Home.styles'
import { useGetTotalUserScoreQuery } from '../profile.api'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUserId } from '../../auth/auth.selectors'
import { Score } from '../../../common/components/score/Score'

export const YourScore = () => {
  const userId = useAppSelector(selectUserId)
  const { data } = useGetTotalUserScoreQuery(userId)
  console.log(userId, data)

  const { t } = useTranslation()

  return (
    <AppLayout title={t('profile.yourScore')}>
      <View style={styles.menuContainer}>
        {data && <Score score={data.score} />}
      </View>
    </AppLayout>
  )
}
