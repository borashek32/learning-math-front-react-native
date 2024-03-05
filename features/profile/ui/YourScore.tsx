import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { styles } from '../../home/Home.styles'
import { useGetTotalUserScoreQuery } from '../profile.api'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUserId } from '../../auth/auth.selectors'
import { Score } from '../../../common/components/score/Score'
import { Loader } from '../../../common/components/loaders/CircularLoader'

export const YourScore = () => {
  const userId = useAppSelector(selectUserId)
  const { data, isLoading, refetch } = useGetTotalUserScoreQuery(userId, { skip: false })

  const { t } = useTranslation()

  useEffect(() => {
    refetch()
  }, [data.score])

  return (
    <>
      {isLoading && <Loader />}
      <AppLayout title={t('profile.yourScore')}>
        <View style={styles.menuContainer}>
          {data && <Score score={data.score} />}
        </View>
      </AppLayout>
    </>
  )
}
