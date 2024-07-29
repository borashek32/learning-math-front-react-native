import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppLayout } from '../../../components/layouts/AppLayout';
import { DefaultButton } from '../../../components/buttons/DefaultButton';
import { PATHS } from '../../../constants/paths';
import { styles } from '../Home.styles';
import { DevideLine } from '../../../components/devideLine/DevideLine';

export const Home = () => {
  const { t } = useTranslation('translation');

  return (
    <>
      <AppLayout>
        <View style={styles.menuContainer}>
          <DefaultButton
            title={t('screens.math')}
            path={PATHS.MATH_OPERATIONS}
          />
          <DefaultButton
            title={t('screens.preSchool')}
            path={PATHS.PRE_SCHOOL}
          />
          <DefaultButton
            title={t('screens.instructions')}
            path={PATHS.INSTRUCTIONS}
          />
          <DevideLine />
          <DefaultButton title={t('screens.profile')} path={PATHS.PROFILE} />
          <DefaultButton title={t('buttons.logout')} path={PATHS.LOGOUT} />
        </View>
        <StatusBar style="auto" />
      </AppLayout>
    </>
  );
};
