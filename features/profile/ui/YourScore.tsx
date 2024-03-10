import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { styles } from '../../home/Home.styles'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Score } from '../../../common/components/score/Score'
import { selectTotalUserScore } from '../profile.selectors'
import { useDispatch } from 'react-redux'
import { selectUser } from '../../auth/auth.selectors'
import { useGetTotalUserScoreQuery } from '../profile.api'
import { setTotalUserScore } from '../profile.slice'

export const YourScore = () => {
  const totalUserScore = useAppSelector(selectTotalUserScore)
  const dispatch = useDispatch()
  const user = useAppSelector(selectUser)
  const { data: userScoreData } = useGetTotalUserScoreQuery(user._id)

  useEffect(() => {
    userScoreData && dispatch(setTotalUserScore(userScoreData.score))
  }, [userScoreData, dispatch])
  

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
