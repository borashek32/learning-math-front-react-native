import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { AppLayout } from '@components/layouts/AppLayout';
import { useAppSelector } from '@hooks/useAppSelector';
import { Score } from '@components/score/Score';
import { selectTotalUserScore } from '@redux/selectors/profile.selectors';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { useGetTotalUserScoreQuery } from '@api/profile/profile.api';
import { setTotalUserScore } from '@redux/slices/profile.slice';

import { styles } from '../../home/Home.styles';

export const YourScore = () => {
  const totalUserScore = useAppSelector(selectTotalUserScore);
  const dispatch = useDispatch();
  const userId = useAppSelector(selectUserId);
  const { data: userScoreData, refetch } = useGetTotalUserScoreQuery(
    userId ?? '',
  );

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        refetch();
      }
    }, [userId, refetch]),
  );

  useEffect(() => {
    userScoreData && dispatch(setTotalUserScore(userScoreData.score));
  }, [dispatch, userScoreData]);

  const { t } = useTranslation();

  return (
    <AppLayout title={t('yourScore.total')}>
      <View style={styles.menuContainer}>
        {totalUserScore && <Score score={totalUserScore} />}
      </View>
    </AppLayout>
  );
};
