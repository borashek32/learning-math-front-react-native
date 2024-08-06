import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProps } from 'types/commonTypes.types';

import { AppLayout } from '../../../components/layouts/AppLayout';
import { BlueButton } from '../../../components/buttons/BlueButton';
import { PATHS } from '../../../constants/paths';
import { styles } from '../Home.styles';
import { DevideLine } from '../../../components/devideLine/DevideLine';

export const Home = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <AppLayout title={t('screens.home')}>
        <View style={styles.menuContainer}>
          <BlueButton
            title={t('screens.math')}
            onPress={() => navigation.navigate(PATHS.MATH_OPERATIONS)}
          />
          <BlueButton
            title={t('screens.preSchool')}
            onPress={() => navigation.navigate(PATHS.PRE_SCHOOL)}
          />
          <BlueButton
            title={t('screens.instructions')}
            onPress={() => navigation.navigate(PATHS.INSTRUCTIONS)}
          />
          <DevideLine />
          <BlueButton
            title={t('screens.profile')}
            onPress={() => navigation.navigate(PATHS.PROFILE)}
          />
          <BlueButton
            title={t('buttons.logout')}
            onPress={() => navigation.navigate(PATHS.LOGOUT)}
          />
        </View>
        <StatusBar style="auto" />
      </AppLayout>
    </>
  );
};
